import { connect } from "react-redux"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import routes from './routes.js'

import { UserMsg } from './cmps/user-msg.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { AppHeader } from './cmps/app-header.jsx'
function _App() {
  return (
    <div className="app">
      <Router>
        <AppHeader />


        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>

        <AppFooter />
       <UserMsg />
      </Router>
    </div>
  )
}






function mapStateToProps(storeState) {
  return {
    // msg: userMsgModule.msg

  }
}
const mapDispatchToProps = {
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)


