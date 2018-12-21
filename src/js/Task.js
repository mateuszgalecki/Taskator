import React from 'react';
import ReactDOM from 'react-dom';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            mess: this.props.mess,
            priority: this.props.priority
        }
    }

    deleteTask = (task) => {
        this.props.deleteTask(this.state.name);
    }

    static getDerivedStateFromProps(p, s) {
        if (p.name !== s.name) {
            return {
                name: p.name,
                mess: p.mess,
                priority: p.priority
            }
        }
        else {
            return null
        }
    }

    render() {

        const titleStyle = {
            width: '70vw',
            backgroundColor: '#123626',
            color: '#B6E7BE',
            fontSize: '18px',
            float: 'left'
        }
        const messStyle = {
            width: '80vw',
            height: '20vh',
            backgroundColor: '#123626',
            color: '#B6E7BE',
            marginRight: '10px'
        }
        const taskDivStyle = {
            marginBottom: '5vh'
        }
        const deleteButtonStyle = {
            height: '22px'
        }

        return (
            <div style={taskDivStyle}>
                <h1 style={titleStyle}>{this.state.name}</h1>
                <button style={deleteButtonStyle} onClick={this.deleteTask}>DEL</button>
                <h3 style={messStyle}>{this.state.mess}</h3>
                <h3 style={titleStyle}>{this.state.priority}</h3>
            </div>
        );
    }

}


export default Task;