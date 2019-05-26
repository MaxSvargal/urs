import { Route, Switch } from 'react-router'

import Header from 'components/Header'
import { SmartForm } from 'components/smartForm/SmartForm'

export const App = () =>
  <Switch>
    <Route exact path='/book/:step' component={SmartForm} />
    <Route component={Header} />
  </Switch>
