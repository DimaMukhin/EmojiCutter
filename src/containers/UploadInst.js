import React, { Component } from 'react';

import CircleSpace from '../components/CircleSpace';

class UploadInst extends Component {
  render() {
    return (
      <div style={styles.uploadInstContainer}>
        <h1 style={styles.uploadInstHeading}>Upload Emoji to Slack</h1>
        <div style={styles.uploadInstBody}>
          <div />
          <div style={styles.uploadInstBodyCenter}>
            <ol>
              <li>
                <h4>Download the emoji zip file</h4>
              </li>
              <li>
                <h4>
                  Get this Chrome extension:
                  <a
                    href="https://goo.gl/BMtB7S"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://goo.gl/BMtB7S
                  </a>
                </h4>
              </li>
              <li>
                <h4>{'Go to https://<your_team>.slack.com/customize/emoji'}</h4>
              </li>
              <li>
                <h4>
                  Drag and drop all emojis from the zip file to the Bulk Emoji
                  Uploader drop area
                </h4>
              </li>
            </ol>
          </div>
          <div style={styles.uploadInstBodyRight}>
            <CircleSpace style={styles.circleStepStyle}>
              <h1>2</h1>
            </CircleSpace>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  uploadInstContainer: {
    textAlign: 'center'
  },
  uploadInstHeading: {
    textAlign: 'center'
  },
  uploadInstBody: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  uploadInstBodyCenter: {
    textAlign: 'left'
  },
  uploadInstBodyRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleStepStyle: {
    width: 100,
    height: 100,
    color: 'white',
    backgroundColor: '#9bc1ff'
  }
};

export default UploadInst;
