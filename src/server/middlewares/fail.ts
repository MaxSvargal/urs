import debug from 'debug'
import { Context } from 'koa'

import { HTTP_FORBIDDEN, HTTP_SERVER_ERROR, HTTP_UNAUTHORIZED } from '../constants'

const log = debug('server:fail');

export default (renderer: string) =>
  async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    try {
      await next();
      // TODO: 服务化接口异常信息收集
    } catch (err) {
      if (process.env.NODE_ENV === 'production') {
        // TODO: 输出错误信息到日志
      } else {
        log(err);
      }

      ctx.response.status = err.status || HTTP_SERVER_ERROR;
      if (renderer) {
        ctx.type = 'html';
        ctx.body = ctx[renderer](err);
      } else if (err.status === HTTP_UNAUTHORIZED || err.status === HTTP_FORBIDDEN) {
        ctx.status = err.status;
        ctx.body = { message: 'Protected resource, you are unauthorized', error: err };
      } else {
        ctx.type = 'json';
        ctx.body = { error: err };
      }
      ctx.app.emit('error', err, ctx);
    }
  };
