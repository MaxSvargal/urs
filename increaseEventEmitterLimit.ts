import { EventEmitter } from 'events'

export let increaseEventEmitterLimit = () => {
  // tslint:disable-next-line: no-magic-numbers
  EventEmitter.defaultMaxListeners = 21
}
