import React, { Component } from 'react';

import { Page, List, ListItem, ListHeader, Checkbox, Button, Row } from 'react-onsenui';

import NavBar from './NavBar';
import FormPage from './FormPage';

import './MainPage.css';


const userTypes = ['A HOTEL GUEST', 'A TRAVEL AGENCY', 'A COMPANY']
class MainPage extends Component {
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
            <Page renderToolbar={() => <NavBar title='SIGNUP' navigator={navigator} />}>
                <List
                    dataSource={userTypes}
                    renderHeader={() => <ListHeader modifier="custom-list-header">WHAT KIND OF USER ARE YOU?</ListHeader>}
                    renderRow={(caption, index) => {
                        let isChecked = this.state.userType === index;
                        return (
                            <ListItem key={index} modifier={"custom-list-item" + (isChecked ? " item-selected" : "")} tappable>
                                <label className="left">
                                    <Checkbox 
                                        inputId={'checkbox' + index} 
                                        onChange={() => this.onChangeCheckbox(index)}
                                        checked={isChecked}
                                    />
                                </label>
                                <label htmlFor={'checkbox' + index} className={"center"}>
                                    {caption}
                                </label>
                            </ListItem>
                        );
                    }}
                    renderFooter={() => <ListHeader modifier="custom-list-footer">Enjoy a 10% discount just for signup</ListHeader>}
                />
                <Row style={{padding: '1rem'}}>
                    <Button modifier="large--cta custom-btn" ripple onClick={this.onClickNextBtn}>
                        NEXT
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
        this.props.navigator.pushPage({
            component: FormPage, key: 'FORM_PAGE'
        })
    }

}

export default MainPage;