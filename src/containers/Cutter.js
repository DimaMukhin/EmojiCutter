import React, { Component } from 'react';
import axios from 'axios';

class Cutter extends Component {
    state = {
        selectedFile: undefined,
        zipFileName: undefined,
    }

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    fileUploadHandler = () => {
        const formData = new FormData();
        formData.append('upfile', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('/api/emoji', formData, {
            onUploadProgress: progressEvent => {
                console.log(progressEvent.loaded / progressEvent.total)
            }
        }).then((res) => {
            this.setState({ zipFileName: res.data.fileName });
        });
    }

    fileDownloadHandler = () => {
        window.open(`/api/emoji/${this.state.zipFileName}`);
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