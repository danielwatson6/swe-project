import React from "react";

import Mentees from "./Mentees";
import Mentors from "./Mentors";
import Navbar from "./Navbar";


export default function ({ username, logout }) {
    return (
        <div>
            <Navbar username={username} logout={logout} />
            <div className="row">
                <div className="column">
                    <Mentees />
                </div>
                <div className="column">
                    <Mentors />
                </div>
            </div>
        </div>
    );
};
