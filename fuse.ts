import debug from 'debug'
import { FuseBox, RawPlugin, EnvPlugin } from 'fuse-box'

process.env.DEBUG = 'server:*'

const fuse = FuseBox.init({
  // hash: true,
  allowSyntheticDefaultImports: true,
  cache: true,
  homeDir: 'src',
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

fuse
  .bundle('server/bundle')
  // .plugin(EnvPlugin({ BROWSER: false }))
  .watch('**')
  .instructions(' > [server/index.ts]')
  .target('server@esnext')
  .completed((proc) =>
    proc.start([  clientBundle.context.output.lastGeneratedFileName ]))

fuse.run()
  .catch((err) => { debug('server:fuse')(err) })
