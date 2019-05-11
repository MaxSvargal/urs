import debug from 'debug'
import { default as Koa } from 'koa'
import serve from 'koa-static'

import App from '../client/App'
import ServerPage from './ServerPage'
import renderer from './middlewares/Renderer'

const app = new Koa()
const log = debug('server::app')
const DEFAULT_PORT = 4396
const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT
const [ , , clientBundleName ] = process.argv

log('Frontend server starting...')

app.use(serve('./dist/client'))

app.use(renderer({
  AppComponent: App,
  clientBundleName,
  ServerPageComponent: ServerPage,
}))

log(`Frontend server is listening on port ${PORT}`)
app.listen(PORT)
