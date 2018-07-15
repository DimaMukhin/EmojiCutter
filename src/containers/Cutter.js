import React, { Component } from 'react';

import emojiCutterClient from '../services/emoji-cutter-client';

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
        return (
            <div>
                <h1>Upload image Here</h1>
                <input type="file" onChange={this.fileSelectedHandler} name="upfile" value="" />
                <button onClick={this.fileUploadHandler}>Upload</button>
                <button onClick={this.fileDownloadHandler}>Download</button>
            </div>
        );
    }
}

export default Cutter;
