import React, {Component} from 'react';
import './profile.scss';

import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import InstagramIcon from '@material-ui/icons/Instagram';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {Switch, Route, Link} from 'react-router-dom';

export class Profile extends Component {
  render() {
    return (
      <div className="profileBlock">
        <div className="mainHeaderBlock">  
          <div className="profileHeaderFlex">
            <div className="imgBlock"><img src="./src/img/me.jpg" alt="ProfilePhoto"/></div>
            <div className="nickNameBlock">
              <p>Vorobyev Maxim</p>
              <p>@maxrusmos</p>
            </div>
          </div>    
          <hr/>
          <div className="mainInfoBlockFlex">
            <div className="messagesCount">
              <p className="count">1093</p>
              <p>MESSAGES</p>
            </div>
            <div className="following">
              <p className="count">134</p>
              <p>FOLLOWING</p>
            </div>
            <div className="followers">
              <p className="count">78</p>
              <p>FOLLOWERS</p>
            </div>
          </div>
          <hr/>
          <div className="otherProfileInfo">
            <div className="city">
              <p>#city</p>
              <p>MOSCOW</p>
            </div>
            <div className="bd">
              <p>#birthDay</p>
              <p>12.11.1999</p>
            </div>
            <div>
              <p>#socials</p>
              <div className="flexBlockSocials">
                <div className="socials">
                  <FacebookIcon fontSize="large"/>
                  <EmailIcon fontSize="large"/>
                  <InstagramIcon fontSize="large"/>
                </div>
                <Link className="backLink" to="/chats/0"><KeyboardBackspaceIcon fontSize="large" className="back" color="primary"/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}