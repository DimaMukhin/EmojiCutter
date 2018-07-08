import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
        <hr />
        <h1>GitHub: <a href="https://github.com/DimaMukhin/EmojiCutter" target="_blank">https://github.com/DimaMukhin/EmojiCutter</a></h1>
      </div>
    );
  }
}

export default App;
