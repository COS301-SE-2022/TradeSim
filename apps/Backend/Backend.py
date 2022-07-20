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
    data = etfNew.createETF()
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
    name = data['Data'][0]
    password = data['Data'][1]


    mydb = mysql.connector.connect(
        host="sql11.freemysqlhosting.net",
        user="sql11507637",
        password=getpass()
    )

    cursor = mydb.cursor()

    cursor.execute("SELECT UserID FROM sql11507637.accounts WHERE Username = "+'"'+ name +'"'+ "  AND Password = "+'"'+ str(password) +'"'+ ";")\

    response = cursor.fetchall();
    print (response)
    if response == []:
        #no user found
        print("login not found")
        res = '{ "status":"failure", "error":"Username or Password incorrect"}'
        res = jsonify(res)
        mydb.close()
        return res
    else:
        id = response[0][0]
        print("user " + str(id) + " logged in")
        res = '{ "status":"success", "id":"' + str(id) + '"}'
        res = jsonify(res)
        mydb.close()
        return res



@app.route("/register", methods=["POST"])
def register():

    print("recieved request for registration");
    data = request.get_json()
    username = data['Data'][0]
    email = data['Data'][1]
    password = data['Data'][2]

    mydb = mysql.connector.connect(
        host="sql11.freemysqlhosting.net",
        user="sql11507637",
        password=getpass()
    )

    print("connected to db");

    cursor = mydb.cursor()

    cursor.execute("SELECT count(*) FROM sql11507637.accounts WHERE Email = "+'"'+email+'"'+";")
    response = cursor.fetchall()

    if response[0] != (0,):
        print("Email taken")
        res = '{ "status":"failure", "error":"email taken"}'
        res = jsonify(res)
        mydb.close()
        return res
        #handle error
    else:
        cursor.execute("SELECT count(*) FROM sql11507637.accounts WHERE Username = "+'"'+username+'"'+";")
        response = cursor.fetchall()
        if response[0] != (0,):
            print("username taken")
            res = '{ "status":"failure", "error":"username taken"}'
            res = jsonify(res)
            mydb.close()
            return res
            # handle error
        else:
            cursor.execute("SELECT Max(UserID) FROM sql11507637.accounts;")
            response = cursor.fetchall()
            # print (response[0])
            if(response[0] == (None,)):
                newid = 0
            else:
                # print(response[0][0])
                newid = response[0][0] + 1

            # det = str(newid) + ',"' + email + '","' + username + '","' + str(password) + '"'
            # det = "INSERT INTO sql11507637.accounts( UserID, Email, Username, Password) VALUES ("+det+");"
            # print(det)

            sql = "INSERT INTO sql11507637.accounts( UserID, Email, Username, Password) VALUES (%s, %s, %s, %s)"
            val = (newid, email, username, password)
            cursor.execute(sql, val)
            mydb.commit()

            print("account added")

            res = '{ "status":"success", "error":"successfully signed up"}'
            res = jsonify(res)
            mydb.close()
            return res

if __name__ == "__main__":
        app.run("localhost", 6969)
