import React, { Component } from 'react';
import { ProgressCircular, Page } from 'react-onsenui';

// import MainPage from './MainPage';
const routes = {
    "MainPage": "https://demo0339219.mockable.io/screens/signup",
    "FormPage0": "https://demo0339219.mockable.io/screens/signup/0",
    "FormPage1": "https://demo0339219.mockable.io/screens/signup/1",
    "FormPage2": "https://demo0339219.mockable.io/screens/signup/2",
    "WelcomePage0": "https://demo0339219.mockable.io/screens/welcome/0",
}

const withLayoutContainer = (WrappedComponent, routeName) => {
    class LayoutContainerHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                error: null,
            };
        }
        componentDidMount() {
            let url = routes[routeName]
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
    return LayoutContainerHOC;
}

export default withLayoutContainer;