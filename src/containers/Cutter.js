import React, { Component } from 'react';
import { Input, Button, Progress } from 'semantic-ui-react';

import emojiCutterClient from '../services/emoji-cutter-client';
import FileSelectButton from '../components/FileSelectButton';
import CircleSpace from '../components/CircleSpace';

class Cutter extends Component {
    state = {
        selectedFile: undefined,
        largeEmojiFileName: undefined,
        fileUploadPercent: 0,
    }

    fileSelectedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] });
    }

    fileUploadHandler = () => {
        if (!this.state.selectedFile)
            return;

        emojiCutterClient.cutImageToLargeEmoji(this.state.selectedFile, this.updateUploadProgressHandler)
            .then((res) => {
                this.setState({ largeEmojiFileName: res.data.fileName });
            }).catch((err) => {
                // TODO: handle cutting rejection
            });
    }

    updateUploadProgressHandler = (progressEvent) => {
        if (!progressEvent)
            return;

        console.log(Math.round(progressEvent.loaded / progressEvent.total * 100));
        this.setState({ fileUploadPercent: Math.round(progressEvent.loaded / progressEvent.total * 100) });
    }

    fileDownloadHandler = () => {
        if (!this.state.largeEmojiFileName)
            return;

        emojiCutterClient.downloadEmojiInNewWindow(this.state.largeEmojiFileName);
    }

    render() {
        const uploadFileLabel = this.state.selectedFile ? this.state.selectedFile.name : 'Select file';

        return (
            <div style={styles.cutterContainer}>
                <h1 style={styles.cutterHeading}>Create HUGE Emoji</h1>
                <div style={styles.cutterBody}>
                    <div style={styles.cutterBodyLeft}>
                        <CircleSpace style={styles.circleStepStyle}>
                            <h1>1</h1>
                        </CircleSpace>
                    </div>
                    <div style={styles.cutterBodyCenter}>
                        <h3>Select a file</h3>
                        <FileSelectButton onFileSelected={this.fileSelectedHandler} buttonLabel={uploadFileLabel} />
                        <h3>Name your emoji</h3>
                        <Input fluid placeholder='my-huge-emoji' width={'auto'} />
                        <div style={styles.genDownButtonsContainer}>
                            <div>
                                <h3>Generate emoji</h3>
                                <Button onClick={this.fileUploadHandler}>Generate</Button>
                            </div>
                            <div>
                                <h3>Download emoji</h3>
                                <Button onClick={this.fileDownloadHandler}>Download</Button>
                            </div>
                        </div>
                        {
                            this.state.fileUploadPercent ? 
                            <div style={styles.progressBarContainer}>
                                <Progress percent={this.state.fileUploadPercent} indicating />
                            </div> :
                            undefined
                        }
                        
                    </div>
                    <div>
                        {/* right side */}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    cutterContainer: {
        textAlign: 'center',
    },
    cutterHeading: {
        textAlign: 'center'
    },
    cutterBody: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    cutterBodyCenter: {
        textAlign: 'left'
    },
    cutterBodyLeft: {
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
    genDownButtonsContainer: {
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    progressBarContainer: {
        paddingTop: '20px',
    },
}

export default Cutter;
