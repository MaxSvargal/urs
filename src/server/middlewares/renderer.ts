import { push } from 'connected-react-router'
import debug from 'debug'
import { renderStylesToNodeStream } from 'emotion-server'
import { ParameterizedContext } from 'koa'
import { createElement, useContext } from 'react'
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server'

import { sagaEnd } from '~/common/shared/actions'
import rootSaga from '~/common/shared/sagas'
import configureStore from '~/common/store/configureStore'
import ServerApp from '../ServerApp'
import { HTTP_OK } from '../constants'

interface IRendererProps {
  bundlesFilesNames: string[]
}

export default ({ bundlesFilesNames }: IRendererProps) => async (ctx: ParameterizedContext) => {
  let url = ctx.req.url || ''
  let context = {}
  let { store, runSaga } = configureStore({}, url)

  let getPageElement = () =>
    createElement(ServerApp, {
      bundles: bundlesFilesNames,
      context,
      store,
      url,
    })

  let sagaTask = runSaga(rootSaga)
  store.dispatch(push({ pathname: url }))

  renderToStaticMarkup(getPageElement())
  store.dispatch(sagaEnd())

  await sagaTask.toPromise()

  let stream = renderToNodeStream(getPageElement()).pipe(renderStylesToNodeStream())

  await new Promise(resolve => {
    stream.on('error', resolve)
    stream.once('readable', () => {
      // very important! bypass koa response
      ctx.respond = false
      // without explicitly setting status, will be 404
      ctx.res.writeHead(HTTP_OK, { 'Content-Type': 'text/html;charset=utf-8' })
      ctx.res.write('<!DOCTYPE html>')
      stream.pipe(
        ctx.res,
        { end: false },
      )
      stream.on('end', () => {
        ctx.res.end()
      })
      resolve()
    })
  })
}
