import React, { useState, useEffect } from "react";

import MatchRequest from "./MatchRequest";


export default function () {

    const [matchRequests, setMatchRequests] = useState({});
    const [collapsed, setCollapsed] = useState({});

    useEffect(function () {
        fetch("/matches", {
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (mreqs) {
            setMatchRequests(mreqs);
        });
    }, []);

    const handleClick = function () {
        setCollapsed(!collapsed);
    };

    const deleteMatchRequest = function (id) {
        fetch("/matches/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({ id }),
        })
        .then(function (response) {
            if (response.ok) {
                const newMatchRequests = {};
                for (let id_ in matchRequests) {
                    if (id_ !== id) {
                        newMatchRequests[id_] = matchRequests[id_];
                    }
                }
                setMatchRequests(newMatchRequests);
            }
        });
    };

    return (
        <div className="match-requests">
            <h2 onClick={handleClick}>Match requests</h2>
            {collapsed ? "" :
                <div className="match-requests-contents">
                    {Object.keys(matchRequests).map(function (id) {
                        return <MatchRequest
                            key={id}
                            id={id}
                            matchRequest={matchRequests[id]}
                            suicide={deleteMatchRequest}
                        />;
                    })}
                </div>
            }
        </div>
    );
};
