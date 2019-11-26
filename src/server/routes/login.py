import os

from flask import abort, jsonify

from db import users
from server import app
from server.utils import check_json_request


@app.route("/login", methods=["POST"])
def login():
    credentials = check_json_request({"username": str, "password": str})
    username = credentials["username"]
    password = credentials["password"]

    if not users.verify_user(username, password):
        abort(401, "Invalid login. Please try again.")

    # TODO: consider whether to implement "remember me".
    token, expires_at = users.set_session(username)

    response = jsonify()
    response.set_cookie("loggedIn", value="true", expires=expires_at)
    response.set_cookie(
        "loginToken", value=token, expires=expires_at, secure=True, httponly=True
    )
    return response
