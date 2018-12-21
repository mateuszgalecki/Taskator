import React from 'react'
import ReactDOM from 'react-dom'

class GottenRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            accepted: this.props.accepted
        }
    }

    checkRequest = () => {
        this.props.checkRequest(this.props.name, this.state.accepted);
    }

    render() {
        const reqStyle = {
            height: '4vh',
            fontSize: '1.8vh',
            display: 'flex',
            alignItems: 'center'

        }
        const pStyle = {
            marginLeft: '7px',
            marginRight: '11px'
        }
        const buttonStyle = {
            marginTop: '4px',
            marginLeft: '0.8vw',
            color: '#06130A',
            backgroundColor: '#349D57',
            border: '1px solid #216331',
            borderRadius: '30%',
            outline: 'none'
        }
        const fromStyle = {
            fontSize: '12px',
            marginLeft: '2vw'
        }
        return (
            <div style={reqStyle}>
                <p style={pStyle}>{this.props.name}</p>
                <button onClick={this.checkRequest} style={buttonStyle}>check</button>
                <p style={fromStyle}>to: {this.props.to}</p>
            </div>
        );
    }
}

export default GottenRequest;