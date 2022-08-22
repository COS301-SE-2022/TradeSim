import json
import unittest
import apiCalls
import requests
import ETF
from flask import Flask, request, jsonify


class UnitTest(unittest.TestCase):

    def test_listAllCompanies(self):
        self.assertEqual(len(apiCalls.listallcompanies()), 3161, "The length of the list should be 3161")
    def test_AddEndDate(self):
        startDate = "2016-06-06"
        endDate = apiCalls.getEndDay(startDate)
        self.assertEqual(endDate, "2016-06-10", "This function should return the date it was given but 4 days later")

    def test_RemoveStockByTicker(self):
        UserID = 12
        etfID = 13
        listOfRules = [["000", ["AAPL"]],["102", ["100",50,"20"]],["101", ["GOOG",20]],["013", ["25", "35"]]]
        Date = "2016-06-06"
        etfNew = ETF.ETF(UserID, etfID, listOfRules, Date, 1000000)
        etfNew.createETF()

        passedTest = True
        for x in etfNew.stocksWithAmountOFShares:
            if x == "AAPL":
                passedTest = False
        self.assertEqual(passedTest, True, "AAPL is in the list of stocks but should not be according to the rules set")

    def test_StockIsInETF(self):
        UserID = 12
        etfID = 13
        listOfRules = [["000", ["AAPL"]], ["102", ["100", 50, "20"]], ["101", ["GOOG", 20]], ["013", ["25", "35"]]]
        Date = "2016-06-06"
        etfNew = ETF.ETF(UserID, etfID, listOfRules, Date, 1000000)
        etfNew.createETF()

        print("Unit Testing")
        print(etfNew.stocksWithAmountOFShares)

        passedTest = False
        for x in etfNew.stocksWithAmountOFShares:
            if x == "GOOG":
                passedTest = True
        self.assertEqual(passedTest, True, "The rule states that GOOG needs to be in the stock")

    def test_e2eConnection(self):
        url = 'http://127.0.0.1:6969/createRules'
        CreateRules = {
            "UserID": 1,
            "ETFid": 23,
            "Rules": [

            ],
            "date": "2020-02-10",
            "amount": 1000000
        }

        print("Sending request")
        x = requests.post(url, json=CreateRules)


        data = json.loads(x.text)
        print("E2e Connection")
        print(data)
        ETFid = data["ETFid"]
        if ETFid == 23:
            passedTest = True
        self.assertEqual(passedTest, True, "The ETDid should be 23")


if __name__ == '__main__':
    unittest.main()
