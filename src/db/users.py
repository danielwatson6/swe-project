import base64
import hashlib
import os
import time

import bcrypt
from flask import abort

from db import Collection


def _bcrypt_safe(password):
    """Turnt the password to a bcrypt-safe password.

    Bcrypt truncates passwords to 72 characters or at the start of a null byte. To
    prevent issues from this, first we hash the password with sha384 (safe to length
    extension attacks) to solve the length issue and then b64encode it to avoid null
    bytes thay may occur during hashing.

    """
    digest = hashlib.sha384(password.encode()).digest()
    return base64.b64encode(digest)


class Users(Collection):
    collection = "users"

    @classmethod
    def add(cls, username, password):
        """Register a new user."""
        user = {
            "password": bcrypt.hashpw(_bcrypt_safe(password), bcrypt.gensalt()),
            "created_at": time.time(),
            "session": None,
        }
        super().add(username, user)

    @classmethod
    def set_session(cls, username, expires_in=1200.0):
        """Set a new login session for the user."""

        # The token should come from a cryptographically-safe source of randomness.
        raw_token = os.urandom(16)

        # We store a hashed token-- storing plain tokens = storing raw passwords!
        hashed_token = base64.b64encode(hashlib.sha384(raw_token).digest())
        expires_at = time.time() + expires_in
        session = {"token": hashed_token, "expires_at": expires_at}
        cls.collection().document(username).update({"session": session})

        return base64.b64encode(raw_token), expires_at

    @classmethod
    def verify_user(cls, username, password):
        """Check that the provided credentials match those in the database."""
        user = cls.get(username)
        if user is None:
            return False
        return bcrypt.checkpw(_bcrypt_safe(password), user["password"])

    @classmethod
    def verify_session(cls, username, token):
        """Check that the login token is valid for the given user."""
        user = cls.get(username)
        if user is None:
            return False
        if user["session"]["expires_at"] < time.time():
            return False

        raw_token = base64.b64decode(token)
        hashed_token = base64.b64encode(hashlib.sha384(raw_token).digest())
        return user["session"]["token"] == hashed_token
