import {Route, Redirect, Switch} from 'react-router-dom'

// import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'

import CoursesDetails from './components/CoursesDetails'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CoursesDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
