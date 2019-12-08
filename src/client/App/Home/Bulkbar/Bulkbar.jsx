import React, { useState } from "react";

export default function ({ emailSelected, handleDownload, handleDelete, hidden }) {

    const handleEmail = function (e) {

    };

    return (
        <div className={"bulkbar" + (hidden ? " bulkbar-hidden" : "")}>
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleEmail}>Email</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};
