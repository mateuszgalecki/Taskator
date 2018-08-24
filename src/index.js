import React from 'react'
import ReactDOM from 'react-dom'
import './scss/main.scss'
import App from './js/app'


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<App/>, document.getElementById('app'))
});

