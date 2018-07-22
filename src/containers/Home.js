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
                    <div style={styles.sectionContainer}>
                        <Intro />
                    </div>
                </div>
                <div style={styles.cutterWrapper}>
                    <div style={styles.sectionContainer}>
                        <Cutter />
                    </div>
                </div>
                <div style={styles.uploadInstWrapper}>
                    <div style={styles.sectionContainer}>
                        <UploadInst />
                    </div>
                </div>
                <div style={styles.emojiStringWrapper}>
                    <div style={styles.sectionContainer}>
                        <EmojiString />
                    </div>
                </div>
                <div style={styles.footerWrapper}>
                    <div style={styles.sectionContainer}>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    homeContainer: {
        height: '100%',
    },
    introWrapper: {
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
        borderBottom: '1px solid #eeeeee'
    },
    sectionContainer: {
        margin: '0 auto',
        height: '100%',
        maxWidth: 1000,
    },
    cutterWrapper: {
        minHeight: '500px',
        paddingTop: '20px',
        borderBottom: '1px solid #eeeeee'
    },
    uploadInstWrapper: {

    },
    emojiStringWrapper: {

    },
    footerWrapper: {

    },
}

export default Home;