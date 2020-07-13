import React, { Component } from 'react';
import AppWrapper from './Components/AppWrapper/AppWrapper';
import PrivacyPolicy from './Components/Privacy/PrivacyPolicy';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {    
    return (
      <Router className="dark-body">
        <Switch>
          <Route exact path ='/' component={AppWrapper}></Route>
          <Route exact path='/privacy' component={PrivacyPolicy}></Route> 
        </Switch>
      </Router>
    );
  }
}

export default App;