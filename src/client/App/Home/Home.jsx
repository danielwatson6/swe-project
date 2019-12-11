import React, { useState, useEffect } from "react";

import MentorCard from "./MentorCard";
import Navbar from "../Navbar";


export default function () {

    const [mentors, setMentors] = useState({});

    useEffect(function () {
        fetch("/mentors", {
            headers: {"Content-Type": "application/json"},
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (receivedMentors) {
            setMentors(receivedMentors);
        });
    }, []);

    const indices = Object.keys(mentors);
    return (
        <div>
            <Navbar />
            {!indices.length ? "Loading..." : indices.map(function (i) {
                return <MentorCard key={i} mentor={mentors[i]} />;
            })}
        </div>
    );
};
