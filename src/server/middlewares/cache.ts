import crypto from 'crypto'
import { Context } from 'koa'
import { HTTP_OK } from '../constants'

export default async (ctx: Context, next: () => Promise<void>) => {
  await next()
  if (ctx.body && ctx.response.status === HTTP_OK) {
    // http 1.1
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate')

    // http 1.0
    ctx.set('Pragma', 'no-cache')

    ctx.set('Expires', '0')
    if (typeof ctx.body === 'string') {
      ctx.set('Content-Length', String(ctx.body.length))
      ctx.set('etag', crypto.createHash('md5')
        .update(ctx.body)
        .digest('hex'))
    }
  }
}
