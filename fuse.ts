import debug from 'debug'
import { EnvPlugin, FuseBox } from 'fuse-box'

process.env.DEBUG = 'server::*'
const log = debug('server::build')

log('Building bundles...')

const fuse = FuseBox.init({
  // hash: true,
  allowSyntheticDefaultImports: true,
  autoImport: {
    React: 'react',
  },
  cache: true,
  homeDir: 'src',
  log: {
    enabled: false,
  },
  output: 'dist/$name-$hash.js',
  // plugins: [
  //   EnvPlugin({
  //     NODE_ENV: 'development',
  //   }),
  // ],
  sourceMaps: {
    project: true,
    vendor: false,
  },
  target: 'browser@esnext',
})

fuse.dev({ httpServer: false, hmr: true })

let clientBundle = fuse
  .bundle('client/app')
  .plugin(EnvPlugin({ BROWSER: true }))
  .watch('common/**')
  .hmr()
  .instructions(' > client/index.ts')
  .completed(() => { log('Building client bundle complete') })

fuse
  .bundle('server/bundle')
  // .plugin(EnvPlugin({ BROWSER: false }))
  .watch('server/**')
  .instructions(' > [server/index.ts]')
  .target('server@esnext')
  .completed(proc =>
    proc.start([ clientBundle.context.output.lastGeneratedFileName, process.env.PORT ]))

fuse.run({ chokidar: { ignored: /(^|[\/\\])\../ } })
  .then(() => { log('All bundles building complete. Ready to start the server...') })
  .catch(err => { debug('server:fuse')(err) })
