import React, { useState, useEffect } from "react";

import Home from "./Home";
import Login from "./Login";


export default function () {
    const [username, setUsername] = useState("");

    useEffect(function () {
        const match = /username=([^;]+);/.exec(document.cookie);
        if (match) {
            setUsername(match[1]);
        }
    }, []);

    const logout = function () {
        setUsername("");
    };

    if (username) {
        return <Home username={username} logout={logout} />;
    }
    return <Login login={setUsername} />;
};
