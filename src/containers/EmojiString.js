import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import CircleSpace from '../components/CircleSpace';

class EmojiString extends Component {
    render() {
        return (
            <div style={styles.emojiStringContainer}>
                <div style={styles.emojiStringBody}>
                    <div style={styles.emojiStringBodyLeft}>
                        <CircleSpace style={styles.circleStepStyle}>
                            <h1>3</h1>
                        </CircleSpace>
                    </div>
                    <div>
                        <h1 style={styles.emojiStringHeading}>Use the Emoji</h1>
                        <ul style={styles.topInstructionsList}>
                            <li><h4>Emoji string will appear after generating an emoji</h4></li>
                            <li><h4>Copy and paste the text below to a slack chat after uploading the emoji</h4></li>
                        </ul>
                        <Segment>
                            <div style={styles.copyToClipboardButton}>
                                <CopyToClipboard text={this.props.emojiString}>
                                    <Button floated='right'>
                                        <Button.Content visible>
                                            <Icon name='clipboard' />
                                        </Button.Content>
                                    </Button>
                                </CopyToClipboard>
                            </div>

                            <div style={styles.emojiStringSegment}>
                                { this.props.emojiString }
                            </div>
                        </Segment>
                    </div>
                    <div />
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
        gridTemplateColumns: '1fr 2fr',
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
    },
    emojiStringSegment: {
        minHeight: 60,
        maxHeight: 200,
        overflow: 'auto',
    },
    copyToClipboardButton: {
        position: 'absolute',
        right: 30,
        bottom: 30
    },
    topInstructionsList: {
        listStyleType: 'none'
    }
}

const mapStateToProps = state => ({
    emojiString: state.emoji.emojiString
});

export default connect(mapStateToProps, null)(EmojiString);
