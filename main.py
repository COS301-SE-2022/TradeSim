from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app =  Flask(__name__, template_folder='apps/client/templates')
Bootstrap(app)

@app.route("/")
def index():
    return render_template("login.html")

@app.route("/login")
def login():
    return render_template("login.html")

if __name__ == "__main__":
    app.run(debug=True)

