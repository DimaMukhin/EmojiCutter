import React from 'react';
import { Label, Button } from 'semantic-ui-react';

const FileUploadButton = (props) => {
    return (
        <div>
            <Label
                as="label"
                basic
                htmlFor="upload">
                <Button
                    icon="upload"
                    label={{
                        basic: true,
                        content: props.buttonLabel ? props.buttonLabel : 'Select file'
                    }}
                    labelPosition="right" />
                <input
                    hidden
                    id="upload"
                    name="upfile"
                    multiple
                    type="file"
                    onChange={props.onFileSelected}
                />
            </Label>
        </div>
    );
};

export default FileUploadButton;