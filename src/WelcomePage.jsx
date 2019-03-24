import React, { Component } from 'react';

import { Page, Row, List, ListItem, ListHeader, Checkbox, Icon } from 'react-onsenui';

import NavBar from './NavBar';
import './WelcomePage.css';

class WelcomePage extends Component {
    render() {
        return(
            <Page renderToolbar={() => <NavBar title={this.props.layout.title} navigator={navigator} />}>
                <Row>
                    <ListHeader modifier="custom-list-header" style={{padding: '1rem', margin: 'auto'}}>
                        <Icon
                            size={60}
                            icon={'fa-check-circle-o'}
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
                </Row>
            </Page>
        )
    }
    onChangeCheckbox(event) {
        event.target.checked = !event.target.checked
    }
}

export default WelcomePage;