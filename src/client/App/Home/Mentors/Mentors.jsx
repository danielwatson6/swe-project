import React, { useState, useEffect } from "react";

import Mentor from "./Mentor";
import Toolbar from "../Toolbar";


export default function () {

    // Active mentors in the view.
    const [mentors, setMentors] = useState({});
    // Saved mentors that may appear in and out of the view, e.g. as search changes.
    const [cachedMentors, setCachedMentors] = useState({});
    // Only keep email keys in this one, use null values.
    const [selectedMentors, setSelectedMentors] = useState({});

    useEffect(function () {
        fetch("/mentors", {
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        }) // catch 404 or 500 error
        .then(response => {
              if(response.ok) {
                return response;
              } else {
                throw Error(`Request rejected with status ${response.status}`);
              }
            })
        .catch(console.error)
        .then(function (response) {
            return response.json();
        })
        .then(function (mentors) {
            setMentors(mentors);
            setCachedMentors(mentors);
        });
    }, []);

    // If any mentors are removed from the view, make sure to deselect them.
    useEffect(function () {
        const newSelectedMentors = {};
        for (let email in mentors) {
            if (email in selectedMentors) {
                newSelectedMentors[email] = null;
            }
        }
        setSelectedMentors(newSelectedMentors);
    }, [mentors]);

    const handleSelectAll = function (event) {
        if (event.target.checked) {
            const newSelectedMentors = {};
            for (let email in mentors) {
                newSelectedMentors[email] = 0;
            }
            setSelectedMentors(newSelectedMentors);
        }
        else {
            setSelectedMentors({});
        }
    };

    const handleSelectOne = function (email) {
        return function (event) {
            if (event.target.checked) {
                const newSelectedMentors = {};
                for (let email in selectedMentors) {
                    newSelectedMentors[email] = 0;
                }
                newSelectedMentors[email] = 0;
                setSelectedMentors(newSelectedMentors);
            }
            else {
                const newSelectedMentors = {};
                for (let email in selectedMentors) {
                    newSelectedMentors[email] = 0;
                }
                delete newSelectedMentors[email];
                setSelectedMentors(newSelectedMentors);
            }
        };
    };

    const selectedActions = (
        <div className="selected-actions">
            {/* TODO: request a CSV download, only for the mentors. */}
            <button>Download</button>
            {/* TODO: connect these actions to those in the mentors column. */}
            <button>Email</button>
            <button>Delete</button>
        </div>
    );
    const table = (
        <table>
            <thead>
                <tr>
                    <th>
                        Select all
                        <input type="checkbox" onChange={handleSelectAll} />
                    </th>
                    <th>Name</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Mentees</th>
                    <th>Job Title</th>
                    <th>Program Status</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(mentors).map(function (email) {
                    return (
                        <Mentor
                            key={email}
                            email={email}
                            mentor={mentors[email]}
                            selected={email in selectedMentors}
                            handleSelect={handleSelectOne(email)}
                        />
                    );
                })}
            </tbody>
        </table>
    );
    return (
        <div className="mentors">
            <Toolbar
                title="Mentors"
                cached={cachedMentors}
                setter={setMentors}
                cachedSetter={setCachedMentors}
            />
            {Object.keys(selectedMentors).length > 0 ? selectedActions : ""}
            {Object.keys(cachedMentors).length > 0 ? table : "Loading..."}
        </div>
    );
};
