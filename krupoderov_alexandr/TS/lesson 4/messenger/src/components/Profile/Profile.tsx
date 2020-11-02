import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import importClasses from './Profile.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileThunk } from '../../store/ProfileReducer';
import { AppState } from '../../store/store';

const useStyle = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '250px',
		minHeight: '250px',
		justifyContent: 'space-between',
		backgroundColor: '#2e364a',
		borderRadius: '15px',
		margin: '10% auto 0 auto',
		boxSizing: 'border-box',
		padding: '10px'
	},
	btn: {
		width: '50%',
		alignSelf: 'center',
		backgroundColor: '#44c4b8',
		marginBottom: '30px'
	},
	alert: {
		width: '95%',
		padding: '10px'
	},
	header: {
		margin: 0,
		color: 'white',
		padding: '32px 0 0 16px'
	},

});

export const Profile = () => {
	const [author, photoUrl] = useSelector((state: AppState) => [state.profile.author, state.profile.photoUrl]);
	const [profile, setProfile] = useState({
		author: author,
		imgUrl: photoUrl,
		isAuthorError: false,
		isImgError: false,
		isSaved: false
	});
	const dispatch = useDispatch();

	const changeTextHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let {name, value} = event.target;
		if (name === 'author'){
			setProfile({
				...profile,
				isAuthorError: false,
				isSaved: false,
				author: value
			});
		}else if (name === 'url'){
			setProfile({
				...profile,
				isImgError: false,
				isSaved: false,
				imgUrl: value
			});
		}
	};

	const saveSettings = () => {
		let reg = /^(ftp|http|https):\/\/[^ "]+\.(jpg|jif|jpeg|png|JPG|PNG|JPEG|GIF)$/;
		if (!author) {
			setProfile({...profile, isAuthorError: true});
		}
		else {
			setProfile({
				...profile,
				isImgError: false,
				isAuthorError: false,
				isSaved: true
			});
			if (!photoUrl.match(reg)){
				setProfile({...profile, imgUrl: '', });
			}
			dispatch(setProfileThunk(profile.author, profile.imgUrl));
		}
	};

	const classes = useStyle();
	return (
		<div>
			<h1 className={classes.header}>Редактирование профиля</h1>
			<div className={classes.root}>
				<TextField className={importClasses.input} name='author' label='Введите автора' value={profile.author} onChange={changeTextHandler}/>
				<TextField className={importClasses.input} name='url' label='Введите URL аватарки' value={profile.imgUrl} onChange={changeTextHandler}/>
				<Button className={classes.btn} variant='contained' color='secondary' onClick={saveSettings}>Save</Button>
				{profile.isAuthorError && <Alert className={classes.alert} severity='warning'>Пожалуйста, укажите автора!</Alert>}
				{profile.isSaved && <Alert className={classes.alert} severity='success'>Сохранено!</Alert>}
			</div>
		</div>
	);
};


