import React, { Component } from 'react';

import { Page, List, ListItem, ListHeader, Checkbox, Button, Row } from 'react-onsenui';

import NavBar from './NavBar';
import FormPage from './FormPage';
import withLayout from './WithLayoutContainer';
import './MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: 0 
        }
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onClickNextBtn = this.onClickNextBtn.bind(this);
    }
    componentDidMount() {
        document.getElementsByClassName('.font-animate').fontAnimate({
            stroke: 'red',
            duration: 500 // Vivus specific animation option
        });        
    }
    render() {
        return(
            <Page renderToolbar={() => <NavBar title={this.props.layout.title} navigator={navigator} />}>
                <i className="fab fa-apple font-animate"></i>
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
        // window.history.pushState({}, "", "?user_type="+this.state.userType)
        this.props.navigator.pushPage({
            component: withLayout(FormPage, "FormPage"+this.state.userType), key: 'FORM_PAGE_'+this.state.userType
        })
    }

}

export default MainPage;