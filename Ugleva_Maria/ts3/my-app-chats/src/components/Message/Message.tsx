import React from "react";
import "./Message.scss";
import {MessageType} from '../../type';

type Message = {
  data: MessageType;
  styles: any;
  backCol: any;
}
const Message: React.FC<Message> = ({ data, styles, backCol }) => {
  return (
    <div key={data.id} className={styles}>
      <div className={backCol}>
        <span>{data.text}</span>
        <span className='addresser'>{data.author}</span>
      </div>
    </div>
  );
};
export default Message;
