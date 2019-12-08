import React, { useState } from "react";

import Mentees from "./Mentees";
import Mentors from "./Mentors";
import Navbar from "./Navbar";


export default function ({ username, logout }) {

    // Declare any state vars / functions shared between mentors and mentees here.
    const [cachedMentees, setCachedMentees] = useState({});
    const [cachedMentors, setCachedMentors] = useState({});
    const [selectedMentees, setSelectedMentees] = useState({});
    const [selectedMentors, setSelectedMentors] = useState({});

    const handleDownload = function (event) {
        // TODO: implement this.
    }

    const handleEmail = function (event) {
        // TODO: implement this.
    };

    const handleDelete = function () {
        return fetch("/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                mentees: Object.keys(selectedMentees),
                mentors: Object.keys(selectedMentors),
            }),
        })
        .then(function (response) {
            if (response.ok) {
                // setCachedMentees();
                // setCachedMentors();
            }
        });
    };

    return (
        <div>
            <Navbar username={username} logout={logout} />
            <div className="row">
                <div className="column">
                    <Mentees
                        cachedMentees={cachedMentees}
                        setCachedMentees={setCachedMentees}
                        selectedMentees={selectedMentees}
                        setSelectedMentees={setSelectedMentees}
                        handleDownload={handleDownload}
                        handleEmail={handleEmail}
                        handleDelete={handleDelete}
                    />
                </div>
                <div className="column">
                    <Mentors
                        cachedMentors={cachedMentors}
                        setCachedMentors={setCachedMentors}
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
