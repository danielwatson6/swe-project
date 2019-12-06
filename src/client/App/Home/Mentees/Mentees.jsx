import React, { useState, useEffect } from "react";

import Mentee from "./Mentee";
import Toolbar from "../Toolbar";


export default function () {

    // Active mentees in the view.
    const [mentees, setMentees] = useState({});
    // Saved mentees that may appear in and out of the view, e.g. as search changes.
    const [cachedMentees, setCachedMentees] = useState({});
    // Only keep email keys in this one, use null values.
    const [selectedMentees, setSelectedMentees] = useState({});

    useEffect(function () {
        fetch("/mentees", {
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (mentees) {
            setMentees(mentees);
            setCachedMentees(mentees);
        });
    }, []);

    // If any mentees are removed from the view, make sure to deselect them.
    useEffect(function () {
        const newSelectedMentees = {};
        for (let email in mentees) {
            if (email in selectedMentees) {
                newSelectedMentees[email] = null;
            }
        }
        setSelectedMentees(newSelectedMentees);
    }, [mentees]);

    const handleSelectAll = function (event) {
        if (event.target.checked) {
            const newSelectedMentees = {};
            for (let email in mentees) {
                newSelectedMentees[email] = 0;
            }
            setSelectedMentees(newSelectedMentees);
        }
        else {
            setSelectedMentees({});
        }
    };

    const handleSelectOne = function (email) {
        return function (event) {
            if (event.target.checked) {
                const newSelectedMentees = {};
                for (let email in selectedMentees) {
                    newSelectedMentees[email] = 0;
                }
                newSelectedMentees[email] = 0;
                setSelectedMentees(newSelectedMentees);
            }
            else {
                const newSelectedMentees = {};
                for (let email in selectedMentees) {
                    newSelectedMentees[email] = 0;
                }
                delete newSelectedMentees[email];
                setSelectedMentees(newSelectedMentees);
            }
        };
    };

    const selectedActions = (
        <div className="selected-actions">
            {/* TODO: request a CSV download, only for the mentees. */}
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
                            selected={email in selectedMentees}
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
                cached={cachedMentees}
                setter={setMentees}
                cachedSetter={setCachedMentees}
            />
            {Object.keys(selectedMentees).length > 0 ? selectedActions : ""}
            {Object.keys(cachedMentees).length > 0 ? table : "Loading..."}
        </div>
    );
};
