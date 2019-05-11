import React, { createContext } from 'react'

export const ServerContext = createContext<Array<Promise<unknown>>>([])
