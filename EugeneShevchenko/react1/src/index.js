import './scss/index.scss'
import React from 'react'
import ReactDom from 'react-dom'

const element = React.createElement('h1', {className: 'react-app', id: 'app'}, 'hello from React!')

ReactDom.render(element, document.getElementById('app'))