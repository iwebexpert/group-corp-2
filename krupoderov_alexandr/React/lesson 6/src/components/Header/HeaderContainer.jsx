import React from 'react';
import Header from './Header';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {setAuthor, setPhotoUrl} from '../../store/ProfileReducer';


const HeaderContainer = (props) => {
	return <Header {...props}/>;
};

const mapStateToProps = (state) => {
	return {
		author: state.profile.author,
		photoUrl: state.profile.photoUrl
	};
};

export default compose(
	connect(mapStateToProps)
)(HeaderContainer);