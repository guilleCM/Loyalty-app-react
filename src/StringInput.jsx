import React, { Component } from 'react';

import { Input } from 'react-onsenui';

class StringInput extends Component {
    render() {
        let placeholder = this.props.label + (this.props.required ? " *" : "");
        return (
            <div className="input-wrapper">
                <Input
                    float
                    onChange={(event) => this.props.onInputChange(this.props.name, event.target.value)}
                    modifier='material custom-input'
                    placeholder={placeholder}
                    type={this.props.type}
                    required={this.props.required}
                    name={this.props.name}
                    pattern={this.props.pattern}
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