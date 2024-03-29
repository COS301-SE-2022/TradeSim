import requests
from dbpass import *
from datetime import datetime


api_key =  getapi()

def listallcompanies():
    request_url = 'https://simfin.com/api/v2/companies/list'

    parameters = {"api-key": api_key}

    responseListAllCompanies = requests.get(request_url, parameters)
    if responseListAllCompanies == None:
        return None

    data = responseListAllCompanies.json()
    listComp = []
    if "error" in data:
        return None
    size = len(data['data'])
    for x in range(size):
        listComp.append(data['data'][x])


    onlyTicker = []
    for x in listComp:
        onlyTicker.append(x[1])

    return onlyTicker

def getShareMarketEarn(t,date):
    allStocksDetails = {}
    startDay = date
    endDay = getEndDay(date)
    tickers = t



    arrayOfArrayOfTickers = []
    shortArrayOftickers = []
    toSize = 0
    tempCount = 0
    for x in tickers:
        shortArrayOftickers.append(x)
        if toSize==799:
            toSize = 0
            arrayOfArrayOfTickers.append(shortArrayOftickers)
            shortArrayOftickers = []
            tempCount = tempCount+1
        toSize = toSize +1

    arrayOfArrayOfTickers.append(shortArrayOftickers)

    for tick in arrayOfArrayOfTickers:
        request_url = 'https://simfin.com/api/v2/companies/prices'
        parameters = {"ticker": ",".join(tick), "start": startDay, "end": endDay, "api-key": api_key,
                      "ratios": ""}
        request = requests.get(request_url, parameters)
        all_data = request.json()


        for response_index, data in enumerate(all_data):
            # make sure that data was found
            if data['found'] and len(data['data']) > 0:
                columns = data['columns']
                tickerPos = -1
                marketCapPos = -1
                SharePricePos = -1
                EVPos = -1
                earningsPos = -1
                count = 0
                for x in columns:
                    if x == "Ticker":
                        tickerPos = count
                    if x == "Market-Cap":
                        marketCapPos = count
                    if x == "Close":
                        SharePricePos = count
                    if x == "Enterprise Value (ttm)":
                        EVPos = count
                    if x == "EV/EBITDA (ttm)":
                        earningsPos = count
                    count = count+1
                firstArray = data['data'][0]
                nameOFstock = firstArray[tickerPos]
                marketCap = firstArray[marketCapPos]
                sharePrice = firstArray[SharePricePos]
                Ev = firstArray[EVPos]
                earnCalc = firstArray[earningsPos]
                earningBefore = None
                if Ev != None and earnCalc != None:
                    if(earnCalc == 0):
                        break
                    earningBefore = float(Ev)/float(earnCalc)


                parameters = [sharePrice,marketCap,earningBefore]
                allStocksDetails[nameOFstock] = parameters

    return allStocksDetails

def companiesByIndustry(value):
    #This function will return the symbols of the comapnies in a industry or Sector
    request_url = 'https://simfin.com/api/v2/finder?api-key=' + api_key
    meta = {"id": 7, "value": 2022, "operator": "eq"}
    condition = {"operator": "start", "value": value}



    meta1 = {"id": 7, "value": 2022, "operator": "eq"}
    condition1 = {"operator": "diff", "value": 0}
    search = [{"indicatorId": "0-73", "meta": [meta], "condition": condition},
              {"indicatorId": "0-71", "meta": [meta1], "condition": condition1}]
    parameters = {"search": search, "resultsPerPage": 0}
    request = requests.post(request_url, json=parameters)
    data = request.json()
    listOfSymbols = []
    for x in data['results']:
        each = x['values'][1]
        listOfSymbols.append(each['value'])

    return listOfSymbols

def getCountry(tickers):
    finHubApi = getFinHubApi()
    request_url4 = "https://finnhub.io/api/v1/stock/profile2?"
    stocksWithCountry = {}
    for x in tickers:

        api_request4 = requests.get(request_url4, params={'symbol': x, 'token': finHubApi})
        response4 = api_request4.json()
        if len(response4)!=0:
            country = response4['country']
            stocksWithCountry[x] = country
        else:
            stocksWithCountry[x] = None

    return stocksWithCountry

def getEndDay(date):
    strDate = date.split('-')
    year = strDate[0]
    month = strDate[1]
    day = strDate[2]

    intYear = int(year)
    intMonth = int(month)
    intDay = int(day)

    newYear = intYear
    newMonth = intMonth
    newDay = intDay+4

    arrayOf31Days = [1,3,5,7,8,10,12]
    if intMonth in arrayOf31Days:
        if newDay>31:
            newDay = newDay-31
            newMonth = newMonth+1
    else:
        if newMonth == 2:
            if newDay>28:
                newDay = newDay-28
                newMonth = newMonth+1
        else:
            if newDay > 30:
                newDay = newDay -30
                newMonth = newMonth+1

    if newMonth == 13:
        newMonth = 1
        newYear = newYear+1

    strNewMonth= str(newMonth)
    strNewDay = str(newDay)
    if len(strNewMonth) == 1:
        strNewMonth = "0"+strNewMonth
    if len(strNewDay) == 1:
        strNewDay = "0" + strNewDay

    strDate = str(newYear)+"-"+strNewMonth+"-"+strNewDay
    return strDate

