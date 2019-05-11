import { ParameterizedContext } from 'koa'
import { renderStylesToNodeStream } from 'emotion-server'
import { renderToNodeStream } from 'react-dom/server'
import React from 'react'

import { IServerPageProps } from '../ServerPage'

const SUCCESS_STATUS = 200

interface IRendererProps {
  clientBundleName: string
  AppComponent(): JSX.Element
  ServerPageComponent(props: IServerPageProps): JSX.Element
}

export default ({ ServerPageComponent, AppComponent, clientBundleName }: IRendererProps) =>
  async (ctx: ParameterizedContext) => {
    let renderPage = <ServerPageComponent bundle={clientBundleName} body={<AppComponent />} />

    let stream = renderToNodeStream(renderPage)
      .pipe(renderStylesToNodeStream())

    await new Promise((resolve) => {
      stream.on('error', resolve)
      stream.once('readable', () => {
        // very important! bypass koa response
        ctx.respond = false
        // without explicitly setting status, will be 404
        ctx.res.writeHead(SUCCESS_STATUS, {'Content-Type': 'text/html;charset=utf-8'})
        // ctx.res.write('<html><head></head><body>')
        ctx.res.write('<!DOCTYPE html>')
        stream.pipe(ctx.res, { end: false })
        stream.on('end', () => {
          // ctx.res.write('</body></html>')
          ctx.res.end()
        })
        resolve()
      })
    })
  }
