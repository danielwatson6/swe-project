from flask import abort, jsonify, request

from db import MatchRequests, Mentors
from server import app
from server.utils import check_json_request


@app.route("/matches/new", methods=["POST"])
@check_json_request(
    {
        "first_name": str,
        "last_name": str,
        "net_id": str,
        "mentor_first_name": str,
        "mentor_last_name": str,
        "reason": str,
    }
)
def new_match_request():
    mreq = request.get_json()
    mentor_first_name = mreq["mentor_first_name"]
    mentor_last_name = mreq["mentor_last_name"]
    del mreq["mentor_first_name"]
    del mreq["mentor_last_name"]

    mentor_data = Mentors.get_by_names(mentor_first_name, mentor_last_name)
    if mentor_data is None:
        abort(404)

    mentor_email, _ = mentor_data
    mreq["mentor_email"] = mentor_email
    MatchRequests.add(mreq)

    return jsonify()
