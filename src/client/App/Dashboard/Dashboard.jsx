import React, { useState } from "react";

import Bulkbar from "./Bulkbar";
import Mentees from "./Mentees";
import Mentors from "./Mentors";
import Navbar from "../Navbar";


export default function ({ username, logout }) {

    // Declare any state vars / functions shared between mentors and mentees here.
    const [cachedMentees, setCachedMentees] = useState({});
    const [cachedMentors, setCachedMentors] = useState({});
    const [selectedMentees, setSelectedMentees] = useState({});
    const [selectedMentors, setSelectedMentors] = useState({});

    const emailSelected = function (message) {
        // TODO: implement this.
    };

    const handleDownload = function (event) {

        if (Object.keys(selectedMentees).length) {
            fetch("/mentees/download", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    emails: Object.keys(selectedMentees),
                }),
            })
            .then(function (response) {
                if (response.ok) {
                    return response.blob();
                }
                else {
                    throw Error(`Request rejected with status ${response.status}`);
                }
            })
            .then(function (blob) {
                // https://stackoverflow.com/questions/4545311/download-a-file-by-jquery-ajax
                const url = window.URL.createObjectURL(blob);
                const anchorTag = document.createElement("a");
                anchorTag.style.display = "none";
                anchorTag.href = url;
                anchorTag.download = 'Mentees.csv';
                document.body.appendChild(anchorTag);
                anchorTag.click();
                window.URL.revokeObjectURL(url);
            });
        }

        if (Object.keys(selectedMentors).length) {
            fetch("/mentors/download", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    emails: Object.keys(selectedMentors),
                }),
            })
            .then(function (response) {
                if (response.ok) {
                    return response.blob();
                }
                else {
                    throw Error(`Request rejected with status ${response.status}`);
                }
            })
            .then(function (blob) {
                const url = window.URL.createObjectURL(blob);
                const anchorTag = document.createElement("a");
                anchorTag.style.display = "none";
                anchorTag.href = url;
                anchorTag.download = 'Mentors.csv';
                document.body.appendChild(anchorTag);
                anchorTag.click();
                window.URL.revokeObjectURL(url);
            });
        }
    };

    const handleDelete = function () {
        fetch("/delete", {
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
                const newMentees = {};
                for (let email in cachedMentees) {
                    if (!(email in selectedMentees)) {
                        newMentees[email] = cachedMentees[email];
                    }
                }
                const newMentors = {};
                for (let email in cachedMentors) {
                    if (!(email in selectedMentors)) {
                        newMentors[email] = cachedMentors[email];
                    }
                }
                setCachedMentees(newMentees);
                setCachedMentors(newMentors);
            }
        });
    };

    const hideBulkbar = (
        !Object.keys(selectedMentees).length &&
        !Object.keys(selectedMentors).length
    );
    return (
        <div>
            <Navbar username={username} logout={logout} />
            <Bulkbar
                hidden={hideBulkbar}
                emailSelected={emailSelected}
                handleDownload={handleDownload}
                handleDelete={handleDelete}
            />
            <div className="row">
                <div className="column">
                    <Mentees
                        cachedMentees={cachedMentees}
                        setCachedMentees={setCachedMentees}
                        selectedMentees={selectedMentees}
                        setSelectedMentees={setSelectedMentees}
                    />
                </div>
                <div className="column">
                    <Mentors
                        cachedMentors={cachedMentors}
                        setCachedMentors={setCachedMentors}
                        selectedMentors={selectedMentors}
                        setSelectedMentors={setSelectedMentors}
                    />
                </div>
            </div>
        </div>
    );
};
