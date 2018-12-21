import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom'
import firebase, {db} from './Firebase';

class AddTaskMob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tName: '',
            mess: '',
            priority: '',
            workspace: this.props.workspace,
            user: this.props.login,
            userToSendTo: ''
        }
    }

    update = () => {
        let n = this.state.tName;
        let m = this.state.mess;
        let p = this.state.priority;
        this.props.updateTasks(n, m, p);
        this.clear();
        this.goUp();
    }

    sendRequest = () => {
        let n = this.state.tName;
        let m = this.state.mess;
        let p = this.state.priority;
        this.clear();
        this.goUp();
        this.props.sendRequest(n, m, p, this.state.userToSendTo);
    }

    clear = () => {
        this.setState({
            tName: '',
            mess: '',
            priority: 0,
            userToSendTo: ''
        })
    }

    goUp = () => {
        this.props.goUp()
    }

    stateAdd = (e) => {
        let sample = e.target.value;
        this.setState({
            tName: sample
        })
    }

    state2Add = (e) => {
        let sample = e.target.value;
        this.setState({
            mess: sample
        })
    }

    state3Add = (e) => {
        let sample = e.target.value;
        this.setState({
            priority: sample
        })
    }

    state4Add = (e) => {
        let sample = e.target.value;
        this.setState({
            userToSendTo: sample
        })
    }

    render() {

        const containerStyle = {
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative'
        }
        const buttonStyle = {
            marginTop: '2vh',
            marginLeft: '8vw',
            marginBottom: '14vh',
            color: '#06130A',
            backgroundColor: '#349D57',
            border: 'none',
            outline: 'none'
        }
        const buttonRequestStyle = {
            marginBottom: '1vh',
            marginLeft: '8vw',
            color: '#06130A',
            backgroundColor: '#349D57',
            border: 'none',
            outline: 'none'
        }
        const goUpButtonStyle = {
            backgroundColor: '#349D57',
            color: '#0E2A16',
            outline: 'none',
            position: 'relative',
            top: '-8vh',
            left: '80vw',
            zIndex: '1001'
        }

        return (
            <div style={containerStyle}>
                <button style={goUpButtonStyle} onClick={this.goUp}>back</button>
                <input placeholder='task name' value={this.state.tName} className='inputName' type='text'
                       onChange={this.stateAdd}/>
                <input placeholder='task priority' value={this.state.priority} className='inputName' type='number'
                       onChange={this.state3Add}/>
                <textarea placeholder='task description' value={this.state.mess} className='messArea'
                          onChange={this.state2Add}/>
                <button style={buttonStyle} onClick={this.update}>ADD TO DATABASE</button>
                <button style={buttonRequestStyle} onClick={this.sendRequest}>SEND AS A REQUEST</button>
                <input placeholder='user name' value={this.state.userToSendTo} className='userInput'
                       onChange={this.state4Add}/>
            </div>
        );
    }
}

export default AddTaskMob;