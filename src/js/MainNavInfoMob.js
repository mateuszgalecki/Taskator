import React from 'react';
import ReactDOM from 'react-dom';


class MainNavInfoMob extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const reqStyle = {
            marginLeft: '43px',
            backgroundColor: '#349D57',
            fontSize: '20px',
            outline: 'none'
        }
        const tasksStyle = {
            marginRight: '40px',
            backgroundColor: '#349D57',
            fontSize: '20px',
            outline: 'none'
        }
        const req = '< requests'
        return (
            <div className='mainNavInfoMob'>
                <button onClick={this.props.left} style={reqStyle}>{req}</button>
                <button onClick={this.props.right} style={tasksStyle}>tasks ></button>
            </div>
        )
    }
}

export default MainNavInfoMob;