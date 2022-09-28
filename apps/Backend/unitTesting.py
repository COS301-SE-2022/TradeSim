from requests.models import Response
from nose.tools import assert_true,assert_equal,assert_in,assert_is_not
from unittest import mock
import info


@mock.patch("apiCalls.requests.get")
def test_stockInformationUnitTest_returnValueNone(mock_get):
    the_response = Response()
    the_response._content = b'{"columns": ["SimFinId","Ticker"],"data": [[111052,"AAPL"],[18,"GOOG"]]}'
    mock_get.side_effect = [None,None,None, the_response]

    response = info.stockInformation("L")
    assert_is_not(response == None, "Test to see if not None for stock")
    assert_equal(response,{"Found" : "False"},"Test for correct response with ticker length being less than 2")

    response = info.stockInformation("AAPL")
    known_Results = {"Found" : "False", "PossibleStock" : ["AAPL"]}
    assert_is_not(response == None, "Test to see if not None for stock")
    assert_equal(response, known_Results, "Test for correct response when suggesting possible stocks")

@mock.patch("apiCalls.requests.get")
def test_stockInformationUnitTest_returnValueStockValue(mock_get):
    the_response1 = Response()
    the_response2 = Response()
    the_response3 = Response()
    the_response1._content = b'[{"found": true,"columns": ["SimFinId","Ticker","Company Name","IndustryId","Month FY End","Number Employees", "Summary"],"data": [111052,"AAPL","Apple Inc.",103002,12,132000,"Summary Of Apple Inc."]}]'
    the_response2._content = b'{  "country": "US",  "currency": "USD",  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",  "ipo": "1980-12-12",  "marketCapitalization": 1415993,  "name": "Apple Inc",  "phone": "14089961010",  "shareOutstanding": 4375.47998046875,  "ticker": "AAPL",  "weburl": "https://www.apple.com/",  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",  "finnhubIndustry":"Technology"}'
    the_response3._content = b'[{"found":true,"currency":"USD","columns":["SimFinId","Ticker","Date","Open","High","Low","Close","Adj. Close","Volume","Dividend","Common Shares Outstanding","Market-Cap","Price to Earnings Ratio (quarterly)","Price to Earnings Ratio (ttm)","Price to Sales Ratio (quarterly)","Price to Sales Ratio (ttm)","Price to Book Value (ttm)","Price to Free Cash Flow (quarterly)","Price to Free Cash Flow (ttm)","Enterprise Value (ttm)","EV\/EBITDA (ttm)","EV\/Sales (ttm)","EV\/FCF (ttm)","Book to Market Value (ttm)","Operating Income\/EV (ttm)"],"data":[[1,"AAPL","2018-01-02",170.16,172.3,169.26,172.26,167.19,25048048,null,74479319,12829807491,1206.04641,141.24911,36.93194,7.85357,14.33984,164.91272,303.97766,13398247491,69.55648,8.70792,337.04587,0.06568,"0.01132"],[1,"AAPL","2018-01-03",172.53,174.55,171.96,172.23,167.17,28819653,null,74479319,12827573111,1205.83637,141.22451,36.92551,7.85221,14.33734,164.884,303.92472,13396013111,69.54488,8.70647,336.98966,0.06569,"0.01132"],[1,"AAPL","2018-01-04",172.54,173.47,172.08,173.03,167.94,22211345,null,74479319,12887156567,1211.43743,141.88049,37.09703,7.88868,14.40393,165.64988,305.33644,13455596567,69.85421,8.7452,338.48854,0.06539,"0.01127"],[1,"AAPL","2018-01-05",173.44,175.37,173.05,175,169.85,23016177,null,74479319,13033880825,1225.23001,143.49584,37.51939,7.97849,14.56793,167.53586,308.81279,13602320825,70.61592,8.84056,342.17953,0.06465,"0.01115"]]}]'
    mock_get.side_effect = [the_response1, the_response2, the_response3]
    response = info.stockInformation("AAPL")
    known_Result = {'Found': 'True', 'Ticker': 'AAPL', 'Company Name': 'Apple Inc.', 'Country': 'US', 'Exchange': 'NASDAQ/NMS (GLOBAL MARKET)', 'IPO': '1980-12-12', 'Logo': 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png', 'Industry': 'Retail - Apparel & Specialty', 'Sector': 'Consumer Cyclical', 'Summary': 'Summary Of Apple Inc.', 'PriceHistory': {'2018-01-02': 172.26, '2018-01-03': 172.23, '2018-01-04': 173.03, '2018-01-05': 175}}
    assert_is_not(response == None, "Test to see if not None for stock")
    assert_equal(response, known_Result, "Test for correct response when suggesting possible stocks")

@mock.patch("apiCalls.requests.get")
def test_newsInformation_returnValueNone(mock_get):
    mockResponse = Response()
    mockResponse._content = b'{"error":"error"}'
    mock_get.side_effect = [mockResponse]
    response = info.newsInformation("forex")
    assert_is_not(response == None, "Test to see if not None for stock")
    assert_equal(response, "{'Error': 'No news found'}", "Test for correct response when suggesting possible stocks")