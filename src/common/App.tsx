import { Route, Switch } from 'react-router'

import { SmartForm } from '~/common/smartForm/components/SmartForm'
import Header from './Header'
import { ContentGrid, HomeRootGrid } from './shared/components/layout/MainLayout'

export const App = () => (
  <HomeRootGrid>
    <ContentGrid>
      <Switch>
        <Route exact={true} path='/book/:step' component={SmartForm} />
        <Route component={Header} />
      </Switch>
    </ContentGrid>
  </HomeRootGrid>
)
