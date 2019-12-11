import React, { useState } from "react";


export default function ({ username, logout }) {

    const handleClick = function () {
        if (username) {
            fetch("/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            })
            .then(function (response) {
                if (response.ok) {
                    logout();
                }
            });
        }
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src="client/static/nyuad-logo.png" alt=""/>
                <h1>Manage.Mentorship</h1>
                <h2>a modern web-app for a busy board</h2>
            </div>
            <span>
                {username ? username : ""}
                <a href={username ? "javascript:void(0)" : "/login"}>
                    <button onClick={handleClick}>
                        {username ? "Log out" : "Log in"}
                    </button>
                </a>
            </span>
        </div>
    );
};
