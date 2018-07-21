import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    );
  }
}

export default App;
