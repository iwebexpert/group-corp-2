import React, { memo, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import url from '../img/sandButtn.png';
import { setMessage } from '../redux/actions/chatActions';

const MessageForm = memo(({ chatID, classN }) => {
  const author = useSelector((state) => state.profile.profileEntries.author);
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSetMessage = () => {
    if (text !== '') {
      dispatch(
        setMessage({
          chatID: +chatID,
          id: nanoid(),
          author: author,
          text: text,
          user: 'human',
        })
      );
      setText('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.which === 13) {
      handleSetMessage();
    }
  };

  return (
    <div className={classN} onKeyDown={handleKeyDown}>
      <input
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите сообщение"
      />
      <img src={url} alt="Отправить" onClick={handleSetMessage} />
    </div>
  );
});

export default MessageForm;
