import React, { Component } from 'react';

import Intro from './Intro';
import Cutter from './Cutter';
import UploadInst from './UploadInst';
import EmojiString from './EmojiString';
import Footer from '../components/Footer';

class Home extends Component {
    render() {
        return (
            <div style={styles.homeContainer}>
                <div style={styles.introWrapper}>
                    <Intro />
                </div>
                <div style={styles.cutterWrapper}>
                    <Cutter />                    
                </div>
                <div style={styles.uploadInstWrapper}>
                    <UploadInst />
                </div>
                <div style={styles.emojiStringWrapper}>
                    <EmojiString />
                </div>
                <div style={styles.footerWrapper}>
                    <Footer />
                </div>
            </div>
        );
    }
}

const styles = {
    homeContainer: {
        color: '#777777',
        margin: '0 auto',
        height: '100%',
        maxWidth: 1000
    },
    introWrapper: {        
        height: '100%',
        margin: '0 -9999rem',
        padding: '0.25rem 9999rem',
        backgroundColor: '#443642'
    },
    cutterWrapper: {
        margin: '0 -9999rem',
        padding: '0.25rem 9999rem',
        backgroundColor: '#e6186d'
    },
    uploadInstWrapper: {
        margin: '0 -9999rem',
        padding: '0.25rem 9999rem',
        backgroundColor: '#edb625'
    },
    emojiStringWrapper: {
        margin: '0 -9999rem',
        padding: '0.25rem 9999rem',
        backgroundColor: '#49c4a1'
    },
    footerWrapper: {
        margin: '0 -9999rem',
        padding: '0.25rem 9999rem',
        backgroundColor: '#81d2e0'
    }
}

export default Home;