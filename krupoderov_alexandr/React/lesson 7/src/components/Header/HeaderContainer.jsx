import React from 'react';
import Header from './Header';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getProfileThunk, setProfileThunk} from '../../store/ProfileReducer';


class HeaderContainer extends React.Component {
	componentDidMount() {
		this.props.getProfileThunk();
	}

	render() {
		return <Header {...this.props}/>;
	}
}

const mapStateToProps = (state) => {
	return {
		author: state.profile.author,
		photoUrl: state.profile.photoUrl
	};
};

export default compose(
	connect(mapStateToProps, {getProfileThunk})
)(HeaderContainer);