from flask import jsonify

from db import MatchRequests
from server import app
from server.utils import check_json_request, check_session


@app.route("/matches", methods=["GET"])
@check_session
@check_json_request()
def match_requests():
    mreqs = {}
    for email, mreq in MatchRequests.stream():
        mreqs[email] = mreq
    return jsonify(mreqs)
