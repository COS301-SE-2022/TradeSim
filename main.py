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

@app.route("/register", methods=['POST' , 'GET'])
def register():
    return render_template("signup.html")

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/addETF")
def add():
    return render_template("addETF.html")

@app.route("/compare-date")
def comparedate():
    return render_template("compare-date.html")

@app.route("/addRule")
def edit():
    return render_template("addRule.html")

@app.route("/ticker")
def tick():
    return render_template("ticker.html")


if __name__ == "__main__":
    app.run("ec2-54-87-29-139.compute-1.amazonaws.com", 80)

