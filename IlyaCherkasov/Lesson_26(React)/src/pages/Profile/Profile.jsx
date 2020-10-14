import React from 'react';
import url from '../../img/userLogo.png';

const Profile = (props) => {
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
        <input
          type="text"
          value={props.author}
          onChange={(e) => props.setAuthor(e.target.value)}
          placeholder={props.profile.author}
        />
        <p>Возраст</p>
        <input
          type="text"
          value={props.age}
          onChange={(e) => props.setAge(e.target.value)}
          placeholder={props.profile.age}
        />
      </div>
      <button onClick={props.submitProfile}>Сохранить</button>
    </div>
  );
};

export default Profile;
