from requests.models import Response
import unittest
from unittest import mock
import info
import AiFactor
import ETF
import apiCalls


class TestStrings(unittest.TestCase):
    @mock.patch("apiCalls.requests.get")
    def test_stockInformationUnitTest_returnValueNone(self,mock_get):
        the_response = Response()
        the_response._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
        mock_get.side_effect = [None,None,None, the_response]
        
        response = info.stockInformation("L")        
        self.assertIsNot(response == None, "Test to see if not None for stock")
        self.assertEqual(response,{"Found" : "False"},"Test for correct response with ticker length being less than 2")
    
        response = info.stockInformation("AAPL")
        known_Results = {"Found" : "False", "PossibleStock" : ["AAPL"]}
        self.assertIsNot(response == None, "Test to see if not None for stock")
        self.assertEqual(response, known_Results, "Test for correct response when suggesting possible stocks")
    
    @mock.patch("apiCalls.requests.get")
    def test_stockInformationUnitTest_returnValueStockValue(self,mock_get):
        the_response1 = Response()
        the_response2 = Response()
        the_response3 = Response()
        the_response1._content = b'[{"found": true,"columns": ["SimFinId","Ticker","Company Name","IndustryId","Month FY End","Number Employees", "Summary"],"data": [111052,"AAPL","Apple Inc.",103002,12,132000,"Summary Of Apple Inc."]}]'
        the_response2._content = b'{  "country": "US",  "currency": "USD",  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",  "ipo": "1980-12-12",  "marketCapitalization": 1415993,  "name": "Apple Inc",  "phone": "14089961010",  "shareOutstanding": 4375.47998046875,  "ticker": "AAPL",  "weburl": "https://www.apple.com/",  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",  "finnhubIndustry":"Technology"}'
        the_response3._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
        mock_get.side_effect = [the_response1, the_response2, the_response3]
        response = info.stockInformation("AAPL")
        known_Result = {'Found': 'True', 'Ticker': 'AAPL', 'Company Name': 'Apple Inc.', 'Country': 'US', 'Exchange': 'NASDAQ/NMS (GLOBAL MARKET)', 'IPO': '1980-12-12', 'Logo': 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png', 'Industry': 'Retail - Apparel & Specialty', 'Sector': 'Consumer Cyclical', 'Summary': 'Summary Of Apple Inc.', 'PriceHistory': {'2018-01-02': 172.26, '2018-01-03': 172.23, '2018-01-04': 173.03, '2018-01-05': 175}}
        self.assertIsNot(response == None, "Test to see if not None for stock")
        self.assertEqual(response, known_Result, "Test for correct response when suggesting possible stocks")
    
    @mock.patch("apiCalls.requests.get")
    def test_newsInformation_returnValueNone(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'{"error":"error"}'
        mock_get.side_effect = [mockResponse]
        response = info.newsInformation("forex")
        self.assertIsNot(response == None, "Test to see if not None for news Information")
        self.assertEqual(response, {'Error': 'No news found'}, "Test for correct response that represents all the news articles")
    
    @mock.patch("apiCalls.requests.get")
    def test_newsInformation_returnValueNews(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"category":"technology","datetime":1596589501,"headline":"Square surges after reporting 64% jump in revenue, more customers using Cash App","id":5085164,"image":"https:\/\/image.cnbcfm.com\/api\/v1\/image\/105569283-1542050972462rts25mct.jpg?v=1542051069","related":"","source":"CNBC","summary":"Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.","url":"https:\/\/www.cnbc.com\/2020\/08\/04\/square-sq-earnings-q2-2020.html"}]'
        mock_get.side_effect = [mockResponse]
        response = info.newsInformation("forex")
        known_response = [{'date': '2020-08-05', 'headline': 'Square surges after reporting 64% jump in revenue, more customers using Cash App', 'image': 'https://image.cnbcfm.com/api/v1/image/105569283-1542050972462rts25mct.jpg?v=1542051069', 'source': 'CNBC', 'summary': 'Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.', 'url': 'https://www.cnbc.com/2020/08/04/square-sq-earnings-q2-2020.html'}]
    
        self.assertIsNot(response == None, "Test to see if not None for news Information")
        self.assertEqual(response, known_response,"Test for correct response that represents all the news articles")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code000Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mock_get.side_effect = [mockResponse]
        response = aiTing.code000()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 1
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 000")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 000")
        self.assertEqual(response[0], 'AAPL', "Test for correct response for AiFactor code 000")
    
    @mock.patch("AiFactor.csv.reader")
    def test_AiFactor_code001Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mock_get.side_effect = [[["123456","123465"],["123456","123456"]]]
        response = aiTing.code001()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 1
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 000")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 001")
        self.assertEqual(response[0], '123', "Test for correct response for AiFactor code 001")
    
    @mock.patch("AiFactor.csv.reader")
    def test_AiFactor_code002Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mock_get.side_effect = [[["123456","123465"],["123456","123456"]]]
        response = aiTing.code002()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 1
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 000")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 002")
        self.assertEqual(response[0], '123456', "Test for correct response for AiFactor code 002")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code003Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mock_get.side_effect = [[["123456","123465"],["123456","123456"]]]
        response = aiTing.code003()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 1
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 000")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 003")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code011Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
    
        mockResponse1 = Response()
        mockResponse2 = Response()
        mockResponse1._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mockResponse2._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,172.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,172.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
        mock_get.side_effect = [mockResponse1,mockResponse2]
        response = aiTing.code011()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 011")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response (MarketCap) length for AiFactor code 011, Due to it being random we can never know the exact value even when mocking therefore check the size that both a min and max is returned")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code012Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
    
        mockResponse1 = Response()
        mockResponse2 = Response()
        mockResponse1._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mockResponse2._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,172.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,172.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
        mock_get.side_effect = [mockResponse1,mockResponse2]
        response = aiTing.code012()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 012")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response (Earnings) length for AiFactor code 012, Due to it being random we can never know the exact value even when mocking therefore check the size that both a min and max is returned")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code013Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
    
        mockResponse1 = Response()
        mockResponse2 = Response()
        mockResponse1._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mockResponse2._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
        mock_get.side_effect = [mockResponse1,mockResponse2]
        response = aiTing.code013()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 013")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response (Price) length for AiFactor code 013, Due to it being random we can never know the exact value even when mocking therefore check the size that both a min and max is returned")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code101Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mock_get.side_effect = [mockResponse]
        response = aiTing.code101()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        print(response)
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 101")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 101")
        self.assertEqual(response[0], 'AAPL', "Test for correct response for AiFactor code 101")
    
    @mock.patch("AiFactor.csv.reader")
    def test_AiFactor_code102Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mock_get.side_effect = [[["123456","123465"],["123456","123456"]]]
        response = aiTing.code102()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 3
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 102")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 102, this is because most of the response objects are random we cannot get the exact value")
        self.assertEqual(response[0], '123', "Test for correct response for AiFactor code 102")
    
    @mock.patch("AiFactor.csv.reader")
    def test_AiFactor_code103Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mock_get.side_effect = [[["123456","123465"],["123456","123456"]]]
        response = aiTing.code103()
        print(response)
        sizeOfReponse = len(response)
        mockSizeOfReponse = 3
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 103")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 103, this is because most of the response objects are random we cannot get the exact value")
        self.assertEqual(response[0], '123456', "Test for correct response for AiFactor code 103")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code104Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mock_get.side_effect = [mockResponse]
        response = aiTing.code104()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 104")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 104, this is because the 2 values in the parameter are random integers and thus we can never know the value")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code105Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mock_get.side_effect = [mockResponse]
        response = aiTing.code105()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 3
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 105")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 105, this is because the 3 values in the parameter are random integers and a ranom country, thus we can never know the value")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_code106Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date,mock_seedValue)
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"]]}'
        mock_get.side_effect = [mockResponse]
        response = aiTing.code104()
        sizeOfReponse = len(response)
        mockSizeOfReponse = 2
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 106")
        self.assertEqual(sizeOfReponse, mockSizeOfReponse, "Test for correct response length for AiFactor code 106, this is because the 2 values in the parameter are random integers and thus we can never know the value")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_fitnessFunction_Value(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date, mock_seedValue)
        mock_get.side_effect = [None]
        mock_XValue = [1,2,3,4,5,6,7,8,9,10]
        mock_YValue = [1,2,3,4,5,6,7,8,9,10]
    
        response = aiTing.fitnessFunction(mock_XValue,mock_YValue)
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 106")
        self.assertEqual(response, 1.0,"Testing the fitness function of the AiFactor")
    
    @mock.patch("apiCalls.requests.get")
    def test_AiFactor_fitnessFunction_None(self,mock_get):
        mock_Date = "2022-01-01"
        mock_seedValue = 81
        aiTing = AiFactor.AiFactor(mock_Date, mock_seedValue)
        mock_get.side_effect = [None]
        mock_XValue = [1,2,3,4,5,6,7,8,9,10]
        mock_YValue = []
    
        response = aiTing.fitnessFunction(mock_XValue,mock_YValue)
        self.assertIsNot(response == None, "Test to see if not None for AiFactor code 106")
        self.assertEqual(response, 0,"Testing the fitness function of the AiFactor if the size is 0")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_createETF_APIisDown(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_get.side_effect = [None]
        response = mock_etf.createETF()
        self.assertEqual(response, None, "Test if the api is down you will get the correct response")
    
    
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code000(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG" , "BIDU"]
        mock_etf.code000("BIDU")
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 2
        mockRespone = ["AAPL", "GOOG"]
        self.assertIsNot(response == None, "Test to see if not None for ETF code000 Function")
        self.assertEqual(responseSize, mockSize, "Test to see if code00 will return the correct size array")
        self.assertEqual(response, mockRespone, "Test to see if code00 will return the correct size array")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code101_NewStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG" , "BIDU"]
    
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.stocksConfirmedIn = {"AAPL" : 15}
        mock_etf.code101("GOOG",15)
    
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {"AAPL" : 15, "GOOG" : 15}
        self.assertIsNot(response == None, "Test to see if not None for ETF code000 Function")
        self.assertEqual(responseSize, mockSize, "Test to see if code101 will return the correct size array with a new stock")
        self.assertEqual(response, mockRespone, "Test to see if code101 will return the correct values when adding a new stock")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code101_ExistingStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG" , "BIDU"]
    
        mockResponse = Response()
        mockResponse._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.stocksConfirmedIn = {"AAPL" : 15}
        mock_etf.code101("AAPL",15)
    
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 1
        mockRespone = {"AAPL" : 30}
        self.assertIsNot(response == None, "Test to see if not None for ETF code000 Function")
        self.assertEqual(responseSize, mockSize, "Test to see if code101 will return the correct size array when adding a already existing stock")
        self.assertEqual(response, mockRespone, "Test to see if code101 will return the correct values when adding a already existing stock")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule011_lessThanMin(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["011","128298074923","128229807523"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code011 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code011 will return the correct size array when its marketCap is less than min")
        self.assertEqual(response, mockRespone,"Test to see if code011 will return the correct response when its marketCap is less than min")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule011_greaterThanMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["011","5","100"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code011 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code011 will return the correct size array when its marketCap is greater than Max")
        self.assertEqual(response, mockRespone,"Test to see if code011 will return the correct response when its marketCap is greater than Max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule011_BetweenMinAndMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["011","50","128229807523"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        print(response)
        mockSize = 1
        mockRespone = ['AAPL']
        self.assertIsNot(response == None, "Test to see if not None for ETF code011 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code011 will return the correct size array when one of the stocks us between min and max")
        self.assertEqual(response, mockRespone,"Test to see if code011 will return the correct response when one of the stocks us between min and max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule012_lessThanMin(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["012","292624005","2926240054"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code012 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code012 will return the correct size array when its Earnings is less than min")
        self.assertEqual(response, mockRespone,"Test to see if code012 will return the correct response when its Earnings is less than min")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule012_greaterThanMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["012","5","100"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code012 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code012 will return the correct size array when its Earnings is greater than Max")
        self.assertEqual(response, mockRespone,"Test to see if code012 will return the correct response when its Earnings is greater than Max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule012_BetweenMinAndMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["012","50","292624002"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        print(response)
        mockSize = 1
        mockRespone = ['AAPL']
        self.assertIsNot(response == None, "Test to see if not None for ETF code012 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code012 will return the correct size array when one of the stocks is between min and max")
        self.assertEqual(response, mockRespone,"Test to see if code012 will return the correct response when one of the stocks is between min and max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule013_lessThanMin(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["013","1832","2000"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code013 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code013 will return the correct size array when its Price is less than min")
        self.assertEqual(response, mockRespone,"Test to see if code013 will return the correct response when its Price is less than min")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule013_greaterThanMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["013","5","100"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        mockSize = 0
        mockRespone = []
        self.assertIsNot(response == None, "Test to see if not None for ETF code013 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code013 will return the correct size array when its Price is greater than Max")
        self.assertEqual(response, mockRespone,"Test to see if code013 will return the correct response when its Price is greater than Max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code011_012_013_ForRule013_BetweenMinAndMax(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code011_012_013([["013","1000","2000"]])
    
        response = mock_etf.listOfAllStocks
        responseSize = len(response)
        print(response)
        mockSize = 2
        mockRespone = ['AAPL', 'GOOG']
        self.assertIsNot(response == None, "Test to see if not None for ETF code012 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code013 will return the correct size array when one of the stocks is between min and max")
        self.assertEqual(response, mockRespone,"Test to see if code013 will return the correct response when one of the stocks is between min and max")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code104_NewStocks(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.code104(30,2)
        response = mock_etf.stocksConfirmedIn
        print(response)
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'GOOG': 15.0, 'AAPL': 15.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code104 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code104 will return the correct size array when 2 new stocks are added")
        self.assertEqual(response, mockRespone,"Test to see if code013 will return the correct response when 2 new stocks are added")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code104_AlreadyExistingStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.stocksConfirmedIn = {"AAPL" : 15.0, "GOOG" : 15.0}
        mock_etf.code104(30,2)
    
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'GOOG': 30.0, 'AAPL': 30.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code104 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code104 will return the correct size array when 2 already excisting stocks are added")
        self.assertEqual(response, mockRespone,"Test to see if code104 will return the correct response when 2 already excisting stocks are added")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code104_AlreadyExistingStockAndNew(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
    
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
    
        mock_get.side_effect = [mockResponse]
        mock_etf.stocksConfirmedIn = {"AAPL" : 15.0}
        mock_etf.code104(30,2)
    
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'GOOG': 15.0, 'AAPL': 30.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code104 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code104 will return the correct size array when 1 already excisting stock is added and a new stock is added")
        self.assertEqual(response, mockRespone,"Test to see if code104 will return the correct response when 1 already excisting stock is added and a new stock is added")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code106_NewStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10, "currentPage": 1, "firstPos": 1, "lastPos": 10, "totalItems": 1401, "results": [     {"name": "Bidu", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 102001020}, {"indicatorId": "1-1", "value": "BIDU"}]},        {"name": "Apple Inc", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 8912345}, {"indicatorId": "1-1", "value": "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.code106(50,2)
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'AAPL': 25.0, 'BIDU': 25.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code106 Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code106 will return the correct size array when 2 new stocks are added")
        self.assertEqual(response, mockRespone,
                     "Test to see if code106 will return the correct response when 2 new stocks are added")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code106_AlreadyExisting(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.stocksConfirmedIn = {"AAPL" : 20, "BIDU" : 5}
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10, "currentPage": 1, "firstPos": 1, "lastPos": 10, "totalItems": 1401, "results": [     {"name": "Bidu", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 102001020}, {"indicatorId": "1-1", "value": "BIDU"}]},        {"name": "Apple Inc", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 8912345}, {"indicatorId": "1-1", "value": "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.code106(50,2)
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'AAPL': 45.0, 'BIDU': 30.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code106 Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code106 will return the correct size array when 2 already excisting stocks are added")
        self.assertEqual(response, mockRespone,
                     "Test to see if code106 will return the correct response when 2 already excisting stocks are added")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code106_NewStockAndExisting(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.stocksConfirmedIn = {"AAPL" : 15}
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10, "currentPage": 1, "firstPos": 1, "lastPos": 10, "totalItems": 1401, "results": [     {"name": "Bidu", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 102001020}, {"indicatorId": "1-1", "value": "BIDU"}]},        {"name": "Apple Inc", "simId": 111052,         "values": [{"indicatorId": "1-1", "value": 8912345}, {"indicatorId": "1-1", "value": "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.code106(50,2)
        response = mock_etf.stocksConfirmedIn
        responseSize = len(response)
        mockSize = 2
        mockRespone = {'AAPL': 40.0, 'BIDU': 25.0}
        self.assertIsNot(response == None, "Test to see if not None for ETF code106 Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code106 will return the correct size array when 1 already excisting stock is added and a new stock is added")
        self.assertEqual(response, mockRespone,
                     "Test to see if code106 will return the correct response when 1 already excisting stock is added and a new stock is added")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code001_002_removeStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10,"currentPage": 1,"firstPos": 1,"lastPos": 10,"totalItems": 1401,"results": [{"name": "Apple Inc","simId": 111052,"values": [{"indicatorId": "1-1","value": 102001020},{"indicatorId": "1-1", "value" : "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.code001_002("000")
        response = mock_etf.listOfAllStocks
        mock_response = ['GOOG']
        responseSize = len(response)
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code001_002 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code001_002 will return the correct size array when we remove a stock from the listOfAllStocks")
        self.assertEqual(response, mock_response,"Test to see if code001_002 will return the correct response when we do not remove a stock from the listOfAllStocks")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code001_002_notRemoved(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10,"currentPage": 1,"firstPos": 1,"lastPos": 10,"totalItems": 1401,"results": [{"name": "Apple Inc","simId": 111052,"values": [{"indicatorId": "1-1","value": 102001020},{"indicatorId": "1-1", "value" : "BIDU"}]}]}'
        mock_get.side_effect = [mockResponse]
        mock_etf.code001_002("000")
        response = mock_etf.listOfAllStocks
        mock_response = ['AAPL','GOOG']
        responseSize = len(response)
        mockSize = 2
        self.assertIsNot(response == None, "Test to see if not None for ETF code001_002 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code001_002 will return the correct size array when we do not remove a stock from the listOfAllStocks")
        self.assertEqual(response, mock_response,"Test to see if code001_002 will return the correct response when we do not remove a stock from the listOfAllStocks")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code003_removeStock(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mockResponse = Response()
        mockResponse._content = b'[  {    "currency": "USD",    "description": "UAN POWER CORP",    "displaySymbol": "UPOW",    "figi": "BBG000BGHYF2",    "mic": "OTCM",    "symbol": "UPOW",    "type": "Common Stock"  },  {    "currency": "USD",    "description": "APPLE INC",    "displaySymbol": "AAPL",    "figi": "BBG000B9Y5X2",    "mic": "XNGS",    "symbol": "AAPL",    "type": "Common Stock"  }]'
        mock_get.side_effect = [mockResponse]
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mock_etf.code003("ZA")
    
        response = mock_etf.listOfAllStocks
        mock_response = ['GOOG']
        print(response)
        responseSize = len(response)
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code003 Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code003 will return the correct size array when we remove a stock from the listOfAllStocks")
        self.assertEqual(response, mock_response,
                     "Test to see if code003 will return the correct response when we remove a stock from the listOfAllStocks")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code003_None(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104",["11","16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID,mock_etfID,mock_Rules,mock_Date,mock_amount)
        mockResponse = Response()
        mockResponse._content = b'["error"]'
        mock_get.side_effect = [mockResponse]
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mock_etf.code003("ZA")
    
        response = mock_etf.listOfAllStocks
        mock_response = ['AAPL','GOOG']
        print(response)
        responseSize = len(response)
        mockSize = 2
        self.assertIsNot(response == None, "Test to see if not None for ETF code003 Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code003 will return the correct size array when we do not remove a stock from the listOfAllStocks because a none value is returned")
        self.assertEqual(response, mock_response,
                     "Test to see if code003 will return the correct response when we do not remove a stock from the listOfAllStocks because a none value is returned")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_convertCodeToEtf_011(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_get.side_effect = [None]
        mock_code = "011"
        mock_parameters = [100000,1111111100]
        mock_etf.convertCodeToEtf(mock_code,mock_parameters)
        response = mock_etf.priorityTwoRules
        responseSize = len(response)
        mock_response = [["011",100000,1111111100]]
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code011 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code011 will return the correct size array when adding a new rule")
        self.assertEqual(response, mock_response,"Test to see if code011 will return the correct response when adding a new rule")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_convertCodeToEtf_012(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_get.side_effect = [None]
        mock_code = "012"
        mock_parameters = [100022500,111111121215100]
        mock_etf.convertCodeToEtf(mock_code,mock_parameters)
        response = mock_etf.priorityTwoRules
        responseSize = len(response)
        mock_response = [["012",100022500,111111121215100]]
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code012 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code012 will return the correct size array when adding a new rule")
        self.assertEqual(response, mock_response,"Test to see if code012 will return the correct response when adding a new rule")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_convertCodeToEtf_013(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_get.side_effect = [None]
        mock_code = "013"
        mock_parameters = [10,124]
        mock_etf.convertCodeToEtf(mock_code,mock_parameters)
        response = mock_etf.priorityTwoRules
        responseSize = len(response)
        mock_response = [["013",10,124]]
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code013 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if code013 will return the correct size array when adding a new rule")
        self.assertEqual(response, mock_response,"Test to see if code013 will return the correct response when adding a new rule")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_convertCodeToEtf_200(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_get.side_effect = [None]
        mock_code = "200"
        mock_parameters = ["10"]
        mock_etf.convertCodeToEtf(mock_code,mock_parameters)
        response = mock_etf.c200
        responseSize = len(response)
        mock_response = {"200" : 10}
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF 200 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if 200 will return the correct size array when adding a new rule")
        self.assertEqual(response, mock_response,"Test to see if 200 will return the correct response when adding a new rule")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_convertCodeToEtf_202(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_get.side_effect = [None]
        mock_code = "202"
        mock_parameters = ["10"]
        mock_etf.convertCodeToEtf(mock_code,mock_parameters)
        response = mock_etf.c200
        responseSize = len(response)
        mock_response = {"202" : 10}
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF 202 Function")
        self.assertEqual(responseSize, mockSize,"Test to see if 202 will return the correct size array when adding a new rule")
        self.assertEqual(response, mock_response,"Test to see if 202 will return the correct response when adding a new rule")
    
    @mock.patch("apiCalls.requests.post")
    def test_ETF_code102_103ReturnStocks(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10,"currentPage": 1,"firstPos": 1,"lastPos": 10,"totalItems": 1401,"results": [{"name": "Apple Inc","simId": 111052,"values": [{"indicatorId": "1-1","value": 102001020},{"indicatorId": "1-1", "value" : "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
        response = mock_etf.code102_103ReturnStocks("000")
        print(response)
        mock_response = ['AAPL']
        responseSize = len(response)
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code102_103ReturnStocks Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code102_103ReturnStocks will return the correct size array")
        self.assertEqual(response, mock_response,
                     "Test to see if code102_103ReturnStocks will return the correct response")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_code105ReturnStocks(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        mockResponse = Response()
        mockResponse._content = b'[  {    "currency": "USD",    "description": "UAN POWER CORP",    "displaySymbol": "UPOW",    "figi": "BBG000BGHYF2",    "mic": "OTCM",    "symbol": "UPOW",    "type": "Common Stock"  },  {    "currency": "USD",    "description": "APPLE INC",    "displaySymbol": "AAPL",    "figi": "BBG000B9Y5X2",    "mic": "XNGS",    "symbol": "AAPL",    "type": "Common Stock"  }]'
        mock_get.side_effect = [mockResponse]
        mock_etf.listOfAllStocks = ["AAPL", "GOOG"]
        response = mock_etf.code105ReturnStocks("ZA")
        print(response)
        mock_response = ['AAPL']
        responseSize = len(response)
        mockSize = 1
        self.assertIsNot(response == None, "Test to see if not None for ETF code105ReturnStocks Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if code105ReturnStocks will return the correct size array")
        self.assertEqual(response, mock_response,
                     "Test to see if code105ReturnStocks will return the correct response")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_prioritizeRules(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["011",["100000","100000000"]],
                ["000",["MXMG"]],
                ["012",["10000","10000000"]],
                ["101",["AAPL","10"]],
                ["102",["100","25","20"]],
                ["202",["25"]],
                ["200",["10"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_etf.prioritizeRules()
        response = mock_etf.rules
        print(response)
        mock_response = [["000", ["MXMG"]], ["101", ["AAPL", "10"]], ["202", ["25"]], ["200", ["10"]],["011", ["100000", "100000000"]], ["012", ["10000", "10000000"]], ["102", ["100", "25", "20"]]]
        responseSize = len(response)
        mockSize = 7
        self.assertIsNot(response == None, "Test to see if not None for ETF prioritizeRules Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if prioritizeRules will return the correct size array")
        self.assertEqual(response, mock_response,
                     "Test to see if prioritizeRules will return the correct array with the correct order")
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_prioritizeRules_NoRules(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = []
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mock_etf.prioritizeRules()
        response = mock_etf.rules
        print(response)
        mock_response = []
        responseSize = len(response)
        mockSize = 0
        self.assertIsNot(response == None, "Test to see if not None for ETF prioritizeRules Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if prioritizeRules will return the correct size array")
        self.assertEqual(response, mock_response,
                     "Test to see if prioritizeRules will return the correct array with the correct order")
    
    
    @mock.patch("apiCalls.requests.get")
    def test_ETF_redefinedGetValues(self,mock_get):
        mock_userID = 0
        mock_etfID = 0
        mock_Rules = [["104", ["11", "16"]]]
        mock_Date = "2022-01-01"
        mock_amount = 1000000
        mock_etf = ETF.ETF(mock_userID, mock_etfID, mock_Rules, mock_Date, mock_amount)
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,1732.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]},{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[2,"GOOG","2018-01-02",170.16,172.3,169.26,1722.26,167.19,250148048,null,741479319,128298071491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247132491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[2,"GOOG","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74471329319,12821327573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396031213111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[2,"GOOG","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,744793319,128837156567,1211.43743,141.88049,37.09703,7.838868,14.40393,165.64988,305.33644,134535596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[2,"GOOG","2018-01-05",173.44,175.37,173.05,175,169.85,230165177,null,744749319,130333880825,1225.230201,1423.49584,327.51939,7.972849,124.56793,167.532586,308.812279,136202320825,720.61592,28.84056,3242.27953,0.02465,"01.01115"],[2,"GOOG","2018-01-02",170.16,172.3,169.26,1372.26,167.19,250448048,null,744794319,128298074941,12076.04641,1461.24911,356.93194,74.85357,124.33984,1614.91272,303.971766,13318247491,169.55648,8.707292,3317.042587,0.062568,"0.011232"],[2,"GOOG","2018-01-03",1272.53,2174.55,1271.96,2172.23,1267.17,288139653,null,744479319,128327573111,12205.83637,1141.22451,316.92551,71.85221,114.33734,1614.884,3103.921472,133196013111,619.54488,8.701647,3136.98966,0.061569,"0.011132"],[2,"GOOG","2018-01-04",172.54,173.47,1712.08,1173.03,1167.94,222111345,null,744791319,112887156567,12111.43743,1411.88049,371.09703,71.88868,114.40393,1165.64988,3105.33644,134555916567,691.85421,8.7452,338.418854,0.06539,"0.01127"]]}]'
        mock_get.side_effect = [mockResponse]
        mock_stocks = {"AAPL" : 50, "GOOG" : 50}
        mock_endDate = "2022-01-31"
        response = mock_etf.redefinedGetValues(mock_stocks,mock_Date,mock_endDate)
        print(response)
        mock_response = {'2018-01-02': 155226.0, '2018-01-03': 117223.0, '2018-01-04': 67303.0, '2018-01-05': 17500}
        responseSize = len(response)
        mockSize = 4
        self.assertIsNot(response == None, "Test to see if not None for ETF prioritizeRules Function")
        self.assertEqual(responseSize, mockSize,
                     "Test to see if prioritizeRules will return the correct size array")
        self.assertEqual(response, mock_response,
                     "Test to see if prioritizeRules will return the correct array with the correct order")
    
    @mock.patch("apiCalls.requests.get")
    def test_listAllCompanies_None(self,mock_get):
        the_response = Response()
        the_response._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
        mock_get.side_effect = [None]
    
        response = apiCalls.listallcompanies()
        self.assertEqual(response,None,"Test that listallcompanies will return if None is gotten from API")
    
    @mock.patch("apiCalls.requests.get")
    def test_listAllCompanies_Error(self,mock_get):
        the_response = Response()
        the_response._content = b'["error"]'
        mock_get.side_effect = [the_response]
    
        response = apiCalls.listallcompanies()
        self.assertEqual(response,None,"Test that listallcompanies will return if error is gotten from API")
    
    @mock.patch("apiCalls.requests.get")
    def test_listAllCompanies_Value(self,mock_get):
        the_response = Response()
        the_response._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
        mock_get.side_effect = [the_response]
    
        response = apiCalls.listallcompanies()
        mock_response = ['AAPL','GOOG']
        print(response)
        self.assertIsNot(response == None, "Test to see if not None for listAllCompanies")
        self.assertEqual(response,mock_response,"Test that listallcompanies will return if None is gotten from API")
    
    @mock.patch("apiCalls.requests.get")
    def test_getShareMarketEarn_None(self,mock_get):
        the_response = Response()
        the_response._content = b'[{"found":false,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
        mock_get.side_effect = [the_response]
    
        response = apiCalls.getShareMarketEarn("APPL", "2022-01-01")
        mock_response = {}
        self.assertIsNot(response == None, "Test to see if not None for getShareMarketEarn when error is returned")
        self.assertEqual(response, mock_response, "Test that listallcompanies will return the correct response when getShareMarketEarn returns error")
    
    
    @mock.patch("apiCalls.requests.get")
    def test_getShareMarketEarn_Value(self,mock_get):
        the_response = Response()
        the_response._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
        mock_get.side_effect = [the_response]
    
        response = apiCalls.getShareMarketEarn("APPL", "2022-01-01")
        mock_response = {'AAPL': [172.26, 12829807491, 192624001.25768298]}
        self.assertIsNot(response == None, "Test to see if not None for listAllCompanies")
        self.assertEqual(response, mock_response, "Test that listallcompanies will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.post")
    def test_companiesByIndustry_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10,"currentPage": 1,"firstPos": 1,"lastPos": 10,"totalItems": 1401,"results": [{"name": "Apple Inc","simId": 111052,"values": [{"indicatorId": "1-1","value": 102001020},{"indicatorId": "1-1", "value" : "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.companiesByIndustry("000")
        mock_response = ['AAPL']
        self.assertIsNot(response == None, "Test to see if not None for companiesByIndustry")
        self.assertEqual(response, mock_response, "Test that companiesByIndustry will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_getCountry_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'{  "country": "US",  "currency": "USD",  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",  "ipo": "1980-12-12",  "marketCapitalization": 1415993,  "name": "Apple Inc",  "phone": "14089961010",  "shareOutstanding": 4375.47998046875,  "ticker": "AAPL",  "weburl": "https://www.apple.com/",  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",  "finnhubIndustry":"Technology"}'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getCountry(["APPL"])
        mock_response = {'APPL': 'US'}
        self.assertIsNot(response == None, "Test to see if not None for companiesByIndustry")
        self.assertEqual(response, mock_response, "Test that getCountry will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_companiesByExchange_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[  {    "currency": "USD",    "description": "UAN POWER CORP",    "displaySymbol": "UPOW",    "figi": "BBG000BGHYF2",    "mic": "OTCM",    "symbol": "UPOW",    "type": "Common Stock"  },  {    "currency": "USD",    "description": "APPLE INC",    "displaySymbol": "AAPL",    "figi": "BBG000B9Y5X2",    "mic": "XNGS",    "symbol": "AAPL",    "type": "Common Stock"  }]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.companiesByExchange("za")
        mock_response = ['UPOW', 'AAPL']
        self.assertIsNot(response == None, "Test to see if not None for companiesByExchange")
        self.assertEqual(response, mock_response, "Test that companiesByExchange will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_companiesByExchange_Error(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'"error"'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.companiesByExchange("za")
        mock_response = None
        self.assertEqual(response, mock_response, "Test that companiesByExchange will return the correct data from the API if the response is an error")
    
    @mock.patch("apiCalls.requests.post")
    def test_companiesRevenue_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'{"totalPages": 10,"currentPage": 1,"firstPos": 1,"lastPos": 10,"totalItems": 1401,"results": [{"name": "Apple Inc","simId": 111052,"values": [{"indicatorId": "1-1","value": 102001020},{"indicatorId": "1-1", "value" : "AAPL"}]}]}'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.companiesRevenue("2022")
        mock_response = {'AAPL': 102001020}
        self.assertIsNot(response == None, "Test to see if not None for companiesRevenue")
        self.assertEqual(response, mock_response,
                     "Test that ccompaniesRevenue will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_getSharePriceHistory_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getSharePriceHistory("AAPL", "2022-01-01", "2022-01-30")
        mock_response = {'AAPL': {'2018-01-02': 172.26,'2018-01-03': 172.23,'2018-01-04': 173.03,'2018-01-05': 175}}
        self.assertIsNot(response == None, "Test to see if not None for getSharePriceHistory")
        self.assertEqual(response, mock_response,
                     "Test that getSharePriceHistory will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_getSharePriceHistory_NotFound(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"found":false,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getSharePriceHistory("AAPL", "2022-01-01", "2022-01-30")
        mock_response = {}
        self.assertIsNot(response == None, "Test to see if not None for getSharePriceHistory")
        self.assertEqual(response, mock_response,
                     "Test that getSharePriceHistory will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_getCompanyInformation_NotFound(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"found": false,"columns": ["SimFinId","Ticker","Company Name","IndustryId","Month FY End","Number Employees","summary"],"data": [111052,"AAPL","Apple Inc.",103002,12,132000,"Summary of stock"]}]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getCompanyInformation("AAPL")
        mock_response = None
        self.assertEqual(response, mock_response,
                     "Test that getCompanyInformation will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_getCompanyInformation_Found(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"found": true,"columns": ["SimFinId","Ticker","Company Name","IndustryId","Month FY End","Number Employees","summary"],"data": [111052,"AAPL","Apple Inc.",103002,12,132000,"Summary of stock"]}]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getCompanyInformation("AAPL")
        print(response)
        mock_response = {'Company Name': 'Apple Inc.', 'IndustryID': 103002, 'Summary': 'Summary of stock'}
        self.assertIsNot(response == None, "Test to see if not None for getCompanyInformation")
        self.assertEqual(response, mock_response, "Test that getCompanyInformation will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_finhubInformation_Found(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'{  "country": "US",  "currency": "USD",  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",  "ipo": "1980-12-12",  "marketCapitalization": 1415993,  "name": "Apple Inc",  "phone": "14089961010",  "shareOutstanding": 4375.47998046875,  "ticker": "AAPL",  "weburl": "https://www.apple.com/",  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",  "finnhubIndustry":"Technology"}'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.finhubInformation("AAPL")
        print(response)
        mock_response =  {'Country': 'US',  'Exchange': 'NASDAQ/NMS (GLOBAL MARKET)',  'IPO': '1980-12-12',  'Logo': 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png',  'WebSite': 'https://www.apple.com/'}
        self.assertIsNot(response == None, "Test to see if not None for finhubInformation")
        self.assertEqual(response, mock_response, "Test that finhubInformation will return the correct data from the API response")
    
    @mock.patch("apiCalls.requests.get")
    def test_finhubInformation_Error(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'"error"'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.finhubInformation("AAPL")
        mock_response =  None
        self.assertEqual(response, mock_response, "Test that finhubInformation will return the correct data from the API response if the response returns an error")
    
    @mock.patch("apiCalls.requests.get")
    def test_getNews_Error(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'"error"'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getNews("Forex")
        mock_response =  None
        self.assertEqual(response, mock_response, "Test that getNews will return the correct data from the API response if the response returns an error")
    
    @mock.patch("apiCalls.requests.get")
    def test_getNews_Value(self,mock_get):
        mockResponse = Response()
        mockResponse._content = b'[{"category":"technology","datetime":1596589501,"headline":"Square surges after reporting 64% jump in revenue, more customers using Cash App","id":5085164,"image":"https:\/\/image.cnbcfm.com\/api\/v1\/image\/105569283-1542050972462rts25mct.jpg?v=1542051069","related":"","source":"CNBC","summary":"Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.","url":"https:\/\/www.cnbc.com\/2020\/08\/04\/square-sq-earnings-q2-2020.html"}]'
        mock_get.side_effect = [mockResponse]
    
        response = apiCalls.getNews("Forex")
        print(response)
        mock_response =  [{'date': 1596589501, 'headline': 'Square surges after reporting 64% jump in revenue, more customers using Cash App', 'image': 'https://image.cnbcfm.com/api/v1/image/105569283-1542050972462rts25mct.jpg?v=1542051069', 'source': 'CNBC', 'summary': 'Shares of Square soared on Tuesday evening after posting better-than-expected quarterly results and strong growth in its consumer payments app.', 'url': 'https://www.cnbc.com/2020/08/04/square-sq-earnings-q2-2020.html'}]
    
        self.assertIsNot(response == None, "Test to see if not None for getNews")
        self.assertEqual(response, mock_response, "Test that getNews will return the correct data from the API response")


