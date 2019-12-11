import React from "react";

export default function ({ id, matchRequest, suicide }) {

    const handleClick = function () {
        // Make the component remove itself.
        suicide(id);
    };

    return (
        <div className="match-request">
            <b>Mentor email: </b>
            <a href={"#" + matchRequest.mentor_email}>
                {matchRequest.mentor_email}
            </a>
            <br/>
            <b>First name: </b>
            <span>{matchRequest.first_name}</span>
            <br/>
            <b>Last name: </b>
            <span>{matchRequest.last_name}</span>
            <br/>
            <b>NetId: </b>
            <span>{matchRequest.net_id}</span>
            <br/>
            <b>Reason: </b>
            <br/>
            <span>{matchRequest.reason}</span>
            <br/><br/>
            <button onClick={handleClick}>Delete</button>
            <br/><br/>
        </div>
    );
};
