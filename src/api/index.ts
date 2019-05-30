import fastify from 'fastify'
import cors from 'fastify-cors'
import { AddressInfo } from 'net'

import * as ApiTypes from '~/common/models/api'
import { routes } from './routes'

const DEFAULT_PORT = 3000
const PORT = parseInt(process.env.PORT, 10) || DEFAULT_PORT

const app = fastify()
app.register(cors)
routes.map(route => route(app))

/* tslint:disable:no-console no-unbound-method */
const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`API server emulator listening on port ${(app.server.address() as AddressInfo).port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start().catch(console.error)

export type App = typeof app
export { ApiTypes }
