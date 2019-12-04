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
        <div>
            <h1>Mentorship Network</h1>
            <span>
                {username}
                <button onClick={handleClick}>Log out</button>
            </span>
        </div>
    );
};
