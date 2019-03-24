import React, { Component } from 'react';

import { Page, List, ListItem, ListHeader, Checkbox, Icon } from 'react-onsenui';

import NavBar from './NavBar';
import './WelcomePage.css';

class WelcomePage extends Component {
    render() {
        return(
            <Page renderToolbar={() => <NavBar title={this.props.layout.title} navigator={navigator} />}>
                <ListHeader modifier="custom-list-header" style={{paddingTop: 'calc(1rem + 40px)', margin: 'auto'}}>
                    <Icon
                        size={{default: 100}}
                        icon={{default: 'fa-check-circle'}}
                    />
                    <h3>{this.props.layout.sub_title}</h3>
                </ListHeader>
                <List
                    dataSource={this.props.layout.advantages}
                    renderHeader={() => <ListHeader modifier="adv-list-header" >Advantages:</ListHeader>}
                    renderRow={(adv, index) => {
                        let isChecked = index !== 2;
                        return (
                            <ListItem key={index} modifier={"custom-list-item" + (isChecked ? " item-selected" : "")} tappable>
                                <label className="left">
                                    <Checkbox 
                                        inputId={'checkbox' + index} 
                                        onChange={(e) => this.onChangeCheckbox(e)}
                                        checked={isChecked}
                                    />
                                </label>
                                <label htmlFor={'checkbox' + index} className={"center"}>
                                    {adv.caption}
                                </label>
                            </ListItem>
                        );
                    }}
                />
            </Page>
        )
    }
    onChangeCheckbox(event) {
        event.target.checked = !event.target.checked
    }
}

export default WelcomePage;