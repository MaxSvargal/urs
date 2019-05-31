import React from 'react'
import { default as serialize } from 'serialize-javascript'

export interface IServerPageProps {
  body: JSX.Element
  bundles: string[]
  state: object
}

export default ({ bundles, body, state }: IServerPageProps) => (
  <html lang='en'>
    <head>
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      <meta name='theme-color' content='#000000' />
      <meta content='IE=Edge' httpEquiv='X-UA-Compatible' />
      <meta name='debug' content='v2' />
      <title>Fuse</title>
    </head>
    <body>
      <div id='root'>{ body }</div>
      {<script dangerouslySetInnerHTML={{__html: `window.__initialState=${serialize(state || {})};`}} charSet='UTF-8'/>}
      {bundles.map(bundle => (
        <script key={bundle} src={ `/${bundle}`} />
      ))}
    </body>
  </html>
)
