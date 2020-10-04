import React from "react";
import "./Message.scss";

const Message = ({ data, styles, backCol }) => {
  return (
    <div className={styles}>
      <div className={backCol} key={data.id}>
        <span>{data.text}</span>
        <span className='addresser'>{data.author}</span>
      </div>
    </div>
  );
};
export default Message;
