import React, { Component } from 'react';
import { Navigator } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.css';

import withLayoutContainer from './../../lib/WithLayoutContainer';
import WelcomePage from './../../pages/welcome/WelcomePage';
// const InitialRoute = withLayoutContainer(SignupPage);

const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
);

class App extends Component {
    render() {
        return (
            <Navigator
                renderPage={renderPage}
                initialRoute={{component: withLayoutContainer(WelcomePage, "WelcomePage0", true), key: 'WELCOME_PAGE'}}
                animation='fade'
            />
        );
    }
}

export default App;