def companiesByExchange(country):
    #This function will get companies that are based in specific exchnages in respected countries
    request_url = "https://finnhub.io/api/v1/stock/symbol?exchange=" + country + "&token="

    api_request = requests.get(request_url + getFinHubApi())
    response = api_request.json()

    if "error" in response:
        return None

    listOFComanies = []
    # for x in response:
    #     temp = x["symbol"]
    #     str = temp.split(".")
    #     sym = str[0]
    #     listOFComanies.append(sym)

    for x in response:
        temp = x["symbol"]
        listOFComanies.append(temp)


    return listOFComanies

def companiesRevenue(year):
    #This function will return the symbols of the comapnies in a industry or Sector
    request_url = 'https://simfin.com/api/v2/finder?api-key=' + api_key
    meta = {"id": 7, "value": year, "operator": "eq"}
    condition = {"operator": "bt", "value": 10000}

    meta1 = {"id": 7, "value": 2022, "operator": "eq"}
    condition1 = {"operator": "diff", "value": 0}
    search = [{"indicatorId": "1-1", "meta": [meta], "condition": condition},
              {"indicatorId": "0-71", "meta": [meta1], "condition": condition1}]
    parameters = {"search": search, "resultsPerPage": 0}
    request = requests.post(request_url, json=parameters)
    data = request.json()
    listOfSymbols = {}
    for x in data['results']:
        value = x["values"]
        revenue = value[0]["value"]
        ticker = value[1]["value"]
        listOfSymbols[ticker] = revenue

    return listOfSymbols

def getSharePriceHistory(t,date,endDate):
    allStocksDetails = {}
    startDay = date
    endDay = endDate
    tickers = t



    arrayOfArrayOfTickers = []
    shortArrayOftickers = []
    toSize = 0
    tempCount = 0
    for x in tickers:
        shortArrayOftickers.append(x)
        if toSize==50:
            toSize = 0
            arrayOfArrayOfTickers.append(shortArrayOftickers)
            shortArrayOftickers = []
            tempCount = tempCount+1
        toSize = toSize +1

    arrayOfArrayOfTickers.append(shortArrayOftickers)

    allStocksDetails = {}

    for tick in arrayOfArrayOfTickers:
        if len(tick) != 0:
            request_url = 'https://simfin.com/api/v2/companies/prices'
            parameters = {"ticker": ",".join(tick), "start": startDay, "end": endDay, "api-key": api_key,
                          "ratios": ""}
            request = requests.get(request_url, parameters)
            all_data = request.json()

            for response_index, data in enumerate(all_data):
                # make sure that data was found
                if data['found'] and len(data['data']) > 0:
                    dateAndPrice = {}
                    ticker = {}
                    ticker = data['data'][0][1]
                    for d in data['data']:
                        dateGiven = d[2]
                        closingPrice = d[6]
                        dateAndPrice[dateGiven] = closingPrice
                    allStocksDetails[ticker] = dateAndPrice




    return allStocksDetails

def getCompanyInformation(t):

    allStocksDetails = {}

    js = {}


    request_url = 'https://simfin.com/api/v2/companies/general'
    parameters = {"ticker": t,"api-key": api_key}
    responseCompanyInformation = requests.get(request_url, parameters)

    if responseCompanyInformation is None:
        return None

    all_data = responseCompanyInformation.json()



    for response_index, data in enumerate(all_data):
        # make sure that data was found
        if data['found'] and len(data['data']) > 0:
            finalData = data['data']
            ticker = finalData[1]
            companyName = finalData[2]
            industryID = finalData[3]
            summary = finalData[6]

            js = {"Company Name" : companyName, "IndustryID" : industryID, "Summary" : summary}
        else:
            js = None

    return js

def finhubInformation(t):
    request_url = "https://finnhub.io/api/v1/stock/profile2?symbol=" + t + "&token="

    api_request = requests.get(request_url + getFinHubApi())
    response = api_request.json()

    if "error" in response:
        return None


    country = response["country"]
    exchange = response["exchange"]
    ipo = response["ipo"]
    logo = response["logo"]
    website = response["weburl"]
    js = {"Country" : country, "Exchange" : exchange, "IPO" : ipo, "Logo" : logo, "WebSite" : website}
    return js

def getNews(category):
    request_url = "https://finnhub.io/api/v1/news?category=" + category +"&token="

    api_request = requests.get(request_url + getFinHubApi())
    response = api_request.json()

    if "error" in response:
        return None

    listOfNews = []
    for x in response:
        date = x['datetime']
        headline = x['headline']
        image = x['image']
        source = x['source']
        summary = x['summary']
        url = x['url']
        js ={'date' : date, 'headline' : headline, 'image' : image, 'source' : source, 'summary' : summary, 'url' : url}
        listOfNews.append(js)

    return listOfNews

