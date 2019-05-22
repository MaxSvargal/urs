import * as React from 'react'

declare global {
  const React: typeof React;

  /* tslint:disable:interface-name */
  interface Window {
    __initialState: object
  }
}
