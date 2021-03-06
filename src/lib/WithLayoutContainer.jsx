import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { ProgressCircular, Page } from 'react-onsenui';
import SignupPage from './../pages/signup/SignupPage';

// import SignupPage from './SignupPage';
const routes = {
    "SignupPage": "https://demo0339219.mockable.io/screens/signup",
    "FormPage0": "https://demo0339219.mockable.io/screens/signup/0",
    "FormPage1": "https://demo0339219.mockable.io/screens/signup/1",
    "FormPage2": "https://demo0339219.mockable.io/screens/signup/2",
    "WelcomePage0": "https://demo0339219.mockable.io/screens/welcome/0",
}

const withLayoutContainer = (WrappedComponent, routeName, isPrivateRoute=false) => {
    @inject('store')
    @observer
    class LayoutContainerHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                error: null,
            };
        }
        componentDidMount() {
            const redirectToSignup = isPrivateRoute && !this.props.store.isLoggedIn;
            let url = routes[routeName]
            if (redirectToSignup) {
                WrappedComponent = SignupPage;
                url = routes["SignupPage"];
            }
            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({ data: data }))
                .catch(error => this.setState({ error: true }))
        }
        render() {
            return (
                <>
                    {this.state.data && !this.state.error &&
                        <WrappedComponent layout={this.state.data} {...this.props} />
                    }
                    {this.state.error &&
                        // TODO: Show error message
                        <Page>
                            <p>500: Server error, try later</p>
                        </Page>
                    }
                    {this.state.data === null && this.state.error === null &&
                        <Page>
                            <div className="full-screen-loader" style={{zIndex: 10}}>
                                <ProgressCircular indeterminate style={{width: 50, height: 50}}/>
                            </div>
                        </Page>
                    }
                </>
            );
        }
    }
    const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
    LayoutContainerHOC.displayName = `withLayoutContainer(${wrappedComponentName})`;
    return LayoutContainerHOC;
}

export default withLayoutContainer;