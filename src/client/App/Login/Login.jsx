import React, { useState } from "react";
import { Redirect } from "react-router-dom";


export default function ({ login }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState("");

    const handleUsername = function (event) {
        setUsername(event.target.value);
    };

    const handlePassword = function (event) {
        setPassword(event.target.value);
    };

    const handleSubmit = function (event) {
        event.preventDefault();
        setWaiting(true);

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function ({ username }) {
            setWaiting(false);
            login(username);
        })
        .catch(function () {
            setWaiting(false);
            setError("Invalid login. Please try again.")
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Mentorship Network</h1>
            <span className="error">{error}</span>
            <br/>
            <input type="text" placeholder="Username" onChange={handleUsername} />
            <br/>
            <input type="password" placeholder="Password" onChange={handlePassword} />
            <br/>
            <input
                type="submit"
                value={waiting ? "Logging in..." : "Log in"}
                disabled={waiting}
            />
        </form>
    );
};
