import unittest
import apiCalls
import info
import ETF
import AiFactor



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

    def test_StockInformation(self):
        testTicker = "AAPL"
        fileLocation = 'apps/Backend/databases/industries.csv'
        response = info.stockInformation(testTicker,fileLocation)
        knownAnswer = 'True'
        self.assertIsNot(response == None, "Test to see if not None for stock")
        self.assertEqual(response['Found'],knownAnswer,"Test if stock information is correct")

    def test_newsInformation_empty(self):
        response = info.newsInformation("")
        knownAnswer = 'True'
        print(response)
        self.assertIsNot(response == None, "Test to see if not None for news")
        self.assert_(len(response)>0,"Test if newsInformation returns news even if the parameter is empty")

    def test_newsInformation_withParameter(self):
        response = info.newsInformation("Forex")
        knownAnswer = 'True'
        print(response)
        self.assertIsNot(response == None, "Test to see if not None for news")
        self.assert_(len(response)>0,"Test if newsInformation returns news relevant to category")

    def test_createEtf_noRule(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = []
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for createETF")
        self.assert_(len(response)>knwon_response,"Test if createETF returns stocks even when no rules are given")

    def test_createEtf_testRule000(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["000",["AAPL"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = "AAPL"

        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule000")
        self.assertIsNot(knwon_response in response,"Test if createETF returns the correct output when rejecting a company")

    def test_createEtf_testRule001(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["001", ["100"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule001")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when rejecting a specific sector")

    def test_createEtf_testRule002(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["002", ["100000"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule002")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when rejecting a specific industry")

    def test_createEtf_testRule003(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["003", ["US"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule003")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when rejecting a specific country")

    def test_createEtf_testRule011(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["011", [10,100000000000]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule011")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when setting a min and max market cap")

    def test_createEtf_testRule012(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["012", [10,100000000000]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule012")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when setting a min and max earning")

    def test_createEtf_testRule013(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["013", [10,250]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule013")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when setting a min and max price")

    def test_createEtf_testRule101(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["101", ["AAPL", "60"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 3000
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule101")
        self.assert_(response["AAPL"]>knwon_response,"Test if createETF returns the correct output when an individual asks for certain stocks")

    def test_createEtf_testRule102(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["102", ["100","50","2"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule102")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when setting a specific sector")

    def test_createEtf_testRule103(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["103", ["100000","50","2"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule103")
        self.assert_(len(response)>knwon_response,"Test if createETF returns the correct output when setting a specific industry")

    def test_createEtf_testRule104(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["50","10"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 10
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule104")
        self.assert_(len(response)>=knwon_response,"Test if createETF returns the correct output when grabbing 10 stocks with the highest market Cap")

    def test_createEtf_testRule105(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["105",["US","50","5"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule105")
        self.assert_(len(response)>=knwon_response,"Test if createETF returns the correct output when grabbing stocks from a certain exchange")


    def test_createEtf_testRule106(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["106", ["50","10"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 10
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule106")
        self.assert_(len(response)>=knwon_response,"Test if createETF returns the correct output when grabbing 10 stocks with the highest revenue")

    def test_createEtf_testRule200(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["200", ["32"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule200")
        self.assert_(len(response)>=knwon_response,"Test if createETF returns the correct output when adding the rebalancing rule")

    def test_createEtf_testRule202(self):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["202", ["32"]]]
        mock_Date = "2022-09-15"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        response = mock_etf.createETF()
        knwon_response = 0
        self.assertIsNot(response == None, "Test to see if not None for create ETF with rule202")
        self.assert_(len(response)>=knwon_response,"Test if createETF returns the correct output when adding the reconsidering rule")

#     def test_AiFactor(self):
#         mock_Date = "2022-09-15"
#         mock_seedValue = 31
#         mock_file = 'apps/Backend/databases/industries.csv'
#         AiTing = AiFactor.AiFactor(mock_Date,mock_seedValue,mock_file)
#         response = AiTing.generateRandomETF()
#         knwon_response = 0
#         self.assertIsNot(response == None, "Test to see if not None for generating AiETF")
#         self.assert_(len(response) >= knwon_response,"Test if AiFactor will generate a ETF without any errors")


if __name__ == '__main__':
    unittest.main()
