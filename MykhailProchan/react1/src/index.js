import React from 'react'
import ReactDOM from 'react-dom'

const Comp = () => {
  const str = 'Hello World!'

  return <h1>{str}</h1>
}

ReactDOM.render(<Comp />, document.getElementById('root'))