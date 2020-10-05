import React from "react";
import { ProfileCard } from "../components/ProfileCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export class Profile extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className="profile">
                    <ProfileCard />
                </div>
                <Footer />
            </>

        )
    }
}