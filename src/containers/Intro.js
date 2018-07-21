import React, { Component } from 'react';

class Intro extends Component {
    render() {
        return (
            <div style={styles.introContainer}>
                <h1 style={{margin: 0}}>Emoji Cutter Alpha</h1>
                <div style={styles.introBodyContainer}>
                    <div style={styles.introDescriptionContainer}>
                        <h2>Post HUGE Emojis on Slack</h2>
                        <h2>Post HUGE Emojis on Slack</h2>
                        <h2>Post HUGE Emojis on Slack</h2>
                    </div>
                    <div style={styles.introGifContainer}>
                        <h3>GIF</h3>
                    </div>
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
    introBodyContainer: {
        height: '80%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
    },
    introDescriptionContainer: {
        
    },
    introGifContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        backgroundColor: '#aaaaaa'
    }
}

export default Intro;