import React, { useState } from "react";


export default function ({ mentor }) {

    const [collapsed, setCollapsed] = useState(true);
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        net_id: "",
        reason: "",
    });
    const [waiting, setWaiting] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const handleClick = function () {
        setCollapsed(!collapsed);
    };

    const handleFirstName = function (event) {
        setForm({...form, first_name: event.target.value});
    };

    const handleLastName = function (event) {
        setForm({...form, last_name: event.target.value});
    };

    const handleNetId = function (event) {
        setForm({...form, net_id: event.target.value});
    };

    const handleReason = function (event) {
        setForm({...form, reason: event.target.value});
    };

    const handleSubmit = function (event) {
        event.preventDefault();

        // Check that all the form contents are filled.
        for (let k in form) {
            if (!form[k]) {
                return;
            }
        }
        const mreq = {
            ...form,
            mentor_first_name: mentor.first_name,
            mentor_last_name: mentor.last_name,
        };
        fetch("/matches/new", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(mreq),
        })
        .then(function (response) {
            if (response.ok) {
                setSuccessful(true);
            }
        });
    };

    const successfulStr = (
        <span>
            Request sent! We appreciate if you don't spam us-- this creates real work
            for the students involved in managing the Mentorship Network.
        </span>
    );
    return (
        <div className="mentor-card">
            <div onClick={handleClick} className="mentor-info">
                <h2>{mentor.first_name} {mentor.last_name}</h2>
                <b>{mentor.job_title} at {mentor["company/organization"]}</b>
                <ul>
                    <li>Industry: {mentor.industry}</li>
                    <li>Degree: {mentor.degree}</li>
                    <li>Hobbies: {mentor.hobbies}</li>
                    <li>Potential mentees: {mentor.mentee_qualities}</li>
                </ul>
            </div>
            {collapsed ? "" :
                <div className="mentor-card-form">
                    <h4>Send a match request:</h4>
                    <form onSubmit={handleSubmit}>
                        <label>Your name:</label>
                        <input
                            type="text"
                            onChange={handleFirstName}
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            onChange={handleLastName}
                            placeholder="Last name"
                        />
                        <br/>
                        <label>Your NetId:</label>
                        <input type="text" onChange={handleNetId} placeholder="abc123" />
                        <br/>
                        <label>
                            Tell us why you would like to work with
                            {` ${mentor.first_name} `} as your mentor:
                        </label>
                        <br/>
                        <textarea onChange={handleReason}></textarea>
                        <br/>
                        {successful ? successfulStr :
                            <input
                                type="submit"
                                disabled={waiting}
                                value={waiting ? "Sending..." : "Send request"}
                            />
                        }
                        <br/><br/>
                    </form>
                </div>
            }
        </div>
    );
};
