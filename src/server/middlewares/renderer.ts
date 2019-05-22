import { push } from 'connected-react-router'
import { renderStylesToNodeStream } from 'emotion-server'
import { ParameterizedContext } from 'koa'
import { createElement } from 'react'
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server'

import { sagaEnd } from '~/common/actions'
import rootSaga from '~/common/sagas'
import configureStore from '~/common/store/configureStore'
import debug from 'debug'
import ServerApp from '../ServerApp'
import { HTTP_OK } from '../constants'

interface IRendererProps {
  clientBundleName: string
}

const log = debug('server::renderer')

export default ({ clientBundleName }: IRendererProps) =>
  async (ctx: ParameterizedContext) => {
    log('Start rendering...')
    let url = ctx.req.url || ''
    let context = {}
    let { store, runSaga } = configureStore({}, url)

    let getPageElement = () =>
      createElement(ServerApp, {
        bundle: clientBundleName,
        context,
        store,
        url,
      })

    let sagaTask = runSaga(rootSaga)
    store.dispatch(push({ pathname: url }))

    renderToStaticMarkup(getPageElement())
    store.dispatch(sagaEnd())

    await sagaTask.toPromise()

    let stream = renderToNodeStream(getPageElement())
      .pipe(renderStylesToNodeStream())

    await new Promise(resolve => {
      stream.on('error', resolve)
      stream.once('readable', () => {
        // very important! bypass koa response
        ctx.respond = false
        // without explicitly setting status, will be 404
        ctx.res.writeHead(HTTP_OK, {'Content-Type': 'text/html;charset=utf-8'})
        ctx.res.write('<!DOCTYPE html>')
        stream.pipe(ctx.res, { end: false })
        stream.on('end', () => { ctx.res.end() })
        resolve()
      })
    })
  }
