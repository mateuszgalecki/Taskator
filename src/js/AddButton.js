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

class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }
    checkData = () => {
        console.log(this.props.workspace);
    }
    go = this.props.fn
    render() {
        return (
            <button className='addButtonMob' onClick={this.go}><p>+</p></button>
        );
    }
}

export default AddButton