import requests
import ETF
import unitTesting

def testAutomated():
    CreateRules = {
        "UserID": 1,
        "ETFid": 11,
        "Rules": [
            ["104", ["10", "5"]],
            ["106", ["40", "10"]],
            ["102", ["101", "10", "20"]],
            ["101", ["AAPL", "40"]],
            ["202", ["8"]]
        ],
        "date": "2020-02-10",
        "amount": 1000000
    }

    data = CreateRules
    UserID = data['UserID']
    etfID = data['ETFid']
    listOfRules = data['Rules']
    date = data['date']
    amount = data['amount']

    etfNew = ETF.ETF(UserID, etfID, listOfRules, date, int(amount))
    if etfNew.createETF() == None:
        data = {"error": "response 200"}

    unitTesting.UnitTest.main()


if __name__ == "__main__":
   testAutomated()