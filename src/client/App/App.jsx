import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";


export default function () {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(function () {
        if (document.cookie.includes("loggedIn=true")) {
            setLoggedIn(true);
        }
    }, []);

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} />;
    }
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};
