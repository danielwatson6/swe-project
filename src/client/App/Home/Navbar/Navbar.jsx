import React, { useState } from "react";


export default function ({ username, logout }) {

    const handleClick = function () {
        fetch("/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(function (response) {
            if (response.ok) {
                logout();
            }
            // TODO: we can technically logout client-side by setting the `username`
            // cookie to some rubbish, but this won't destroy the server-side session.
            // Let's decide what's the best way to handle this.
        });
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src="client/static/nyuad-logo.png" alt=""/>
                <h1>Mentorship Network</h1>
            </div>
            <span>
                {username}
                <button onClick={handleClick}>Log out</button>
            </span>
        </div>
    );
};
