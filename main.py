from flask import Flask, redirect, render_template, url_for, request
from flask_bootstrap import Bootstrap

app =  Flask(__name__, template_folder='apps/client/templates', static_folder='apps/client/static')
Bootstrap(app)

@app.route("/")
def index():
    return redirect(url_for('login'))

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    return render_template("signup.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/add")
def add():
    return render_template("addETF.html")

@app.route("/setRule")
def setRule():
    return render_template("set.html")

if __name__ == "__main__":
    app.run(debug=True)
