import React from 'react';

import StringInput from './StringInput';
import './Input.css';

function InputHOC(props) {
    switch (props.type) {
        case 'tel':
            return <StringInput {...props} pattern="\d*"/>;
        default:
            return <StringInput {...props} />;;
    }
}

export default InputHOC;