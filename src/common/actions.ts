export const createAction = <T>(type: string) => (payload: T) =>
  ({ type, payload })

export const changeTheme = createAction<{ newTheme: string }>('changeTheme')
export const increment = createAction('increment')

//type ActionCreator = ()
// TODO: wrap reducer to check actions
export type Action = { type: string }
