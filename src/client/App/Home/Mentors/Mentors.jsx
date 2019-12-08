import React, { useState, useEffect } from "react";

import Mentor from "./Mentor";
import Toolbar from "../Toolbar";


export default function (props) {

    // Active mentors in the view.
    const [mentors, setMentors] = useState({});
    // Saved mentors that may appear in and out of the view, e.g. as search changes.
    const [cachedMentors, setCachedMentors] = useState({});

    useEffect(function () {
        fetch("/mentors", {
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(function (response) {
            if (response.ok) {
                return response;
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
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
            if (email in props.selectedMentors) {
                newSelectedMentors[email] = null;
            }
        }
        props.setSelectedMentors(newSelectedMentors);
    }, [mentors]);

    const handleSelectAll = function (event) {
        if (event.target.checked) {
            const newSelectedMentors = {};
            for (let email in mentors) {
                newSelectedMentors[email] = 0;
            }
            props.setSelectedMentors(newSelectedMentors);
        }
        else {
            props.setSelectedMentors({});
        }
    };

    const handleSelectOne = function (email) {
        return function (event) {
            if (event.target.checked) {
                const newSelectedMentors = {};
                for (let email in props.selectedMentors) {
                    newSelectedMentors[email] = 0;
                }
                newSelectedMentors[email] = 0;
                props.setSelectedMentors(newSelectedMentors);
            }
            else {
                const newSelectedMentors = {};
                for (let email in props.selectedMentors) {
                    newSelectedMentors[email] = 0;
                }
                delete newSelectedMentors[email];
                props.setSelectedMentors(newSelectedMentors);
            }
        };
    };

    const selectedActions = (
        <div className="selected-actions">
            <button onClick={props.handleDownload}>Download</button>
            <button onClick={props.handleEmail}>Email</button>
            <button onClick={props.handleDelete}>Delete</button>
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
                            selected={email in props.selectedMentors}
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
            {Object.keys(props.selectedMentors).length > 0 ? selectedActions : ""}
            {Object.keys(cachedMentors).length > 0 ? table : "Loading..."}
        </div>
    );
};
