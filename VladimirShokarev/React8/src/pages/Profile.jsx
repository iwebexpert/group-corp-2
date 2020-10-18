import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { ProfileCardContainer } from "../containers/ProfileCardContainer";

export const Profile = () => {
    return <>
        <HeaderContainer />
        <div className="profile">
            <ProfileCardContainer />
        </div>
    </>
}