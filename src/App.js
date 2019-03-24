import React, { Component } from 'react';
import { Navigator } from 'react-onsenui';
import { Provider } from 'mobx-react';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.css';

import withLayoutContainer from './WithLayoutContainer';
import MainPage from './MainPage.jsx';
import { store } from './stores/store';
// const InitialRoute = withLayoutContainer(MainPage);

const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
);

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Navigator
                    renderPage={renderPage}
                    initialRoute={{component: withLayoutContainer(MainPage, "MainPage"), key: 'MAIN_PAGE'}}
                    animation='fade'
                />
            </Provider>
        );
    }
}

export default App;
