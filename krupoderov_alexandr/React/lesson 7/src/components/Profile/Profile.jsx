import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {withStyles} from '@material-ui/core';
import importClasses from './Profile.module.css';

const styles = {
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

};

class Profile extends React.Component {
	state = {
		author: this.props.author,
		imgUrl: this.props.photoUrl,
		isAuthorError: false,
		isImgError: false,
		isSaved: false
	};

	changeTextHandler = (event) => {
		let {name, value} = event.target;
		if (name === 'author'){
			this.setState({
				isAuthorError: false,
				isSaved: false,
				author: value
			});
		}else if (name === 'url'){
			this.setState({
				isImgError: false,
				isSaved: false,
				imgUrl: value
			});
		}
	};

	saveSettings = () => {
		let {author, imgUrl} = this.state;
		let {setAuthor, setPhotoUrl} = this.props;
		let reg = /^(ftp|http|https):\/\/[^ "]+\.(jpg|jif|jpeg|png|JPG|PNG|JPEG|GIF)$/;
		if (!author) {
			this.setState({isAuthorError: true});
		}
		else {
			this.setState({isAuthorError: false});
			this.setState({isImgError: false});
			this.setState({isSaved: true});
			if (!imgUrl.match(reg)){
				this.setState({imgUrl: ''});
			}
			this.props.setProfileThunk(author, imgUrl);
		}
	};

	render() {
		let {classes} = this.props
		return (
			<div className={classes.container}>
				<h1 className={classes.header}>Редактирование профиля</h1>
				<div className={classes.root}>
					<TextField className={importClasses.input} name='author' label='Введите автора' value={this.state.author} onChange={this.changeTextHandler}/>
					<TextField className={importClasses.input} name='url' label='Введите URL аватарки' value={this.state.imgUrl} onChange={this.changeTextHandler}/>
					<Button className={classes.btn} variant='contained' color='secondary' onClick={this.saveSettings}>Save</Button>
					{this.state.isAuthorError && <Alert className={classes.alert} severity='warning'>Пожалуйста, укажите автора!</Alert>}
					{this.state.isSaved && <Alert className={classes.alert} severity='success'>Сохранено!</Alert>}
				</div>

			</div>
		);
	};
}

export default withStyles(styles)(Profile);


