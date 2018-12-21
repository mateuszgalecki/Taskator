import React from 'react'
import ReactDOM from 'react-dom'

class GottenRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            sentTo: this.props.sentTo,
            mess: this.props.mess
        }
    }

    static getDerivedStateFromProps(p, s) {
        if (p.mess !== s.mess) {
            return {
                mess: p.mess,
                sentTo: p.sentTo,
                index: p.index
            }
        }
        else {
            return null
        }
    }

    deleteRequest = () => {
        this.props.deleteRequest(this.state.mess, this.props.from);
    }

    acceptRequest = () => {
        this.props.acceptRequest(this.state.mess, this.props.from);
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
                <button onClick={this.acceptRequest} style={buttonStyle}>accept</button>
                <button onClick={this.deleteRequest} style={buttonStyle}>decline</button>
                <p style={fromStyle}>from: {this.props.from}</p>
            </div>
        );
    }
}

export default GottenRequest;