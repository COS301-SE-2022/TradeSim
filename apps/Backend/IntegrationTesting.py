import unittest
import apiCalls
import info



class Tests(unittest.TestCase):

    def test_listAllCompanies(self):
        data = apiCalls.listallcompanies()
        size = len(data)
        self.assertIsNotNone(data)
        self.assertTrue(size > 0, "Test to see if list all companies will return all the companies ont he simfin API")

    def test_getSharePrice(self):
        testTicker = ["AAPL"]
        data = apiCalls.getShareMarketEarn(testTicker, "2022-06-15")
        price = data["AAPL"][0]
        self.assertIsNotNone(data)
        self.assertEqual(price,135.43,"Test to see if we can get the correct price of a certain stock on a certain day")

    def test_getMarketCap(self):
        testTicker = ["AAPL"]
        data = apiCalls.getShareMarketEarn(testTicker, "2022-06-15")
        marketCap = data["AAPL"][1]
        self.assertIsNotNone(data)
        self.assertEqual(marketCap,2219931181320,"Test to see if we can get the correct marketCap of a certain stock on a certain day")

    def test_getEarnings(self):
        testTicker = ["AAPL"]
        data = apiCalls.getShareMarketEarn(testTicker, "2022-06-15")
        earnings = data["AAPL"][2]
        self.assertIsNotNone(data)
        self.assertEqual(earnings, 130634028041.4325,"Test to see if we can get the correct earnings of a certain stock on a certain day")

    def test_companiesByIndustry(self):
        testCode = ["100"]
        data = apiCalls.companiesByIndustry(testCode)
        size = (len(data))
        self.assertIsNotNone(data)
        self.assertTrue(size > 0, "Test to see if we can get the correct amount of stocks in a certain sector/Industry")


    def test_getCountry(self):
        testCode = ["USA"]
        data = apiCalls.getCountry(testCode)
        testValue = data['USA']
        self.assertIsNotNone(data)
        self.assertEqual(testValue, 'US', "Test to see if we can get the correct country when inputting a code")

    def test_AddEndDate(self):
        startDate = "2016-06-06"
        endDate = apiCalls.getEndDay(startDate)
        self.assertIsNotNone(endDate)
        self.assertEqual(endDate, "2016-06-10", "This function should return the date it was given but 4 days later")

    def test_companiesByExchange(self):
        testCode = "US"
        data = apiCalls.companiesByExchange(testCode)
        size = len(data)
        self.assertIsNotNone(data)
        self.assertTrue(size > 0, "Test to see if we get the correct amount of stocks according to the stock exchange")

    def test_companiesRevenue(self):
        testYear = "2021"
        data = apiCalls.companiesRevenue(testYear)
        testValue = data["XRAY"]
        self.assertIsNotNone(data)
        self.assertEqual(testValue, 4251000000, "Test to see if we get the correct Revenue of t a certain company in a certain year")

    def test_getSharePriceHistory(self):
        testTicker = ["AAPL"]
        testStartDate = "2022-06-13"
        testEndDate = "2022-06-15"
        data = apiCalls.getSharePriceHistory(testTicker, testStartDate, testEndDate)
        price = data[testTicker[0]][testStartDate]
        self.assertIsNotNone(data)
        self.assertEqual(price, 131.88, "Test to see if we get the correct prices of a stock over a duration of time")

    def test_getCompanyInformation(self):
        testTicker = "AAPL"
        data = apiCalls.getCompanyInformation(testTicker)
        CompanyName = data["Company Name"]
        self.assertIsNotNone(data)
        self.assertEqual(CompanyName, "APPLE INC", "Test to see if we get the correct compnay information of a particular stock")

    def test_finhubInformation(self):
        testTicker = "AAPL"
        data = apiCalls.finhubInformation(testTicker)
        IPO = data["IPO"]
        self.assertIsNotNone(data)
        self.assertEqual(IPO, "1980-12-12", "Test to see if finhub gets the correct company information of a particular stock")

    def test_news(self):
        testTicker = "forex"
        data = apiCalls.getNews(testTicker)
        size = len(data)
        self.assertIsNotNone(data)
        self.assertTrue(size > 0, "Test if the news function returns a value")

    # def test_StockInformation(self):
    #     testTicker = "AAPL"
    #     response = info.stockInformation(testTicker)
    #     knownAnswer = {"Found" : "True", "Ticker" : "AAPL"}
    #     self.assertEqual(response,knownAnswer,"Test if stock information is correct")

if __name__ == '__main__':
    unittest.main()
