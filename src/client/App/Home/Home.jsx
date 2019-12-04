import React, { useState } from "react";

import Navbar from "./Navbar";


export default function ({ username, logout }) {

    return (
        <div>
            <Navbar username={username} logout={logout} />
        </div>
    );
};
