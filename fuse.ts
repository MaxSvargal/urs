import debug from 'debug'
import { Bundle, EnvPlugin, FuseBox, JSONPlugin, QuantumPlugin, TerserPlugin } from 'fuse-box'
import { bumpVersion, context, src, task } from 'fuse-box/sparky'
import { increaseEventEmitterLimit } from './increaseEventEmitterLimit'
import { IProcessArgs } from './src/server/index'

interface IContext {
  clientAppBundle: Bundle
  clientVendorBundle: Bundle
  isProduction: boolean
  getConfig(): FuseBox
}

increaseEventEmitterLimit()

process.env.DEBUG = 'server::*'
const log = debug('server::build')

log('Building bundles...')

context(
  class implements IContext {
    public clientAppBundle: Bundle
    public clientVendorBundle: Bundle
    public isProduction = false

    public getConfig() {
      return FuseBox.init({
        homeDir: 'src',
        output: this.isProduction ? 'build/$name-$hash.js' : 'build/$name.js',
        sourceMaps: { vendor: false, project: true },
        useTypescriptCompiler: true,
        emitHMRDependencies: true,
        allowSyntheticDefaultImports: true,
        autoImport: {
          React: 'react',
        },
        log: {
          enabled: true,
        },
        cache: !this.isProduction,
        hash: this.isProduction,
        target: this.isProduction ? 'browser@es6' : 'browser@esnext',
        plugins: [
          EnvPlugin({
            NODE_ENV: this.isProduction ? 'production' : 'development',
          }),
          JSONPlugin(),
          this.isProduction && TerserPlugin(),
          this.isProduction &&
            QuantumPlugin({
              bakeApiIntoBundle: true,
              processPolyfill: true,
              replaceProcessEnv: true,
              ensureES5: false,
              target: 'browser',
              treeshake: false,
              uglify: { es6: true },
              sourceMaps: { vendor: true },
            }),
        ],
      })
    }
  },
)

task('clean', () => src('./build').clean('./build'))

task('build:client', async (ctx: IContext) => {
  let fuse = ctx.getConfig()

  ctx.clientVendorBundle = fuse
    .bundle('client/vendor')
    .instructions('~client/index.ts')
    .target('browser')
    .completed(() => { log('Building client bundle complete') })

  ctx.clientAppBundle = fuse
    .bundle('client/app')
    .instructions('>[client/index.ts]')
    .plugin(EnvPlugin({ BROWSER: true }))
    .target('browser')
    .completed(() => {
      log('Building client bundle complete')
    })

  // if (!ctx.isProduction) ctx.clientAppBundle.hmr().watch('**')

  await fuse.run()
})

task('build:server', [ 'build:client' ], async (ctx: IContext) => {
  let getLastGeneratedFileName = (bundle: Bundle) => bundle.context.output.lastGeneratedFileName

  let fuse = ctx.getConfig()
  let clientAppBundleFileName = getLastGeneratedFileName(ctx.clientAppBundle)
  let clientVendorBundleFileName = getLastGeneratedFileName(ctx.clientVendorBundle)

  fuse
    .bundle('server/bundle')
    .watch('**')
    .instructions(' > [server/index.ts]')
    .target('server@esnext')
    .completed(proc => proc.start([
      process.env.PORT,
      clientVendorBundleFileName,
      clientAppBundleFileName,
    ] as IProcessArgs))

  await fuse.run()
})

task('build:api', async (ctx: IContext) => {
  let fuse = ctx.getConfig()

  fuse
    .bundle('api/bundle')
    .watch('api/**')
    .instructions(' > [api/index.ts]')
    .target('server@esnext')
    .completed(proc => proc.start([process.env.API_PORT]))

  await fuse.run()
})

task('dev', ['clean', 'build:server'/*, 'build:api'*/], async (ctx: IContext) => {
  try {
    const fuse = ctx.getConfig()
    // fuse.dev({ httpServer: false, hmr: true })
    // await fuse.run()

    log('All bundles building complete. Ready to start the server...')
  } catch (err) {
    debug('server:fuse')(err)
  }
})

task('default', [ 'dev' ])

task('bump', () => {
  bumpVersion('package.json', { type: 'patch' });
})

task('precommit', [ 'bump' ])
