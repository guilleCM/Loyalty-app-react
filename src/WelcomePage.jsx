import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Page, List, ListItem, ListHeader, Checkbox, Icon } from 'react-onsenui';


import NavBar from './NavBar';
import './WelcomePage.css';

@inject('store')
@observer 
class WelcomePage extends Component {
    render() {
        const userTypes = {
            HOTEL_GUEST: 0,
            TRAVEL_AGENCY: 1,
            COMPANY: 2,
        } 
        return(
            <Page renderToolbar={() => <NavBar title={this.props.layout.title} navigator={navigator} />}>
                <ListHeader modifier="custom-list-header" style={{paddingTop: '1rem', margin: 'auto'}}>
                    {this.props.store.userType !== userTypes.HOTEL_GUEST &&
                        <h3>{this.props.layout.sub_title_1 + " " + this.props.store.userName + "!"}</h3>
                    }
                    <Icon
                        style={{paddingTop: 30, paddingBottom: 30}}
                        size={{default: 100}}
                        icon={{default: 'fa-check-circle'}}
                    />
                    {this.props.store.userType === userTypes.HOTEL_GUEST &&
                        <h3>{this.props.layout.sub_title_0 + " " + this.props.store.userName + "!"}</h3>
                    }
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