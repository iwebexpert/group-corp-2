import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { ProfileCardContainer } from "../containers/ProfileCardContainer";

export const Profile: React.FC<{}> = () => {
    return <>
        <HeaderContainer />
        <div className="profile">
            <ProfileCardContainer />
        </div>
    </>
};