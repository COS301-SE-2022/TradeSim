from flask import Flask, request, jsonify
from flask_cors import CORS
import ETF
from dbpass import *

amount = 0
app = Flask(__name__)
CORS(app)

#Need to start the backend properly and get the whole thing working
#When the Backend first recieves the Json Format it needs to add the rules and the amount into the database
#The Json format needs to also have an coloumn that show if its a creation of a new etf or generating a new etf

@app.route("/createName", methods=["POST"])
def createNameAndAmount():
    data = request.get_json()
    userID = data['Data'][0]
    etfName = data['Data'][1]
    amount = data['Data'][2]
    #This is function that is first called that has the name of the new ETF and the amount
    #data is the array of the JSon of all the data recieved


    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/createRules", methods=["POST"])
def createRules():
    data = request.get_json()
    UserID = data['UserID']
    etfID = data['ETFid']
    listOfRules = data['Rules']

    etfNew = ETF.ETF(UserID,etfID,listOfRules,None,1000000)
    etfNew.createETF()
    #This is a new ETF Oject

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/generateETF", methods=["POST"])
def generateETF():
    data = request.get_json()
    UserID = data['UserID']
    ETFid = data['ETFid']
    startDate = data['StartDate']
    PeriodInDays = data['DatePeriodInDays']

    #This is function that is used when a user wants to see the etf so the JSON that is passed needs to contain both the etf name and the date
    #data is the array of the JSon of all the data recieved

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data['Data'][0]
    password = data['Data'][1]
    id  = 0000;
    # print(email)
    # print(password)

    mydb = mysql.connector.connect(
        host="sql11.freemysqlhosting.net",
        user="sql11498457",
        password=getpass()
    )

    cursor = mydb.cursor()

    cursor.execute("SELECT * FROM aipicapstone.accounts WHERE Email = email AND Password = password")
    response = cursor.fetchall();
    if len(response == 0):
        #no user found
        print("error")
    else:
        id = response[0][0]

    #for Regan
    #id to return is stored as id
    #This is function that is used to login so the parameters need to be the username and password
    #data is the array of the JSon of all the data recieved

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value

    mydb.close()
    return dataJsonify

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data['Data'][0]
    email = data['Data'][1]
    encodedPassword = data['Data'][2]
    newid = 0000

    mydb = mysql.connector.connect(
        host="sql11.freemysqlhosting.net",
        user="sql11498457",
        password=getpass()
    )

    cursor = mydb.cursor()

    cursor.execute("SELECT count(*) FROM aipicapstone.accounts WHERE Email = email;")
    response = cursor.fetchall();
    if response[0] > 0:
        print("error")
        #handle error
    else:
        cursor.execute("SELECT count(*) FROM aipicapstone.accounts WHERE Username = username;")
        response = cursor.fetchall();
        if response[0] > 0:
            print("error")
            # handle error
        else:
            cursor.execute("SELECT Max(UserID) FROM aipicapstone.accounts;")
            response = cursor.fetchall();
            newid = response[0];
            cursor.execute("INSERT INTO aipicapstone.accounts( UserID, Email, Username, Password) VALUES ( newid, email, username, encodedPassword);")



    #This is function that is used to register parameters are to be set by frontend
    #data is the array of the JSon of all the data recieved

    #for regan
    # newid = UserID of jusr registered account

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    mydb.close()
    return dataJsonify

if __name__ == "__main__":
        app.run("localhost", 6969)
