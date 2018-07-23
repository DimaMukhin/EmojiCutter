import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import Radium from 'radium';

const FileSelectButton = (props) => {
    return (
        <div>
            <Label width="4" as="label" htmlFor="file" size="big" >
                <div style={styles.button}>
                    <Icon name="file" style={styles.label}/>
                    {props.buttonLabel ? props.buttonLabel : 'Select file'}
                </div>
            </Label>
            <input id="file" hidden type="file" name="upfile" onChange={props.onFileSelected} />
        </div>
    );
};

const styles = {
    button: {
        ':hover': {
            cursor: 'pointer',
        }
    }
}

export default Radium(FileSelectButton);
