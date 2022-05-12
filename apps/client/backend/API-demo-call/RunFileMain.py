import operator

import IndustrySector
import SimFinAPI
import FinnhubAPI

Stocks = []

def addToETFByIndustryAndPercentageGain(IndustryID, Percentage, howManyStocks):
    comp = SimFinAPI.CompaniesByIndustry(IndustryID) #If you use a sector and not a industry then the issue comes that the API call will take very long
    if len(comp)<howManyStocks:
        print("There are not enough stocks in this Industry/Sector to create the ETF witht he amount of stocks your required")
        print("Below is how many stocks are in this Industry/Sector: ")
        print(len(comp))
        return None;

    myDictionary = {}
    for name in comp:
        temp = FinnhubAPI.getQuote(name)
        if temp!= None:
            myDictionary[name] = temp

    namePercentage = {}
    for x in myDictionary:
        namePercentage[x] = myDictionary[x][1]

    StocksToUse = dict(sorted(namePercentage.items(), key = operator.itemgetter(1), reverse= True)[:howManyStocks])
    totalPrice = 0

    p = Percentage/howManyStocks
    for names in StocksToUse:
        totalPrice = totalPrice + myDictionary[names][0]
        temp = {names:p}
        Stocks.append(temp)

    adjustedPrice = totalPrice/len(StocksToUse)

    percent = Percentage/100
    priceAccountedForPercent = adjustedPrice*percent


    return priceAccountedForPercent


def addToETFbyTicker(name, percentage):
    quote = FinnhubAPI.getQuote(name)
    if quote == None:
        print("Error no ticker exists")
        return None
    value = quote[0]
    percent = percentage / 100
    temp = {name:percentage}
    Stocks.append(temp)
    priceAccountedForPercent = value * percent

    return priceAccountedForPercent






if __name__ == '__main__':
    #DictionaryOfSectors = IndustrySector.getFile() Use this to get all the industries and secotrs



    total = addToETFByIndustryAndPercentageGain(100006,40,5)
    print("Added airlines")
    total = total + addToETFByIndustryAndPercentageGain(103003,30,20)
    print("Added Restuarants")
    total = total + addToETFByIndustryAndPercentageGain(106005,20,10)
    print("Added Drug Manufacturers")
    total = total + addToETFbyTicker("GOOGL", 10)
    print("Added Google")
    print("ETF Value: ")
    print(str(total) + " USD")

    print("Companies in ETF: ")
    print(Stocks)




