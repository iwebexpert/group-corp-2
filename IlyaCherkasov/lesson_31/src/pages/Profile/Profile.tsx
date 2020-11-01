import React from 'react';
import url from '../../img/userLogo.png';

import { ProfilePageType } from '../../types'

const Profile: React.FC<ProfilePageType> = (props) => {
  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.setAuthor) {
      props.setAuthor(e.target.value);
    }
  }
  const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.setAge) {
      props.setAge(e.target.value);
    }
  }

  if (props.isLoading) {
    return (
      <div className="profile">
        <div className="profile">
          <div>
            <p className="ProfileLoading">LOADING...</p>
            <p className="ProfileLoadingP">PLEASE STAND BY</p>
          </div>
        </div>
      </div>
    )
  }
  if (props.isError) {
    return (
      <div className="profile">
        <div className="profile">
          <div>
            <p className="ProfileError">LOADING FAILURE</p>
            <button onClick={props.handlerProfileRepeat}>PLEASE REPEAT</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="profile">
      <img src={url} alt="Ваше лого" />
      <div>
        <p>Имя</p>
        {props.profile
          ? <input
            type="text"
            value={props.author}
            onChange={handleChangeAuthor}
            placeholder={props.profile.author}
          />
          : <p>Не удалось прочесть имя</p>}

        <p>Возраст</p>
        {props.profile
          ? <input
            type="text"
            value={props.age}
            onChange={handleChangeAge}
            placeholder={props.profile.age}
          />
          : <p>Не удалось прочесть возраст</p>}

      </div>
      <button onClick={props.submitProfile}>Сохранить</button>
    </div>
  );
};

export default Profile;
