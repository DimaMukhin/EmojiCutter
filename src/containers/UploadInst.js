import React, { Component } from 'react';

import CircleSpace from '../components/CircleSpace';

class UploadInst extends Component {
    render() {
        return (
            <div style={styles.uploadInstContainer}>
                <h1 style={styles.uploadInstHeading}>Upload Emoji to Slack</h1>
                <div style={styles.uploadInstBody}>
                    <div >

                    </div>
                    <div>

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
        textAlign: 'center',
    },
    uploadInstHeading: {
        textAlign: 'center'
    },
    uploadInstBody: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    uploadInstBodyRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleStepStyle: {
        width: 100,
        height: 100,
        color: 'white',
        backgroundColor: '#9bc1ff'
    }
}

export default UploadInst;