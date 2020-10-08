import React from "react";
import { HeaderContainer } from "../containers/HeaderContainer";
import { ProfileCardContainer } from "../containers/ProfileCardContainer";

export class Profile extends React.Component {
    render() {
        return (
            <>
                <HeaderContainer />
                <div className="profile">
                    <ProfileCardContainer />
                </div>
            </>
        )
    }
}