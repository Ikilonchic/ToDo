import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import SignIn from './pages/SignIn.page';
import SignUp from './pages/SignUp.page';
import Main from './pages/Main.page';

export default class App extends React.Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route path='/' component={Main} exact />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>
    );
  }
};
