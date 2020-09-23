import React from "react";
import ReactDOM from "react-dom";

const { Component } = React;
const { render } = ReactDOM;

const List = (props) => (
  <ul>
    {props.messages.map((message, index) => (
      <li key={index}>
        {message}
        <br />
      </li>
    ))}
  </ul>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: ["Привет", "Как дела?"],
    };
  }

  addMsg() {
    this.state.messages.push("Нормально");
    this.setState((state) => ({
      ...state,
      messages: state.messages,
    }));
    this.render();
    console.log(this.state.messages);
  }

  render() {
    return (
      <div>
        <List messages={this.state.messages} />
        <button onClick={this.addMsg.bind(this)}>Ответить "Нормально"</button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
