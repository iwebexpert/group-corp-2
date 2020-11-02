import React from 'react';

export const Profile = ({name, email, age, isError, isLoading}) => {
    if(isError){
        return (<div>Error...</div>);
    }

    if(isLoading){
        return (<div>Loading...</div>);
    }

    return (<div>
        <ul>
    <li>Имя: {name}</li>
    <li>Возраст: {age}</li>
    <li>E-mail: {email}</li>
        </ul>
    </div>);
}