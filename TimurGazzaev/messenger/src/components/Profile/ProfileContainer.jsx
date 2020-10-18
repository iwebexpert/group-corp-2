import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Profile} from "./Profile"
import {profilesLoadAction} from '../../actions/profile'

export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.profile.profiles[0])
    const isLoading = useSelector((state) => state.profile.loading)

    useEffect(() => {
        dispatch(profilesLoadAction())
    }, [])

    return <Profile data={data} isLoading={isLoading}/>
}
