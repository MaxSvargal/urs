import debug from 'debug'
import { default as Koa } from 'koa'
import { default as compress } from 'koa-compress'
import serve from 'koa-static'

import cache from './middlewares/cache'
import renderer from './middlewares/renderer'
import timer from './middlewares/timer'

const app = new Koa()
const log = debug('server::app')
const DEFAULT_PORT = 4396
const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT
const [ , , clientBundleName ] = process.argv

log('Frontend server starting...')

app.use(serve('./dist/client'))
// app.use(errorHandler('Internal_Server_Error'))
app.use(timer)
app.use(compress({ threshold: 2048 }))
app.use(cache)
app.use(renderer({ clientBundleName }))

log(`Frontend server is listening on port ${PORT}`)
app.listen(PORT)
