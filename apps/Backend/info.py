import apiCalls
from datetime import datetime,timedelta
import csv


def stockInformation(ticker):
    simFinInfo = apiCalls.getCompanyInformation(ticker)
    finhubInfo = apiCalls.finhubInformation(ticker)
    #Now we need to connect to that excel document to get the industry
    industryID = str(simFinInfo["IndustryID"])
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

    finalJson = {}
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

    print(finalJson)
    return finalJson
