import React from "react";

export default function ({ email, mentee, selected, handleSelect }) {
    return (
        <tr id={email}>
            <td>
                <input type="checkbox" onChange={handleSelect} checked={selected} />
            </td>
            <td>{mentee.first_name}</td>
            <td>{mentee.last_name}</td>
            <td>{mentee.net_id}</td>
            <td>{email}</td>
            <td><a href={`#${mentee.mentor}`}>{mentee.mentor}</a></td>
            <td>{mentee.major}</td>
            <td>{mentee.graduation_date}</td>
            <td>{mentee.nationality}</td>
        </tr>
    );
};
