import React from 'react';
import Header from './Header';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {setAuthor, setPhotoUrl} from '../../store/UserReducer';


const HeaderContainer = (props) => {
	return <Header {...props}/>;
};

const mapStateToProps = (state) => {
	return {
		author: state.user.author,
		photoUrl: state.user.photoUrl
	};
};

export default compose(
	connect(mapStateToProps, {setAuthor, setPhotoUrl})
)(HeaderContainer);