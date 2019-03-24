import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Page, List, ListItem, Button, Row, ListHeader, ProgressCircular } from 'react-onsenui';

import NavBar from './NavBar';
import InputHOC from './InputHOC';
import withLayout from './WithLayoutContainer';
import WelcomePage from './WelcomePage';
import './FormPage.css';

const propTypes = {
    layout: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
};

@inject('store')
@observer 
class FormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.formRef = React.createRef();
        this.onInputChange = this.onInputChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    render() {
        return(
            <Page renderToolbar={() => <NavBar backButton title={this.props.layout.title} navigator={this.props.navigator} />}>
                <form ref={this.formRef}>
                    <List
                        style={{paddingTop: '12px'}}
                        dataSource={this.props.layout.fields}
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
                        renderFooter={() => <ListHeader modifier="custom-form-footer">{this.props.layout.form_help}</ListHeader>}
                    />
                    <Row style={{padding: '1rem'}}>
                        <Button modifier="large--cta custom-btn" ripple onClick={(e) => this.onClickSubmit(e)}>
                            {!this.state.fetching ?
                                this.props.layout.next_step
                                :
                                <ProgressCircular style={{verticalAlign: 'middle'}} indeterminate modifier="send-btn-progress" />
                            }
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
    onClickSubmit(event) {
        if (this.state.fetching) {
            event.preventDefault();
            return false;
        }
        let isValidForm = true;
        let newState = {};
        let dataToSend = {};
        for (let field of this.props.layout.fields) {
            let input = this.formRef.current.querySelector('input[name="'+field.name+'"]');
            if (input.checkValidity()) {
                newState[field.name] = this.state[field.name];
                newState[field.name+"-isInvalid"] = false;
                newState[field.name+"-feedback"] = '';
                dataToSend[field.name] = this.state[field.name];
            }
            else {
                isValidForm = false;
                newState[field.name] = this.state[field.name];
                newState[field.name+"-isInvalid"] = true;
                newState[field.name+"-feedback"] = input.validationMessage;
            }
        }
        if (isValidForm) {
            newState['fetching'] = true;
            this.setState(newState);
            let fetchOptions = {
                method: 'post',
                body: JSON.stringify(dataToSend),
            }
            const url = 'https://demo0339219.mockable.io/users';
            fetch(url, fetchOptions)
                .then(response => response.json())
                .then(data => {
                    //here we should get the response data but for now we just get it from the state 
                    let fieldName = ["name", "agency_name", "company_name"];
                    let mockName = newState[fieldName[this.props.store.userType]];
                    this.props.store.loginUser(mockName);
                    this.props.navigator.pushPage({
                        component: withLayout(WelcomePage, "WelcomePage0"), key: 'WELCOME_PAGE_0'
                    });
                })
                .catch(error => this.setState({ error: true }))
        }
        else {
            this.setState(newState);
        }
    }
}

FormPage.propTypes = propTypes;

export default FormPage;