import React from "react";

export default function ({ email, mentor, selected, handleSelect }) {
    return (
        <tr id={email}>
            <td>
                <input type="checkbox" onChange={handleSelect} checked={selected} />
            </td>
            <td>{mentor.name}</td>
            <td>{mentor.industry}</td>
            <td>{email}</td>
            <td><a href={`#${mentor.mentees.toString()}`}>{mentor.mentees.toString()}</a></td>
            <td>{mentor.job_title}</td>
            <td>{mentor.program_status}</td>
            <td>{mentor.nationality}</td>
        </tr>
    );
};
