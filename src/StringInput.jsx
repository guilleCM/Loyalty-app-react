import React, { Component } from 'react';

import { Input } from 'react-onsenui';

class StringInput extends Component {
    render() {
        let placeholder = this.props.label + (this.props.required ? " *" : "");
        let props = {
            placeholder: placeholder,
            type: this.props.type,
            name: this.props.name,
            pattern: this.props.pattern,
        }
        if (this.props.required) props['required'] = true;
        return (
            <div className="input-wrapper">
                <Input
                    float
                    onChange={(event) => this.props.onInputChange(this.props.name, event.target.value)}
                    modifier='material custom-input'
                    {...props}
                />
                {this.props.isInvalid &&
                    <span className="input-feedback-invalid">
                        {this.props.feedback}
                    </span>
                }
            </div>
        )
    }
}

export default StringInput;