import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <form class="fileupload" action="/api/emoji" method="post" enctype="multipart/form-data">
        <h1>Welcome to Slack Emoji Cutter</h1>
        <hr />
        <h1>Upload image Here</h1>
        <input type="file" name="upfile" value="" />
        <input type="submit" />
        <hr />
        <h1>GitHub: <a href="https://github.com/DimaMukhin/EmojiCutter" target="_blank">https://github.com/DimaMukhin/EmojiCutter</a></h1>
      </form>
    );
  }
}

export default App;
