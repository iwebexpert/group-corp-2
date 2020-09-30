import React, { Component } from "react";
// import MessageField from "./MessageField/index";
// import MessagesList from "./MessagesList";
import Layout from "./Layout";
class App extends Component {
  // state = {
  //   messages: [],
  // };
  // componentDidUpdate = () => {
  //   if (this.state.messages.length % 2 === 1) {
  //     setTimeout(
  //       () =>
  //         this.setState({
  //           messages: [
  //             ...this.state.messages,
  //             {
  //               text: `${
  //                 this.state.messages[this.state.messages.length - 1].author
  //               }, может попьем кофе `,
  //               author: "Бот",
  //             },
  //           ],
  //         }),
  //       1000
  //     );
  //   }
  // };
  // handleSend = (message) => {
  //   this.setState({ messages: this.state.messages.concat(message) });
  //   console.log(this.state.messages);
  // };
  render() {
    return (
      <>
        <Layout />
        {/* <MessagesList messages={this.state.messages} />
        <MessageField onSend={this.handleSend} /> */}
      </>
    );
  }
}
export default App;
