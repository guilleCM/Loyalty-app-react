import React, { Component } from 'react';

import { Page, List, ListItem, Button, Row, ListHeader } from 'react-onsenui';

import NavBar from './NavBar';
import InputHOC from './InputHOC';
import './FormPage.css';

const fields = [
    {
        name: "name",
        label: "Name",
        type: "string",
        required: true
    },
    {
        name: "last_name",
        label: "Last Name",
        type: "string",
        required: true
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        required: true
    },
    {
        name: "phone",
        label: "Phone",
        type: "tel",
        required: true
    },

]
class FormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.formRef = React.createRef();
        this.onInputChange = this.onInputChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    render() {
        return(
            <Page renderToolbar={() => <NavBar backButton title='HOTEL GUEST' navigator={this.props.navigator} />}>
                <form ref={this.formRef}>
                    <List
                        style={{paddingTop: '12px'}}
                        dataSource={fields}
                        renderRow={(field, index) => {
                            return (
                                <ListItem key={index} tappable modifier="nodivider">
                                    <InputHOC
                                        type={field.type}
                                        required={field.required}
                                        name={field.name}
                                        label={field.label}
                                        onInputChange={this.onInputChange}
                                        isInvalid={this.state[field.name+"-isInvalid"]}
                                        feedback={this.state[field.name+"-feedback"]}
                                    />
                                </ListItem>
                            );
                        }}
                        renderFooter={() => <ListHeader modifier="custom-form-footer">* required field</ListHeader>}
                    />
                    <Row style={{padding: '1rem'}}>
                        <Button modifier="large--cta custom-btn" ripple onClick={this.onClickSubmit}>
                            SEND
                        </Button>
                    </Row>
                </form>
            </Page>
        )
    }
    onInputChange(name, value) {
        this.setState({
            [name]: value,
        });
    }
    onClickSubmit() {
        let isValidForm = true;
        let newState = {};
        for (let field of fields) {
            let input = this.formRef.current.querySelector('input[name="'+field.name+'"]');
            if (input.checkValidity()) {
                newState[field.name] = this.state[field.name];
                newState[field.name+"-isInvalid"] = false;
                newState[field.name+"-feedback"] = '';
            }
            else {
                isValidForm = false;
                newState[field.name] = this.state[field.name];
                newState[field.name+"-isInvalid"] = true;
                newState[field.name+"-feedback"] = input.validationMessage;
            }
        }
        if (isValidForm) {
            this.setState(newState);
            console.log("Send")
        }
        else {
            this.setState(newState);
        }
    }
}

export default FormPage;