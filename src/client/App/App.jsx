import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";


export default function () {
    const [username, setUsername] = useState("");

    useEffect(function () {
        const match = /username=([^;]+)/.exec(document.cookie);
        if (match) {
            setUsername(match[1]);
        }
    }, []);

    const logout = function () {
        setUsername("");
    };

    if (username) {
        return <Dashboard username={username} logout={logout} />;
    }
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact>
                    <Home />
                </Route>
                <Route path={"/login"}>
                    <Login login={setUsername} />
                </Route>
            </Switch>
        </Router>
    );
};
