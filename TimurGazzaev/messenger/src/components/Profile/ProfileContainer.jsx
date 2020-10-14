import React, {useEffect} from 'react'
import {connect} from "react-redux"
import {Profile} from "./Profile"
import {profilesLoadAction} from "../../actions/profile";

export const ProfileContainer = ({data, profilesLoadAction, isLoading}) => {

    useEffect(() => {
        profilesLoadAction()
    }, [])

    return <Profile data={data} isLoading={isLoading}/>
}

function mapStateToProps(state){
    return {
        data: state.profile.profiles[0],
        isLoading: state.profile.loading
    }
}

export default connect(mapStateToProps, {profilesLoadAction})(ProfileContainer)
