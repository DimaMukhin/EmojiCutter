import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';

import Intro from './Intro';
import Cutter from './Cutter';
import UploadInst from './UploadInst';
import EmojiString from './EmojiString';
import Footer from '../components/Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.cutterRef = React.createRef();
  }

  animatedScrollToCutter = () =>
    scroll.scrollTo(this.cutterRef.current.offsetTop);

  render() {
    return (
      <div style={styles.homeContainer}>
        <div style={styles.introWrapper}>
          <div style={styles.sectionContainer}>
            <Intro animatedScrollToCutter={this.animatedScrollToCutter} />
          </div>
        </div>
        <div ref={this.cutterRef} style={styles.cutterWrapper}>
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
    height: '100%'
  },
  introWrapper: {
    height: '100%',
    background:
      'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
    borderBottom: '1px solid #eeeeee'
  },
  sectionContainer: {
    margin: '0 auto',
    height: '100%',
    maxWidth: 1000
  },
  cutterWrapper: {
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '8px solid #eeeeee'
  },
  uploadInstWrapper: {
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '8px solid #eeeeee'
  },
  emojiStringWrapper: {
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eeeeee'
  },
  footerWrapper: {
    paddingTop: '20px',
    paddingBottom: '20px',
    background:
      'linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)'
  }
};

export default Home;
