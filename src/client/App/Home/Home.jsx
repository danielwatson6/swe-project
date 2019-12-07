import React, { useState } from "react";

import Mentees from "./Mentees";
import Mentors from "./Mentors";
import Navbar from "./Navbar";


export default function ({ username, logout }) {

    // Declare any state vars / functions shared between mentors and mentees here.
    const [selectedMentees, setSelectedMentees] = useState({});
    const [selectedMentors, setSelectedMentors] = useState({});

    const handleDownload = function (event) {
        // TODO: implement this.
    }

    const handleEmail = function (event) {
        // TODO: implement this.
    };

    const handleDelete = function (event) {
        // TODO: implement this.
    };

    return (
        <div>
            <Navbar username={username} logout={logout} />
            <div className="row">
                <div className="column">
                    <Mentees
                        selectedMentees={selectedMentees}
                        setSelectedMentees={setSelectedMentees}
                        handleDownload={handleDownload}
                        handleEmail={handleEmail}
                        handleDelete={handleDelete}
                    />
                </div>
                <div className="column">
                    <Mentors
                        selectedMentors={selectedMentors}
                        setSelectedMentors={setSelectedMentors}
                        handleDownload={handleDownload}
                        handleEmail={handleEmail}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};
