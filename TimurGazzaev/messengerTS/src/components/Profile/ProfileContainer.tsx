import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Profile} from "./Profile"
import {profilesLoadAction} from '../../actions/profile'
import {AppState} from "../../reducers"

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: AppState) => state.profile.profiles[0])
    const isLoading = useSelector((state: AppState) => state.profile.loading)

    useEffect(() => {
        dispatch(profilesLoadAction())
    }, [])

    return <Profile data={data} isLoading={isLoading}/>
}
