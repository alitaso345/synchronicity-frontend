import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Root from './Root'
import Settings from './Settings'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Root} />
        <Route path='/settings' component={Settings} />
      </Switch>
    </Router>
  )
}

export default App