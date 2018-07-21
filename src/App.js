import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={styles.appContainer}>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    );
  }
}

const styles = {
  appContainer: {
    height: '100%'
  }
}

export default App;
