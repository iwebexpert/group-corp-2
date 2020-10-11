import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setAuthor, setPhotoUrl} from "../../store/ProfileReducer";
import {compose} from "redux";


const ProfileContainer = (props) => {
	return <Profile {...props}/>
}

const mapStateToProps = (state) => {
	return {
		author: state.profile.author,
		photoUrl:  state.profile.photoUrl
	}
}

export default compose(
	connect(mapStateToProps, {setAuthor, setPhotoUrl})
)(ProfileContainer);