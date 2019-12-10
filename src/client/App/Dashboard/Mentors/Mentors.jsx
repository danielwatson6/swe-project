import React, { useState, useEffect } from "react";

import Mentor from "./Mentor";
import Toolbar from "../Toolbar";


export default function (props) {

    // Active mentors in the view.
    const [mentors, setMentors] = useState({});

    useEffect(function () {
        fetch("/mentors", {
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                throw Error(`Request rejected with status ${response.status}`);
            }
        })
        .then(function (mentors) {
            props.setCachedMentors(mentors);
        });
    }, []);

    // Update the rendered mentors if the cached ones change.
    useEffect(function () {
        setMentors(props.cachedMentors);
    }, [props.cachedMentors]);

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

    const table = (
        <table>
            <thead>
                <tr>
                    <th>
                        Select all
                        <input type="checkbox" onChange={handleSelectAll} />
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company/Organization</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Mentee</th>
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
                cached={props.cachedMentors}
                setter={setMentors}
                cachedSetter={props.setCachedMentors}
            />
            {Object.keys(props.cachedMentors).length > 0 ? table : "Loading..."}
        </div>
    );
};
