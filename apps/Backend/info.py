import apiCalls
from datetime import datetime,timedelta
import csv


def stockInformation(ticker):
    simFinInfo = apiCalls.getCompanyInformation(ticker)
    if simFinInfo == None:
        allStocks = apiCalls.listallcompanies()
        if len(ticker)<2:
            return {"Found" : "False"}
        beginOfTicker = ticker[:2]
        arrayOfPossible = []
        for stock in allStocks:
            temp = stock[:2]
            if beginOfTicker == temp:
                arrayOfPossible.append(stock)
        js = {"Found" : "False", "PossibleStock" : arrayOfPossible}
        return js
    sym = ticker
    if "." in ticker:
        stings = ticker.split(".")
        sym = stings[0]
    finhubInfo = apiCalls.finhubInformation(sym)
    #Now we need to connect to that excel document to get the industry
    temp = simFinInfo["IndustryID"]
    industryID = str(temp)
    file = open('databases\industries.csv')
    type(file)
    csvreader = csv.reader(file)
    rows = []
    for row in csvreader:
        rows.append(row)

    listOfRows = {}
    for row in rows:
        line = row[0]
        arr = line.split(";")
        listOfRows[arr[0]] = [arr[1],arr[2]]

    sect_indus = listOfRows[industryID]
    sector = sect_indus[0]
    industry = sect_indus[1]

    startDate = "2015-01-01"
    endday = datetime.strftime(datetime.now(), '%Y-%m-%d')
    tickers = []
    tickers.append(ticker)
    stockPrice = apiCalls.getSharePriceHistory(tickers,startDate,endday)

    priceOverTime = stockPrice[ticker]

    finalJson = {"Found" : "True"}
    finalJson["Ticker"] = ticker
    finalJson["Company Name"] = simFinInfo["Company Name"]
    finalJson["Country"] = finhubInfo["Country"]
    finalJson["Exchange"] = finhubInfo["Exchange"]
    finalJson["IPO"] = finhubInfo["IPO"]
    finalJson["Logo"] = finhubInfo["Logo"]
    finalJson["Industry"] = industry
    finalJson["Sector"] = sector
    finalJson["Summary"] = simFinInfo["Summary"]
    finalJson["PriceHistory"] = priceOverTime

    return finalJson

def newsInformation(category):
    if category == "":
        category = "general"
    data = apiCalls.getNews(category)
    if data == None:
        return {"Error" : "No news found"}
    for x in data:
        date = x['date']
        stringDate = datetime.utcfromtimestamp(int(date)).strftime('%Y-%m-%d')
        x['date'] = stringDate

    return data
