import React, { useState } from 'react';
import './CreateMessage.scss';

const CreateMessage = ({ pushMessage }) => {
  const [message, setMessage] = useState('');

  const onHandleChange = (event) => {
    setMessage(event.target.value);
  };

  const onHandleClick = () => {
    if (message !== '') pushMessage(message);
    setMessage('');
  };

  const onHandleKeyDown = (event) => {
    if (event.key === 'Enter') onHandleClick();
  };

  return (
    <div className="CreateMessage">
      <div className="form-group d-flex justify-content-between mb-0 m-1">
        <input onKeyDown={onHandleKeyDown} className="form-control mr-1" type="text" name="text" placeholder="Write your message here.." value={message} onChange={onHandleChange} />
        <button type="submit"  className="btn btn-primary btn-md px-5" onClick={onHandleClick}>Send</button>
      </div>
    </div>
  );
};

export default CreateMessage;