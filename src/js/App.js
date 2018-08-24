import React from 'react'
import reactLogo from '../images/react-logo.png'

class App extends React.Component {
    render() {
        return (
            <div>
                <img src={reactLogo}/>
                <h1>Hello World!</h1>
                <div className="tesla"/>
            </div>
        );
    }
}

export default App
