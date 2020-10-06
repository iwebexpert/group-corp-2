import React from 'react'
import {connect} from "react-redux"
import {Profile} from "../components/Profile/Profile"

export const ProfileContainer = ({data}) => {

    return <Profile data={data}/>
}

function mapStateToProps(state){
    return {
        data: state.profile.profiles[0]
    }
}

export default connect(mapStateToProps, null)(ProfileContainer)
