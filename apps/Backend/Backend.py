from flask import Flask, request, jsonify
from flask_cors import CORS
import ETF
import info
from dbpass import *
import mysql.connector
import json
import AiFactor
import datetime
from datetime import datetime,timedelta

amount = 0
app = Flask(__name__)
CORS(app)


# Need to start the backend properly and get the whole thing working
# When the Backend first recieves the Json Format it needs to add the rules and the amount into the database
# The Json format needs to also have an coloumn that show if its a creation of a new etf or generating a new etf

@app.route("/createName", methods=["POST"])
def createNameAndAmount():
    data = request.get_json()
    userID = data['Data'][0]
    etfName = data['Data'][1]
    amount = data['Data'][2]
    # This is function that is first called that has the name of the new ETF and the amount
    # data is the array of the JSon of all the data recieved

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    # print(userID)
    # print(etfName)
    # print(amount)

    cursor.execute("SELECT * FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(
        userID) + '"' + "  AND ETFName = " + '"' + etfName + '"' + ";")
    response = cursor.fetchall();
    # print(response)

    if response == []:
        #             etfname not taken for user
        cursor.execute("SELECT Max(ETFID) FROM aipicapstone.ETFS;")
        response = cursor.fetchall();
        print(response)
        if (response == [(None,)]):
            etfID = 0
        else:
            # print(response[0][0])
            etfID = response[0][0] + 1

        rules = ""
        cdate = "2022-01-01"
        sql = "INSERT INTO aipicapstone.ETFS( ETFID, USERID, ETFName, Amount, Rules, CreationDate) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (etfID, userID, etfName, amount, rules, cdate)
        cursor.execute(sql, val)
        mydb.commit()

        print("etf added")

        res = '{ "status":"success", "error":"successfully added ETF"}'
        res = jsonify(res)
        mydb.close()
        return res
    else:
        res = '{ "status":"failure", "error":"Name already used by user"}'
        res = jsonify(res)
        mydb.close()
        return res


@app.route("/createRules", methods=["POST"])
def createRules():
    data = request.get_json()
    UserID = data['UserID']
    etfID = data['ETFid']
    listOfRules = data['Rules']
    date = data['date']
    amount = data['amount']

    etfNew = ETF.ETF(UserID, etfID, listOfRules, date, int(amount))
    #etfNew.createETF()
    #data = etfNew.getPriceOverTime()
    try:
        etfNew.createETF()
        data = etfNew.getPriceOverTime()
    except:
        data = {"Error" : "Please try changing your rules as there is a contradiction causing problems"}

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/tickerInfo", methods=["POST"])
def tickerInfo():
    data = request.get_json()
    ticker = data['ticker']

    data = info.stockInformation(ticker)
    # etfNew = ETF.ETF(UserID,etfID,listOfRules,date,int(amount))
    # if etfNew.createETF() == None:
    #     data = {"error" : "response 200"}
    #
    # else:
    #     data = etfNew.getPriceOverTime()

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/news", methods=["POST"])
def news():
    data = request.get_json()
    category = data['category']
    # Different categories = general, forex, crypto, merger

    data = info.newsInformation(category)

    dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value
    return dataJsonify

@app.route("/AI", methods=["POST"])
def AI():

    data = request.get_json()
    date = data['date']
    seedValue = data['seedValue']

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute("SELECT * FROM aipicapstone.AIEtfs WHERE year = " + date + "  ;")
    response = cursor.fetchall();

    if response != []:

        Rules = str(response[0][1])

        data = aigraph(Rules,date)
        dataJsonify = jsonify(data)
        mydb.close()
        return dataJsonify

    else:  # no ETFS found

        Aiting = AiFactor.AiFactor(date, seedValue)
        data = Aiting.generateRandomETF()
        rules = data["Rules"]

        dataJsonify = jsonify(data)  # This is used to return the Json back to the front end. so return the final value

        sql = "INSERT INTO aipicapstone.AIEtfs( year, Rules) VALUES (%s, %s)"
        val = (date, str(rules))
        cursor = mydb.cursor(buffered=True)
        cursor.execute(sql, val)
        mydb.commit()

        mydb.close()
        return dataJsonify



