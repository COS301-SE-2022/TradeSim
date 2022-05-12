import operator

import IndustrySector
import SimFinAPI
import FinnhubAPI


if __name__ == '__main__':
    DictionaryOfSectors = IndustrySector.getFile()
    comp = SimFinAPI.CompaniesByIndustry(101002)
    myDictionary = {}
    for name in comp:
        myDictionary[name] = FinnhubAPI.getQuote(name)

    namePercentage = {}
    for x in myDictionary:
        namePercentage[x] = myDictionary[x][1]

    StocksToUse = dict(sorted(namePercentage.items(), key = operator.itemgetter(1), reverse= True)[:10])
    totalPrice = 0
    print("Stocks: ")
    for names in StocksToUse:
        totalPrice = totalPrice + myDictionary[names][0]
        print(names)

    adjustedPrice = totalPrice/len(StocksToUse)
    print("Price of all 10 Stocks: ")
    print(adjustedPrice)

    priceForFortyPercent = adjustedPrice*0.4
    print("Price for 40% of Stock: ")
    print(priceForFortyPercent)

    # listOfAllCompanies = listallcompanies()
