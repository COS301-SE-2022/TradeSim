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
        else:
            print("Error " + name)

    namePercentage = {}
    for x in myDictionary:
        namePercentage[x] = myDictionary[x][1]

    StocksToUse = dict(sorted(namePercentage.items(), key = operator.itemgetter(1), reverse= True)[:howManyStocks])
    totalPrice = 0
    for names in StocksToUse:
        totalPrice = totalPrice + myDictionary[names][0]
        Stocks.append(names)

    adjustedPrice = totalPrice/len(StocksToUse)

    priceForFortyPercent = adjustedPrice*Percentage


    return priceForFortyPercent









if __name__ == '__main__':
    #DictionaryOfSectors = IndustrySector.getFile() Use this to get all the industries and secotrs
    # total = addToETFByIndustryAndPercentageGain(100006,40,5)
    # print("Done airlines")
    # total = total + addToETFByIndustryAndPercentageGain(103003,30,20)
    # print("Done Restuarants")
    # total = total + addToETFByIndustryAndPercentageGain(106005,20,10)
    # print("Done Drug Manufacturers")
    # print("ETF Value: ")
    # print(str(total) + " USD")
    #
    # print("Companies in ETF: ")
    # print(Stocks)

    FinnhubAPI.BigFunction()


    # listOfAllCompanies = listallcompanies()
