import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {withStyles} from '@material-ui/core';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '250px',
		minHeight: '250px',
		justifyContent: 'space-between'
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
	}
};

class UserConfig extends React.Component {
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
			console.log(!imgUrl.match(reg));
			if (!imgUrl.match(reg)){
				this.setState({imgUrl: ''});
			}
			setAuthor(this.state.author);
			setPhotoUrl(this.state.imgUrl);
		}
	};

	render() {
		let {classes} = this.props
		return (
			<div className={classes.root}>
				<TextField name='author' label='Введите автора' value={this.state.author} onChange={this.changeTextHandler}/>
				<TextField name='url' label='Введите URL аватарки' value={this.state.imgUrl} onChange={this.changeTextHandler}/>
				<Button className={classes.btn} variant='contained' color='secondary' onClick={this.saveSettings}>Save</Button>
				{this.state.isAuthorError ? <Alert className={classes.alert} severity='warning'>Пожалуйста, укажите автора!</Alert> : <></>}
				{this.state.isSaved ? <Alert className={classes.alert} severity='success'>Сохранено!</Alert> : <></>}
			</div>
		);
	};
}

export default withStyles(styles)(UserConfig);


