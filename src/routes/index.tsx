import { Switch, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { CreateRecipes } from '../pages/Recipes/Create'

import { UserProtectRoute } from './UserProtectRoute'

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />

      <UserProtectRoute path="/recipes/create" component={CreateRecipes} />
    </Switch>
  )
}
