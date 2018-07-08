import React, { Component } from 'react';

class Cutter extends Component {
    render() {
        return (
            <div>
                <form class="fileupload" action="/api/emoji" method="post" enctype="multipart/form-data">
                    <h1>Upload image Here</h1>
                    <input type="file" name="upfile" value="" />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default Cutter;