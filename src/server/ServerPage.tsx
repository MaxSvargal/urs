import * as React from 'react'

export interface IServerPageProps {
  body: JSX.Element
  bundle: string
}

export default ({ bundle, body }: IServerPageProps) => (
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      <meta name="theme-color" content="#000000" />
      <meta content="IE=Edge" httpEquiv="X-UA-Compatible" />
      <meta name="debug" content="v2" />
      <title>Fuse</title>
    </head>
    <body>
      <div id="root">{ body }</div>
      <script src={ bundle } />
    </body>
  </html>
)
