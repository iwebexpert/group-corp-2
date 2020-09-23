import React from "react";
import ReactDom from "react-dom";

const messegesData = [];

const Message = (props) => {
  return <div>{props.text}</div>;
};

const MessagesList = (props) => {
  return props.items.map((item, index) => <Message text={item} key={index} />);
};

const Button = ({ children }) => {
  const handleClick = (event) => {
    messegesData.push("Нормально");
    ReactDom.render(
      <>
        <MessagesList items={messegesData} />
        <Button>Добавить!</Button>
      </>,
      document.getElementById("root")
    );
  };
  return <button onClick={handleClick}>{children}</button>;
};

ReactDom.render(
  <>
    <Button>Добавить!</Button>
  </>,
  document.getElementById("root")
);
