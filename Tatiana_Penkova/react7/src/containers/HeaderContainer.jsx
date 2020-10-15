import React from "react";
import { connect } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { Header } from "../components/Header";
import { push } from "connected-react-router";
import { initStore } from "../js/store";

class HeaderContainerClass extends React.Component {
    componentDidMount() {
        if (this.props.profile.name === undefined) {
            this.props.profileInfoAction();
        }
    };

    handleClick(e) {
        const { store } = initStore();
        store.dispatch(push("/about"));
    };

    render() {
        const { profile, isError, isLoading } = this.props;
        return <Header isLoading={isLoading} isError={isError} profile={profile} handleClick={this.handleClick} />
    };
}

function mapStateToProps(state, ownProps) {
    const profile = state.profile.entries;
    return {
        profile,
        isLoading: state.profile.loading,
        isError: state.profile.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileInfoAction: () => dispatch(profileInfoAction()),
    };
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);