@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    name = data['Data'][0]
    password = data['Data'][1]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor()

    cursor.execute(
        "SELECT UserID FROM aipicapstone.accounts WHERE Username = " + '"' + name + '"' + "  AND Password = " + '"' + str(
            password) + '"' + ";")
    response = cursor.fetchall();
    print(response)
    if response == []:
        # no user found
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
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    print("connected to db");

    cursor = mydb.cursor()

    cursor.execute("SELECT count(*) FROM aipicapstone.accounts WHERE Email = " + '"' + email + '"' + ";")
    response = cursor.fetchall()

    if response[0] != (0,):
        print("Email taken")
        res = '{ "status":"failure", "error":"email taken"}'
        res = jsonify(res)
        mydb.close()
        return res
        # handle error
    else:
        cursor.execute("SELECT count(*) FROM aipicapstone.accounts WHERE Username = " + '"' + username + '"' + ";")
        response = cursor.fetchall()
        if response[0] != (0,):
            print("username taken")
            res = '{ "status":"failure", "error":"username taken"}'
            res = jsonify(res)
            mydb.close()
            return res
            # handle error
        else:
            cursor.execute("SELECT Max(UserID) FROM aipicapstone.accounts;")
            response = cursor.fetchall()
            # print (response[0])
            if (response[0] == (None,)):
                newid = 0
            else:
                # print(response[0][0])
                newid = response[0][0] + 1

            # det = str(newid) + ',"' + email + '","' + username + '","' + str(password) + '"'
            # det = "INSERT INTO aipicapstone.accounts( UserID, Email, Username, Password) VALUES ("+det+");"
            # print(det)

            sql = "INSERT INTO aipicapstone.accounts( UserID, Email, Username, Password) VALUES (%s, %s, %s, %s)"
            val = (newid, email, username, password)
            cursor.execute(sql, val)
            mydb.commit()

            print("account added")

            res = '{ "status":"success", "error":"successfully signed up"}'
            res = jsonify(res)
            mydb.close()
            return res

