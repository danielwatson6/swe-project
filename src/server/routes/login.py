from flask import abort, jsonify, request

from db import Users
from server import app
from server.utils import check_json_request


@check_json_request({"username": str, "password": str})
@app.route("/login", methods=["POST"])
def login():
    credentials = request.get_json()
    username = credentials["username"]
    password = credentials["password"]

    if not Users.verify_user(username, password):
        abort(401, "Invalid login. Please try again.")

    # TODO: implement "remember me".
    token, expires_at = Users.set_session(username)

    # TODO: the client can access the username via the cookie, maybe delete this?
    response = jsonify({"username": username})
    response.set_cookie("username", value=username, expires=expires_at)
    response.set_cookie(
        "login_token", value=token, expires=expires_at, secure=True, httponly=True
    )
    return response
