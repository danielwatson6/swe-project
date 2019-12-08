import React, { useState, useEffect } from "react";

import Mentee from "./Mentee";
import Toolbar from "../Toolbar";


export default function (props) {

    // Active mentees in the view.
    const [mentees, setMentees] = useState({});

    useEffect(function () {
        fetch("/mentees", {
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
        .then(function (mentees) {
            props.setCachedMentees(mentees);
        });
    }, []);

    // Update the rendered mentors if the cached ones change.
    useEffect(function () {
        setMentees(props.cachedMentees);
    }, [props.cachedMentees]);

    // If any mentees are removed from the view, make sure to deselect them.
    useEffect(function () {
        const newSelectedMentees = {};
        for (let email in mentees) {
            if (email in props.selectedMentees) {
                newSelectedMentees[email] = null;
            }
        }
        props.setSelectedMentees(newSelectedMentees);
    }, [mentees]);

    const handleSelectAll = function (event) {
        if (event.target.checked) {
            const newSelectedMentees = {};
            for (let email in mentees) {
                newSelectedMentees[email] = 0;
            }
            props.setSelectedMentees(newSelectedMentees);
        }
        else {
            props.setSelectedMentees({});
        }
    };

    const handleSelectOne = function (email) {
        return function (event) {
            if (event.target.checked) {
                const newSelectedMentees = {};
                for (let email in props.selectedMentees) {
                    newSelectedMentees[email] = 0;
                }
                newSelectedMentees[email] = 0;
                props.setSelectedMentees(newSelectedMentees);
            }
            else {
                const newSelectedMentees = {};
                for (let email in props.selectedMentees) {
                    newSelectedMentees[email] = 0;
                }
                delete newSelectedMentees[email];
                props.setSelectedMentees(newSelectedMentees);
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
                    <th>NetId</th>
                    <th>Email</th>
                    <th>Mentor</th>
                    <th>Major</th>
                    <th>Graduation Date</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(mentees).map(function (email) {
                    return (
                        <Mentee
                            key={email}
                            email={email}
                            mentee={mentees[email]}
                            selected={email in props.selectedMentees}
                            handleSelect={handleSelectOne(email)}
                        />
                    );
                })}
            </tbody>
        </table>
    );
    return (
        <div className="mentees">
            <Toolbar
                title="Mentees"
                cached={props.cachedMentees}
                setter={setMentees}
                cachedSetter={props.setCachedMentees}
            />
            {Object.keys(props.selectedMentees).length > 0 ? selectedActions : ""}
            {Object.keys(props.cachedMentees).length > 0 ? table : "Loading..."}
        </div>
    );
};
