import React, { useState, useEffect } from "react";

import Toolbar from "../Toolbar";


export default function () {

    const [mentees, setMentees] = useState({});
    const [cachedMentees, setCachedMentees] = useState({});
    const [selectedMentees, setSelectedMentees] = useState([]);

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

        // const dummyData = {
        //     "dw1949@nyu.edu": {
        //         name: "Daniel Watson",
        //         net_id: "dw1949",
        //         mentor: "nh48@nyu.edu",
        //         major: "Computer Science",
        //         graduation_date: "May 2020",
        //         nationality: "USA",
        //     },
        //     "ggl245@nyu.edu": {
        //         name: "Gabriel Garcia Leyva",
        //         net_id: "ggl245",
        //         mentor: "yz2@nyu.edu",
        //         major: "Computer Science",
        //         graduation_date: "May 2020",
        //         nationality: "Cuba",
        //     },
        // };
        // setMentees(dummyData);
        // setCachedMentees(dummyData);

    }, []);

    const table = (
        <table>
            <thead>
                <tr>
                    <th>Actions</th>
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
                    const m = mentees[email];
                    return (
                        <tr key={email} id={email}>
                            <td></td>
                            <td>{m.name}</td>
                            <td>{m.net_id}</td>
                            <td>{email}</td>
                            <td>{m.mentor}</td>
                            <td>{m.major}</td>
                            <td>{m.graduation_date}</td>
                            <td>{m.nationality}</td>
                        </tr>
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
            {Object.keys(cachedMentees).length > 0 ? table : "Loading..."}
        </div>
    );
};
