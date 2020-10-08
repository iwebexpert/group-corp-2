import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNewProfile } from '../../redux/actions/proifleAcrions';
import url from '../../img/userLogo.png';

const Profile = ({ profile }) => {
  const [author, setAuthor] = useState('');
  const [age, setAge] = useState('');

  const dispatch = useDispatch();

  const submitProfile = () => {
    if (age === '' && author === '') {
      alert('Вы оставили пустые формы');
      return;
    }
    if (/^[0-9]+$/.test(age) == true) {
      dispatch(
        setNewProfile({
          author: author,
          age: age,
        })
      );
      setAuthor('');
      setAge('');
      return;
    } else {
      alert('Введите корректный возраст');
    }
  };

  return (
    <div className="profile">
      <img src={url} alt="Ваше лого" />
      <div>
        <p>Имя</p>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={profile.author}
        />
        <p>Возраст</p>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder={profile.age}
        />
      </div>
      <button onClick={submitProfile}>Сохранить</button>
    </div>
  );
};

export default Profile;
