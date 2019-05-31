import debug from 'debug'
import { default as Koa } from 'koa'
import { default as compress } from 'koa-compress'
import serve from 'koa-static'

import cache from './middlewares/cache'
import renderer from './middlewares/renderer'
import timer from './middlewares/timer'

type NodePath = string
type ScriptPath = string
type Port = string
type VendorBundleName = string
type AppBundleName = string
export type IProcessArgs = [ Port, VendorBundleName, AppBundleName ]
type IProcessArgv = [ NodePath, ScriptPath ] & IProcessArgs

const app = new Koa()
const log = debug('server::app')
const [ , , port, vendorBundleName, clientBundleName ] = process.argv as IProcessArgv
const DEFAULT_PORT = 80
const PORT = parseInt(port, 10) || DEFAULT_PORT

log('Frontend server starting...')

app.use(serve('./build/client'))
// app.use(errorHandler('Internal_Server_Error'))
app.use(timer)
app.use(compress({ threshold: 2048 }))
app.use(cache)
app.use(renderer({ bundlesFilesNames: [ vendorBundleName, clientBundleName ] }))

log(`Frontend server is listening on port ${PORT}`)
app.listen(PORT)
