from flask import Flask, request, jsonify
from flask_cors import CORS
from dbpass import *

amount = 0
app = Flask(__name__)
CORS(app)

#Need to start the backend properly and get the whole thing working
#When the Backend first recieves the Json Format it needs to add the rules and the amount into the database
#The Json format needs to also have an coloumn that show if its a creation of a new etf or generating a new etf


def convertCodeToEtf(code, parameters):
        #In here we will have many switch statements when we get the code and its parameters in order to know what to do with it
    if code == "000":
        ticker = parameters[0]
        #Reject by specific companies
        #The ticker is our only parameter
    elif code == "001":
        sectorID = parameters[0]
        # Reject by specific Sector
        # The sectorID is our only parameter
    elif code == "002":
        industryID = parameters[0]
        #Reject by IndustryID
        #The industryID is our only parameter
    elif code == "003":
        country = parameters[0]
        #Reject by country
        #The country is our only parameter
    elif code == "010":
        amountOfCompanies = parameters[0]
        #Minimum amount of companies to invest into
        #The amount is our only parameter
    elif code == "011":
        minMarketCap = parameters[0]
        maxMarketCap = parameters[1]
        #Market cap Min and Max
        #The min and max market Cap is our only parameter
    elif code == "012":
        minEarnings = parameters[0]
        maxEarnings = parameters[1]
        #Earnings Min and Max
        # The min and max earning is our only parameter
    elif code == "013":
        minPrice = parameters[0]
        maxPrice = parameters[1]
        #Price Min and Max
        #The min and max price is our only parameter
    elif code == "101":
        ticker = parameters[0]
        Percentage = parameters[1]
        #companies by name or ticker.
    elif code == "102":
        SectorID = parameters[0]
        Percentage = parameters[1]
        amountOfCompanies = parameters[2]
        #percentage in a specific sector
    elif code == "103":
        industryID = parameters[0]
        Percentage = parameters[1]
        amountOfCompanies = parameters[2]
        #percentage in a specific industry
    elif code == "104":
        percentage = parameters[0]
        amountOfCompanies = parameters[1]
        #companies with the highest market cap
    elif code == "105":
        country = parameters[0]
        percentage = parameters[1]
        amountOfCompanies = parameters[2]
        #companies based in specific countries
    elif code == "106":
        percentage = parameters[0]
        amountOfCompanies = parameters[1]
        #companies with the highest revenue
    elif code == "200":
        balancePeriodInWeeks = parameters[0]
        #balance period and/or balance threshold percentage
    elif code == "201":
        percentageDrop = parameters[0]
        #percentage that a stock can drop before the ETF sells the stock automatically
    elif code == "202":
        reconsiderPeriodInWeeks = parameters[0]
        #time period in which it must reconsider its stocks

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
    #This is function that contains all the new rules when the person submits
    #data is the array of the JSon of all the data recieved

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
