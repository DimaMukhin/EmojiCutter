import React, { Component } from 'react';

import emojiCutterClient from '../services/emoji-cutter-client';
import FileSelectButton from '../components/FileSelectButton';
import CircleSpace from '../components/CircleSpace';

class Cutter extends Component {
    state = {
        selectedFile: undefined,
        largeEmojiFileName: undefined,
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

        console.log(progressEvent.loaded / progressEvent.total);
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
                    <div>
                        <input type="file" onChange={this.fileSelectedHandler} name="upfile" value="" style={{ display: 'none' }} />
                        <FileSelectButton onFileSelected={this.fileSelectedHandler} buttonLabel={uploadFileLabel} />
                        <button onClick={this.fileUploadHandler}>Upload</button>
                        <button onClick={this.fileDownloadHandler}>Download</button>
                    </div>
                    <div>
                        
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
    }
}

export default Cutter;
