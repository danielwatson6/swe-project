from flask import jsonify, request

from db import MatchRequests
from server import app
from server.utils import check_json_request, check_session


@app.route("/matches/delete", methods=["DELETE"])
@check_session
@check_json_request({"id": str})
def delete_match_request():
    id_ = request.get_json()["id"]
    MatchRequests.delete(id_)
    return jsonify()
