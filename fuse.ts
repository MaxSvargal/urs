import debug from 'debug'
import { FuseBox, RawPlugin } from 'fuse-box'

process.env.DEBUG = 'server:*'

const fuse = FuseBox.init({
  // hash: true,
  allowSyntheticDefaultImports: true,
  cache: true,
  homeDir: 'src',
  output: 'dist/$name-$hash.js',
  plugins: [RawPlugin(['.woff2'])],
  sourceMaps: {
    project: true,
    vendor: false,
  },
  target: 'browser@esnext',
})

fuse.dev({ httpServer: false, hmr: true })

let clientBundle = fuse
  .bundle('client/app')
  .watch('client/**')
  .hmr()
  .instructions(' > client/index.ts')

fuse
  .bundle('server/bundle')
  .watch('server/**')
  .instructions(' > [server/index.ts]')
  .target('server@esnext')
  .completed((proc) =>
    proc.start([  clientBundle.context.output.lastGeneratedFileName ]))

fuse.run()
  .catch((err) => { debug('server:fuse')(err) })
