import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Page, List, ListItem, ListHeader, Checkbox, Button, Row } from 'react-onsenui';

import NavBar from './../../components/layout/NavBar';
import FormPage from './../form/FormPage';
import withLayout from './../../lib/WithLayoutContainer';
import './SignupPage.css';

const propTypes = {
    layout: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
};

@inject('store')
@observer 
class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 0 
        }
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onClickNextBtn = this.onClickNextBtn.bind(this);
    }
    render() {
        return(
            <Page renderToolbar={() => <NavBar title={this.props.layout.title} navigator={navigator} />}>
                <List
                    dataSource={this.props.layout.select}
                    renderHeader={() => <ListHeader modifier="custom-list-header">{this.props.layout.sub_title}</ListHeader>}
                    renderRow={(select, index) => {
                        let isChecked = this.state.userType === select.value;
                        return (
                            <ListItem key={index} modifier={"custom-list-item" + (isChecked ? " item-selected" : "")} tappable>
                                <label className="left">
                                    <Checkbox 
                                        inputId={'checkbox' + index} 
                                        onChange={() => this.onChangeCheckbox(select.value)}
                                        checked={isChecked}
                                    />
                                </label>
                                <label htmlFor={'checkbox' + index} className={"center"}>
                                    {select.caption}
                                </label>
                            </ListItem>
                        );
                    }}
                    renderFooter={() => 
                        <ListHeader modifier="custom-list-footer">
                            {this.props.layout.advantages.charAt(0).toUpperCase() + this.props.layout.advantages.slice(1)}
                        </ListHeader>
                    }
                />
                <Row style={{padding: '1rem'}}>
                    <Button modifier="large--cta custom-btn" ripple onClick={this.onClickNextBtn}>
                        {this.props.layout.next_step}
                    </Button>
                </Row>
            </Page>
        )
    }

    onChangeCheckbox(index) {
        this.setState({
            userType: index,
        })
    }

    onClickNextBtn() {
        this.props.store.setUserType(this.state.userType);
        this.props.navigator.pushPage({
            component: withLayout(FormPage, "FormPage"+this.state.userType), key: 'FORM_PAGE_'+this.state.userType
        })
    }

}

SignupPage.propTypes = propTypes;

export default SignupPage;