import React from 'react';
import ReactDOM from 'react-dom';

class Welcome extends React.Component {
    render() {
        const style = {
            position: 'absolute',
            bottom: '20vh',
            left: '44vw',
            width: '40vw',
            textAlign: 'center'
        }
        return (
            <p>Welcome <br/> {this.props.login}</p>
        );
    }
}

export default Welcome;