@app.route("/getETFS", methods=["POST"])
def getETFS():
    data = request.get_json()
    userID = data['Data'][0]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute("SELECT * FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(userID) + '"' + "  ;")
    response = cursor.fetchall();
    # print(response)

    if response != []:
        #   etfs exist
        cursor.execute("SELECT count(*) FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(userID) + '"' + "  ;")
        count = cursor.fetchall();
        count = count[0][0]
        # print(count)
        etfs = '['
        for i in range(count):
            etfs += '{"ETFID":"' + str(response[i][0]) + '",'
            etfs += '"UserID":"' + str(response[i][1]) + '",'
            etfs += '"ETFName":"' + str(response[i][2]) + '",'
            etfs += '"Amount":"' + str(response[i][3]) + '",'
            etfs += '"Rules":[' + str(response[i][4]) + '],'
            etfs += '"Date":"' + str(response[i][5]) + '"}'
            if i != count - 1:
                etfs += ','

        etfs += "]"

        print(etfs)

        res = '{ "status":"success", "Data":' + etfs + '}'
        res = jsonify(res)
        mydb.close()
        return res
    else:  # no ETFS found
        res = '{ "status":"failure", "error":"No ETFS made"}'
        res = jsonify(res)
        mydb.close()
        return res

@app.route("/setRule", methods=["POST"])
def setRule():
    data = request.get_json()

    etfID = data['Data'][0]
    param1 = data['Data'][1]
    param2 = data['Data'][2]
    param3 = data['Data'][3]
    rulecode = data['Data'][4]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute("SELECT Rules FROM aipicapstone.ETFS WHERE ETFID = " + '"' + str(etfID) + '"' + "  ;")
    response = cursor.fetchall();
    # print(response[0][0])
    rulesdb = ''

    if param2 == "":

        if response[0][0] == '':  # no rules exist

            rulesdb = "[\"" + str(rulecode) + "\",[\"" + param1 + "\"]]"

        else:  # rules exist

            rulesdb = response[0][0] + ",[\"" + str(rulecode) + "\",[\"" + param1 + "\"]]"

    elif param3 == "":
        if response[0][0] == '':  # no rules exist

            rulesdb = "[\"" + str(rulecode) + "\",[\"" + param1 + "\",\"" + param2 + "\"]]"

        else:  # rules exist

            rulesdb = response[0][0] + ",[\"" + str(rulecode) + "\",[\"" + param1 + "\",\"" + param2 + "\"]]"

    else:
        if response[0][0] == '':  # no rules exist

            rulesdb = "[\"" + str(rulecode) + "\",[\"" + param1 + "\",\"" + param2 + "\",\"" + param3 + "\"]]"

        else:  # rules exist

            rulesdb = response[0][0] + ",[\"" + str(
                rulecode) + "\",[\"" + param1 + "\",\"" + param2 + "\",\"" + param3 + "\"]]"

    print(rulesdb)

    cursor.execute("UPDATE aipicapstone.ETFS SET Rules = " + "'" + rulesdb + "'" + " WHERE(ETFID = " + '"' + str(
        etfID) + '"' + ");")
    mydb.commit()
    # response = cursor.fetchall();

    res = '{ "status":"succesful"}'
    res = jsonify(res)
    mydb.close()
    return res

@app.route("/changename", methods=["POST"])
def changename():
    data = request.get_json()

    etfID = data['Data'][0]
    newName = data['Data'][1]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute("UPDATE aipicapstone.ETFS SET ETFName = " + "'" + newName + "'" + " WHERE(ETFID = " + '"' + str(
        etfID) + '"' + ");")
    mydb.commit()
    # response = cursor.fetchall();

    res = '{ "status":"succesful"}'
    res = jsonify(res)
    mydb.close()
    return res

@app.route("/changeamount", methods=["POST"])
def changeamount():
    data = request.get_json()

    etfID = data['Data'][0]
    newAmount = data['Data'][1]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute(
        "UPDATE aipicapstone.ETFS SET Amount = " + "'" + str(newAmount) + "'" + " WHERE(ETFID = " + '"' + str(
            etfID) + '"' + ");")
    mydb.commit()
    # response = cursor.fetchall();

    res = '{ "status":"succesful"}'
    res = jsonify(res)
    mydb.close()
    return res

@app.route("/clearrules", methods=["POST"])
def clearrules():
    data = request.get_json()

    etfID = data['Data'][0]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute(
        "UPDATE aipicapstone.ETFS SET Rules = " + "'" + "'" + " WHERE(ETFID = " + '"' + str(etfID) + '"' + ");")
    mydb.commit()
    # response = cursor.fetchall();

    res = '{ "status":"succesful"}'
    res = jsonify(res)
    mydb.close()
    return res

@app.route("/deleteetf", methods=["POST"])
def deleteetf():
    data = request.get_json()

    etfID = data['Data'][0]

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute("DELETE FROM aipicapstone.ETFS WHERE (ETFID = '" + str(etfID) + "');")
    mydb.commit()
    # response = cursor.fetchall();

    res = '{ "status":"succesful"}'
    res = jsonify(res)
    mydb.close()
    return res

@app.route("/export", methods=["POST"])
def export():
    data = request.get_json()
    userID = data['Data'][0]
    ETFname = data['Data'][1]

    print (data['Data'][0] + " " + data['Data'][1])

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    cursor.execute(
        "SELECT * FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(userID) + '"' + " AND ETFName = " + '"' + str(
            ETFname) + '"' + ";")
    response = cursor.fetchall();
    # print(response)

    if response != []:
        #   etfs exist
        cursor.execute("SELECT count(*) FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(userID) + '"' + " AND ETFName = " + '"' + str(ETFname) + '"' + ";")
        count = cursor.fetchall();
        count = count[0][0]
        print(count)
        etfs = '['
        for i in range(count):
            etfs += '{"ETFID":"' + str(response[i][0]) + '",'
            etfs += '"UserID":"' + str(response[i][1]) + '",'
            etfs += '"ETFName":"' + str(response[i][2]) + '",'
            etfs += '"Amount":"' + str(response[i][3]) + '",'
            etfs += '"Rules":[' + str(response[i][4]) + '],'
            etfs += '"Date":"' + str(response[i][5]) + '"}'
            if i != count - 1:
                etfs += ','

        etfs += "]"

        res = '{ "status":"success", "Data":' + etfs + '}'
        res = jsonify(res)
        mydb.close()
        return res
    else:  # no ETFS found
        res = '{ "status":"failure", "error":"ETF not found"}'
        res = jsonify(res)
        mydb.close()
        return res

@app.route("/import", methods=["POST"])
def Import():
    data = request.get_json()
    userID = data['Data'][0]
    etfName = data['Data'][1]
    amountnew = data['Data'][2]
    rules = data['Data'][3]
    rules = json.dumps(rules)
    rules = rules[1:]
    rules = rules[:-1]
    cdate = data['Data'][4]

    # This is function that is first called that has the name of the new ETF and the amount
    # data is the array of the JSon of all the data recieved

    mydb = mysql.connector.connect(
        host="database-1.ctw2tablscgc.us-east-1.rds.amazonaws.com",
        user="aipicapstone",
        password=getpass()
    )

    cursor = mydb.cursor(buffered=True)

    # print(userID)
    # print(etfName)
    # print(amount)

    cursor.execute("SELECT * FROM aipicapstone.ETFS WHERE UserID = " + '"' + str(
        userID) + '"' + "  AND ETFName = " + '"' + etfName + '"' + ";")
    response = cursor.fetchall();
    # print(response)

    if response == []:
        #             etfname not taken for user
        cursor.execute("SELECT Max(ETFID) FROM aipicapstone.ETFS;")
        response = cursor.fetchall();
        print(response)
        if (response == [(None,)]):
            etfID = 0
        else:
            # print(response[0][0])
            etfID = response[0][0] + 1

        sql = "INSERT INTO aipicapstone.ETFS( ETFID, USERID, ETFName, Amount, Rules, CreationDate) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (etfID, userID, etfName, amountnew, rules, cdate)
        cursor.execute(sql, val)
        mydb.commit()

        print("etf added")

        res = '{ "status":"success", "error":" ETF added"}'
        res = jsonify(res)
        mydb.close()
        return res
    else:
        res = '{ "status":"failure", "error":"Name already used by user"}'
        res = jsonify(res)
        mydb.close()
        return res



def aigraph(rules,date):
    etfNew = ETF.ETF("0", "0", rules, date, 1000000)
    etfNew.createETF()
    beginDate = datetime.strptime(date, '%Y-%m-%d')
    endDate = datetime.strftime(beginDate + timedelta(365), '%Y-%m-%d')
    data = etfNew.wowFactor(endDate)
    data['Rules'] = rules
    return data



if __name__ == "__main__":
    app.run("localhost", 6969)
