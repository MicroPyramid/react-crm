import React, { Component } from 'react';

export default class Home extends Component {
    componentDidMount () {
        if (localStorage.getItem('Token')) {
            this.props.history.push('/dashboard');
        }
    }

    render () {
        return (
            <div className="wrapper">
                <div
                    id="mainbody"
                    className="main_container"
                    style={{ paddingTop: '65px' }}
                >
                    <div className="container">
                        <h1 className="text-center m-3">bottlecrm</h1>
                        <p className="text-center">Coming soon ...</p>
                    </div>
                </div>
            </div>
        );
    }
}

