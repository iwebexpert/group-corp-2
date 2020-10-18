import React from 'react';
import { Link } from 'react-router-dom';

export default class Profile extends React.Component {
   render() {
       return (
           <div>
               <h1>Профиль</h1>
               <div>Гик</div>
               <div>geek@geekbrains.ru</div>
               <div>+7 999 999 99 99</div>
               <Link to='/'> ← Назад</Link>
           </div>
       )
   }
}