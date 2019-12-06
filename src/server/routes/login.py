from flask import abort, jsonify, request

from db import Users
from server import app
from server.utils import check_json_request


@check_json_request({"username": str, "password": str, "rememberMe": bool})
@app.route("/login", methods=["POST"])
def login():
    credentials = request.get_json()
    username = credentials["username"]
    password = credentials["password"]
    remember_me = credentials["rememberMe"]

    if not Users.verify_user(username, password):
        abort(401, "Invalid login. Please try again.")

    expires_in = 3600.0  # 1 hour.
    if remember_me:
        expires_in = 2592000.0  # 1 month.
    token, expires_at = Users.set_session(username, expires_in=expires_in)

    # TODO: the client can access the username via the cookie, maybe delete this?
    response = jsonify({"username": username})
    response.set_cookie("username", value=username, expires=expires_at)
    response.set_cookie(
        "login_token", value=token, expires=expires_at, secure=True, httponly=True
    )
    return response
