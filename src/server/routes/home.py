from flask import render_template

from server import app


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")
