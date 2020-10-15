import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {compose} from "redux";
import {setProfileThunk} from "../../store/ProfileReducer";


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
	connect(mapStateToProps, {setProfileThunk})
)(ProfileContainer);