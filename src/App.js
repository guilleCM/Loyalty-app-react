import React, { Component } from 'react';
import { Navigator } from 'react-onsenui';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.css';

import MainPage from './MainPage.jsx';

const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
);

class App extends Component {
    render() {
        return (
            <Navigator
                renderPage={renderPage}
                initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
            />
        );
    }
}

export default App;
