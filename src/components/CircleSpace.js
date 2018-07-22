import React from 'react';

const CircleSpace = (props) => {
    const circleStyle = {
        ...defaultStyles,
        ...props.style
    }

    return (
        <div style={circleStyle}>
            { props.children }
        </div>
    );
};

const defaultStyles = {
    display: 'flex',
    borderRadius: '50%',
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
}

export default CircleSpace;