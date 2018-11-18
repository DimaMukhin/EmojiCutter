import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import introGif from '../res/intro.gif';

class Intro extends Component {
  render() {
    return (
      <div style={styles.introContainer}>
        <h1 style={styles.introTitle}>Emoji Cutter Beta</h1>
        <div style={styles.introBodyContainer}>
          <div style={styles.introDescriptionContainer}>
            <h2>Post HUGE Emojis on Slack</h2>
            <h2>Share with friends</h2>
            <h2>Profit!</h2>
          </div>
          <div style={styles.introGifContainer}>
            <img src={introGif} alt="GIF" />
          </div>
        </div>
        <div>
          <Icon
            style={styles.introArrowIcon}
            onClick={this.props.animatedScrollToCutter}
            name="arrow alternate circle down"
            size={'huge'}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  introContainer: {
    textAlign: 'center',
    height: '100%'
  },
  introTitle: {
    margin: 0,
    paddingTop: '20px'
  },
  introBodyContainer: {
    height: '80%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center'
  },
  introDescriptionContainer: {},
  introGifContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    backgroundColor: '#aaaaaa',
    outline: '1px solid black'
  },
  introArrowIcon: {
    cursor: 'pointer'
  }
};

export default Intro;
