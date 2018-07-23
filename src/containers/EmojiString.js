import React, { Component } from 'react';

import CircleSpace from '../components/CircleSpace';

class EmojiString extends Component {
    render() {
        return (
            <div style={styles.emojiStringContainer}>
                <h1 style={styles.emojiStringHeading}>Use the Emoji</h1>
                <div style={styles.emojiStringBody}>
                    <div style={styles.emojiStringBodyLeft}>
                        <CircleSpace style={styles.circleStepStyle}>
                            <h1>3</h1>
                        </CircleSpace>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    emojiStringContainer: {
        textAlign: 'center',
    },
    emojiStringHeading: {
        textAlign: 'center'
    },
    emojiStringBody: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    emojiStringBodyLeft: {
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

export default EmojiString;
