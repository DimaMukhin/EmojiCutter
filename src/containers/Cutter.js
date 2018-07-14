import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'react-file-download';

class Cutter extends Component {
    state = {
        selectedFile: null
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
            console.log(res);
            fileDownload(res.data, res.headers['file-name']);
        });
    }

    render() {
        return (
            <div>
                <h1>Upload image Here</h1>
                <input type="file" onChange={this.fileSelectedHandler} name="upfile" value="" />
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }
}

export default Cutter;