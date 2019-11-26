import base64
import hashlib
import os
import time

import bcrypt
from flask import abort

from db import db


def _bcrypt_safe(password):
    """Turnt the password to a bcrypt-safe password.

    Bcrypt truncates passwords to 72 characters or at the start of a null byte. To
    prevent issues from this, first we hash the password with sha384 (safe to length
    extension attacks) to solve the length issue and then b64encode it to avoid null
    bytes thay may occur during hashing.

    """
    digest = hashlib.sha384(password.encode()).digest()
    return base64.b64encode(digest)


def get(username):
    """Get a user by its username."""
    user = db.collection("users").document(username).get().to_dict()
    if user is None:
        abort(404, "User does not exist.")
    return user


def add(username, password):
    """Register a new user."""
    user = {
        "password": bcrypt.hashpw(_bcrypt_safe(password), bcrypt.gensalt()),
        "created_at": time.time(),
        "session": None,
    }
    db.collection("users").document(username).set(user)


def set_session(username, expires_in=1200.0):
    """Set a new login session for the user."""

    # The token should come from a cryptographically-safe source of randomness.
    raw_token = os.urandom(16)

    # We store a hashed token-- storing plain tokens is basically storing raw passwords!
    hashed_token = base64.b64encode(hashlib.sha384(raw_token).digest())
    expires_at = time.time() + expires_in
    session = {"token": hashed_token, "expires_at": expires_at}
    db.collection("users").document(username).update({"session": session})

    return base64.b64encode(raw_token), expires_at


def verify_user(username, password):
    """Check that the provided credentials match those in the database."""
    user = get(username)
    return bcrypt.checkpw(_bcrypt_safe(password), user["password"])


def verify_session(username, token):
    """Check that the login token is valid for the given user."""
    user = get(username)
    if user["session"]["expires_at"] < time.time():
        return False

    raw_token = base64.b64decode(token)
    hashed_token = base64.b64encode(hashlib.sha384(raw_token).digest())
    return user["session"]["token"] == hashed_token
