import React, { Component } from 'react';

import Intro from './Intro';
import Cutter from './Cutter';
import UploadInst from './UploadInst';
import EmojiString from './EmojiString';
import Footer from '../components/Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <Intro />
                <hr />
                <Cutter />
                <hr />
                <UploadInst />
                <hr />
                <EmojiString />
                <hr />
                <Footer />
            </div>
        );
    }
}

export default Home;