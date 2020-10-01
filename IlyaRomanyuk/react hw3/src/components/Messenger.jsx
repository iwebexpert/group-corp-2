import React from 'react';
import { Navbar } from './Navbar';
import { Layout } from './Layout';

const Messenger = () => {
    return (
        <>
            <div className="container">
                <div className="messenger">
                    <div className="messenger__navbar  navbar">
                        <Navbar />
                    </div>

                    <div className="content">
                        <Layout />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Messenger;