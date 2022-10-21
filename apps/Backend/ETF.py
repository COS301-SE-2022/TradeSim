import random
import apiCalls
from datetime import datetime,timedelta
class ETF:

    def __init__(self,userID, etfID, rules, date, amount):
        self.userID = userID
        self.etfID = etfID
        self.rules = rules
        self.amount = amount
        self.now = False
        if date == "":
            self.now = True
            self.date = datetime.strftime(datetime.now() - timedelta(2),'%Y-%m-%d')
        else:
            self.date = datetime.strptime(date,'%Y-%m-%d')
            self.date = datetime.strftime(self.date,'%Y-%m-%d')
        self.listOfAllStocks = []
        self.stocksConfirmedIn = {}
        self.priorityTwoRules = []
        self.bnfirmedIn = {}
        self.stocksWithAmountOFShares = {}
        self.totalInvested = 0
        self.c200 = {}
        self.arrayOfRulesWithPercentage = []


    def createETF(self):

        self.prioritizeRules()

        self.listOfAllStocks = apiCalls.listallcompanies()
        if self.listOfAllStocks == None:
            return None


        for x in self.rules:
            code = x[0]
            parameters = x[1]
            if code == "102" or code == "103" or code == "105":
                break # Need to stop the programn before it reaches third priority to call or the second priority in one call
            self.convertCodeToEtf(code,parameters)
        #The Best Thing to Do is run all the second Rule priorities by Themselves
        self.code011_012_013(self.priorityTwoRules)

        for x in self.rules:
            code = x[0]
            parameters = x[1]
            if code == "102" or code == "103" or code == "105":
                self.convertCodeToEtf(code,parameters) #Now run all the third priorities



        for indevidualStock in self.stocksConfirmedIn:
            percent = self.stocksConfirmedIn[indevidualStock]
            arrayS = [indevidualStock]
            self.calculateAmountoFstocks(arrayS,percent)

        howMuchMoneyLeft = self.totalInvested/self.amount
        percentToAdd = (1-howMuchMoneyLeft)*100

        random.seed(6)
        endPos = len(self.listOfAllStocks) - 1
        listOfPos = []
        if endPos <= 29:
            for i in range(endPos + 1):
                listOfPos.append(i)
        else:
            listOfPos = random.sample(range(0, endPos), 30)
        stocksOnlyOneFinal = []
        for pos in listOfPos:
            stocksOnlyOneFinal.append(self.listOfAllStocks[pos])

        self.calculateAmountoFstocks(stocksOnlyOneFinal,percentToAdd)

        temp = {}
        for y in self.stocksWithAmountOFShares:
            if self.stocksWithAmountOFShares[y]!= 0:
                temp[y] = self.stocksWithAmountOFShares[y]

        self.stocksWithAmountOFShares = temp

        return self.stocksWithAmountOFShares




    def code000(self,ticker):
        # First we will now remove the stock in this particular moment
        newListOFstocks = []
        for x in self.listOfAllStocks:
            if x!=ticker:
                newListOFstocks.append(x)

        self.listOfAllStocks = newListOFstocks

    def code101(self, ticker, percent):
            #First we want to check if the stock exists
            allStocksThatExists = apiCalls.listallcompanies()
            if ticker in allStocksThatExists:
                if ticker in self.stocksConfirmedIn:
                    alreadypercent = self.stocksConfirmedIn[ticker]
                    self.stocksConfirmedIn[ticker] = (percent + alreadypercent)
                else:
                    self.stocksConfirmedIn[ticker] = percent
            else:
                print("Stock Doesn't Exist")
                # So we will need to return some way of saying that this stock doesnt exist this will be a error code

    def code011_012_013(self,rule):
        finalStocks = []
        stockInformation = apiCalls.getShareMarketEarn(self.listOfAllStocks, self.date)
        tempStocks = stockInformation.copy()
        for x in rule:
            code = x[0]
            min = int(x[1])
            max = int(x[2])
            if code == "011":
                # MarketCap
                for stock in stockInformation:
                    parameters = stockInformation[stock]
                    marketCap = parameters[1]
                    if marketCap!= None:
                        if marketCap<min or marketCap>max:
                            if stock in tempStocks:
                                tempStocks.pop(stock)
            if code == "012":
                #Earning
                for stock in stockInformation:
                    parameters = stockInformation[stock]
                    earning = parameters[2]
                    if earning!= None:
                        if earning<min or earning>max:
                            if stock in tempStocks:
                                tempStocks.pop(stock)
            if code == "013":
                #SharePrice
                for stock in stockInformation:
                    parameters = stockInformation[stock]
                    share = parameters[0]
                    if share!= None:
                        if share<min or share>max:
                            if stock in tempStocks:
                                tempStocks.pop(stock)

        for name in tempStocks:
            finalStocks.append(name)
        self.listOfAllStocks = finalStocks

    def code104(self, percentage, amountOfCompanies):
        stockInformation = apiCalls.getShareMarketEarn(self.listOfAllStocks, self.date)
        stocksWithMarketCap = {}
        for stock in stockInformation:
            parameters = stockInformation[stock]
            marketCap = parameters[1]
            if marketCap != None:
                stocksWithMarketCap[stock] = marketCap
        sortedStocks = sorted(stocksWithMarketCap.items(),key=lambda x:x[1],reverse = True)
        #So now we have the stocks with the highest market cap we now need to get their share price, which we already have
        indivdual = percentage/amountOfCompanies

        count = 0
        for stock in sortedStocks:
            if count ==amountOfCompanies:
                break
            if stock[0] in self.stocksConfirmedIn:
                alreadyPercent = self.stocksConfirmedIn[stock[0]]
                self.stocksConfirmedIn[stock[0]] =  (alreadyPercent + indivdual)
            else:
                self.stocksConfirmedIn[stock[0]] = indivdual
            count = count+1


    def code106(self, percentage, amountOfCompanies):
        strDate = self.date.split('-')
        indivdual = percentage / amountOfCompanies
        year = strDate[0]
        stockInformation = apiCalls.companiesRevenue(year)
        count = 0
        for stock in stockInformation:
            if count == amountOfCompanies:
                break
            if stock in self.stocksConfirmedIn:
                alreadyPercent = self.stocksConfirmedIn[stock]
                self.stocksConfirmedIn[stock] = (alreadyPercent + indivdual)
            else:
                self.stocksConfirmedIn[stock] = indivdual
            count = count + 1




    def code001_002(self, idValue):
        stocksToReject = apiCalls.companiesByIndustry(idValue)

        tempStocks = self.listOfAllStocks.copy()
        for x in stocksToReject:
            if x in tempStocks:
                tempStocks.remove(x)
        self.listOfAllStocks = tempStocks

    def code102_103(self,idValue, percentage):
        stocksInSector = apiCalls.companiesByIndustry(idValue)
        stocksInBoth = []
        for x in stocksInSector:
            if x in self.listOfAllStocks:
                stocksInBoth.append(x)

        random.seed(6)
        endPos = len(stocksInBoth) - 1
        listOfPos = []
        if endPos <= 19:
            for i in range(endPos + 1):
                listOfPos.append(i)
        else:
            listOfPos = random.sample(range(0, endPos), 20)
        stocksOnlyOneFinal = []
        for pos in listOfPos:
            stocksOnlyOneFinal.append(stocksInBoth[pos])
        self.calculateAmountoFstocks(stocksOnlyOneFinal,percentage)

    def code105(self, country, percentage):
        stocksInExchange = apiCalls.companiesByExchange(country)
        stocksInBoth = []
        if stocksInExchange == None:
            return None
        for x in stocksInExchange:
            if x in self.listOfAllStocks:
                stocksInBoth.append(x)

        random.seed(6)
        endPos = len(stocksInBoth) - 1
        listOfPos = []
        if endPos <= 19:
            for i in range(endPos + 1):
                listOfPos.append(i)
        else:
            listOfPos = random.sample(range(0, endPos), 20)
        stocksOnlyOneFinal = []
        for pos in listOfPos:
            stocksOnlyOneFinal.append(stocksInBoth[pos])

        self.calculateAmountoFstocks(stocksOnlyOneFinal, percentage)

    def code003(self,country):
        companiesToReject = apiCalls.companiesByExchange(country)
        tempStocks = self.listOfAllStocks.copy()
        if companiesToReject != None:
            for x in companiesToReject:
                if x in tempStocks:
                    tempStocks.remove(x)

        self.listOfAllStocks = tempStocks



    def calculateAmountoFstocks(self, stocks, percentage):
        percent = percentage / 100
        moneyToInvest = self.amount * percent
        stockAndAmount = {}
        if len(stocks) == 0:
            return None
        valuesForSaidStocks = apiCalls.getShareMarketEarn(stocks, self.date)
        totalInvested = 0
        canAddMore = True
        for x in valuesForSaidStocks:
            stockAndAmount[x] = 0
#            Create all the stocks and show it has 0 bought stocks

        while canAddMore!=False:
            testTime = totalInvested
            for stock in valuesForSaidStocks:
                parameters = valuesForSaidStocks[stock]
                sharePrice = parameters[0]
                if sharePrice>0:
                    temp = totalInvested + sharePrice
                    if temp <= moneyToInvest:
                        totalInvested = totalInvested + sharePrice
                        amountStock = stockAndAmount[stock]
                        amountStock = amountStock+1
                        stockAndAmount[stock] = amountStock
            if testTime == totalInvested:
                canAddMore = False #The totalInvested Hasn't Changed at all so we can't add more stocks so need to fix that
        self.totalInvested = self.totalInvested + totalInvested


        for p in stockAndAmount:
            if p in self.stocksWithAmountOFShares:
                temp = self.stocksWithAmountOFShares[p]
                temp = temp + stockAndAmount[p]
                self.stocksWithAmountOFShares[p] = temp
            else:
                self.stocksWithAmountOFShares[p] = stockAndAmount[p]


    def cleanUpStocks(self):

        removeSingStocks = {}
        listOfValueStocks = []
        stocksOnlyOne = []

        for x in self.stocksWithAmountOFShares:
            if self.stocksWithAmountOFShares[x] > 1:
                removeSingStocks[x] = self.stocksWithAmountOFShares[x]
                listOfValueStocks.append(x)
            else:
                if "old" in x:
                    stocksOnlyOne = stocksOnlyOne
                else:
                    stocksOnlyOne.append(x)

        random.seed(53)
        endPos = len(stocksOnlyOne)-1
        listOfPos = []
        if endPos<=19:
            for i in range(endPos+1):
                listOfPos.append(i)
        else:
            listOfPos = random.sample(range(0,endPos),20)
        stocksOnlyOneFinal = []
        for pos in listOfPos:
            stock = stocksOnlyOne[pos]
            removeSingStocks[stock] = 1
            stocksOnlyOneFinal.append(stock)
            listOfValueStocks.append(stock)


        valuesForSaidStocks = apiCalls.getShareMarketEarn(listOfValueStocks, self.date)
        totalInvested = 0
        for x in removeSingStocks:
            parameters = valuesForSaidStocks[x]
            sharePrice = parameters[0]
            amountInvestedInEachStock = sharePrice*removeSingStocks[x]
            totalInvested = totalInvested + amountInvestedInEachStock

        moneyLeft = self.amount-totalInvested
        noMoreMoNEY = False
        tempMoney = 0
        while noMoreMoNEY==False:
            tempMoney = moneyLeft
            for stock in stocksOnlyOneFinal:
                parameters = valuesForSaidStocks[stock]
                sharePrice = parameters[0]
                temp = moneyLeft-sharePrice
                if temp>0:
                    moneyLeft = temp
                    removeSingStocks[stock] = removeSingStocks[stock]+1

            if tempMoney == moneyLeft:
                noMoreMoNEY = True


        totalInvested1 = 0
        for x in removeSingStocks:
            parameters = valuesForSaidStocks[x]
            sharePrice = parameters[0]
            amountInvestedInEachStock = sharePrice * removeSingStocks[x]
            totalInvested1 = totalInvested1 + amountInvestedInEachStock


        self.stocksWithAmountOFShares = removeSingStocks
        self.totalInvested = totalInvested1






    def convertCodeToEtf(self,code, parameters):
        # In here we will have many switch statements when we get the code and its parameters in order to know what to do with it
        if code == "000":
            ticker = parameters[0]
            self.code000(ticker)
            # Reject by specific companies
            # The ticker is our only parameter
        elif code == "001":
            sectorID = parameters[0]
            self.code001_002(sectorID)
            # Reject by specific Sector
            # The sectorID is our only parameter
        elif code == "002":
            industryID = parameters[0]
            self.code001_002(industryID)
            # Reject by IndustryID
            # The industryID is our only parameter
        elif code == "003":
            country = parameters[0]
            self.code003(country)
            # Reject by Country exchange
            # The country is our only parameter
        elif code == "011":
            minMarketCap = parameters[0]
            maxMarketCap = parameters[1]
            rule = [code,minMarketCap,maxMarketCap]
            self.priorityTwoRules.append(rule)
            #Here we add to the priority two rules so we only have to do one call

            # Market cap Min and Max
            # The min and max market Cap is our only parameter
        elif code == "012":
            minEarnings = parameters[0]
            maxEarnings = parameters[1]
            rule = [code, minEarnings, maxEarnings]
            self.priorityTwoRules.append(rule)
            # Here we add to the priority two rules so we only have to do one call

            # Earnings Min and Max
            # The min and max earning is our only parameter
        elif code == "013":
            minPrice = parameters[0]
            maxPrice = parameters[1]
            rule = [code, minPrice, maxPrice]
            self.priorityTwoRules.append(rule)
            # Here we add to the priority two rules so we only have to do one call

            # Price Min and Max
            # The min and max price is our only parameter
        elif code == "101":
            ticker = parameters[0]
            Percentage = int(parameters[1])
            self.code101(ticker, Percentage)
            # companies by name or ticker.
        elif code == "102":
            SectorID = parameters[0]
            Percentage = int(parameters[1])
            amountOfCompanies = parameters[2]
            self.code102_103(SectorID,Percentage)
            js =  ["102",SectorID, Percentage]
            self.arrayOfRulesWithPercentage.append(js)
            # percentage in a specific sector
        elif code == "103":
            industryID = parameters[0]
            Percentage = int(parameters[1])
            amountOfCompanies = parameters[2]
            self.code102_103(industryID, Percentage)
            js = ["103",industryID,Percentage]
            self.arrayOfRulesWithPercentage.append(js)
            # percentage in a specific industry
        elif code == "104":
            percentage = int(parameters[0])
            amountOfCompanies = int(parameters[1])
            self.code104(percentage, amountOfCompanies)
            # companies with the highest market cap
        elif code == "105":
            country = parameters[0]
            percentage = int(parameters[1])
            amountOfCompanies = parameters[2]
            self.code105(country,percentage)
            js =  ["105",country, percentage]
            self.arrayOfRulesWithPercentage.append(js)
            # companies based in specific countries exchange
        elif code == "106":
            percentage = int(parameters[0])
            amountOfCompanies = int(parameters[1])
            self.code106(percentage,amountOfCompanies)
            # companies with the highest revenue
        elif code == "200":
            balancePeriodInWeeks = int(parameters[0])
            self.c200["200"] = balancePeriodInWeeks
            # balance period and/or balance threshold percentage
        elif code == "202":
            reconsiderPeriodInWeeks = int(parameters[0])
            self.c200["202"] = reconsiderPeriodInWeeks
            # time period in which it must reconsider its stocks

    def prioritizeRules(self):
        #Still need to implement a bit more here, This is just a first Glance
        #We can even make this abit more dynamic by having array of all the codes for the roles
        newRuleList = []
        countPrioritize = 0
        while len(newRuleList) != len(self.rules):
            for rule in self.rules:
                code = rule[0]
                parameters = rule[1]
                if countPrioritize == 0:
                    if code == "000" or code == "101" or code == "001" or code == "002" or code == "003" or code == "104" or code == "106" or code == "200" or code == "202":
                        newRuleList.append(rule)
                if countPrioritize == 1:
                    if code == "011" or code == "012" or code == "013":
                        newRuleList.append(rule)
                if countPrioritize == 3:
                    if code == "102" or code == "103" or code == "105":
                        newRuleList.append(rule)
            countPrioritize = countPrioritize +1

        self.rules = newRuleList

    def code200(self,time):
        toReturn = {}
        collectionOfVlaues = {}
        collectionOfStocks = {}
        totalCashOverflow = {}
        cashOverflow = 0
        listOfDates = []
        reachedDate = False
        timePeriod = time * 7
        startingDate = datetime.strptime(self.date, '%Y-%m-%d')
        dateNow = datetime.now()

        while reachedDate == False:
            if startingDate > dateNow:
                reachedDate = True
                d = datetime.strftime(datetime.now(), '%Y-%m-%d')
                listOfDates.append(d)
            else:
                temp = datetime.strftime(startingDate, '%Y-%m-%d')
                listOfDates.append(temp)
                d = datetime.strftime(startingDate + timedelta(timePeriod), '%Y-%m-%d')
                startingDate = datetime.strptime(d, '%Y-%m-%d')
        length = len(listOfDates)
        newListOfDates = []
        for i in range(length):
            if i == (length - 1):
                break
            else:
                start = listOfDates[i]
                end = listOfDates[i + 1]
                tempDate = datetime.strptime(end, '%Y-%m-%d')
                if (end != datetime.strftime(datetime.now(), '%Y-%m-%d')):
                    end = datetime.strftime(tempDate - timedelta(1), '%Y-%m-%d')
                temp = [start, end]
                newListOfDates.append(temp)
        tempAmount = self.amount
        rulesWithOutBalancing = []
        for rule in self.rules:
            code = rule[0]
            if code != "200" and code != "202":
                rulesWithOutBalancing.append(rule)

        for dates in newListOfDates:
            start = dates[0]
            end = dates[1]
            tempEtf = ETF(self.userID, self.etfID, rulesWithOutBalancing, start, tempAmount)
            tempEtf.createETF()
            data = tempEtf.rebalancingValueForETF(start, end)
            cashOverflow = data['CashOverFlow']
            values = data['Values']
            stockValue = 0
            for x in values:
                stockValue = values[x]
            invested = cashOverflow + stockValue
            tempAmount = invested
            cashOverflow = data['CashOverFlow']
            totalCashOverflow[start] = cashOverflow
            collectionOfStocks[start] = data['Stocks']
            for y in data['Values']:
                collectionOfVlaues[y] = data['Values'][y]

        toReturn["UserID"] = self.userID
        toReturn["ETFid"] = self.etfID
        toReturn["CashOverFlow"] = totalCashOverflow
        toReturn["Stocks"] = collectionOfStocks
        toReturn["Values"] = collectionOfVlaues

        return toReturn

    def code202(self,allDetails,timePeriod):
        #The first thing that needs to be done is to find all the dates according to time periods
        #Then just go through all the stocks to find the matching
        percentageBasedStocks = []
        listOfDates = []
        etfValue = {}
        reachedDate = False
        timePeriod = timePeriod * 7
        startingDate = datetime.strptime(self.date, '%Y-%m-%d')
        dateNow = datetime.now()

        while reachedDate == False:
            if startingDate > dateNow:
                reachedDate = True
                d = datetime.strftime(datetime.now(), '%Y-%m-%d')
                listOfDates.append(d)
            else:
                temp = datetime.strftime(startingDate, '%Y-%m-%d')
                listOfDates.append(temp)
                d = datetime.strftime(startingDate + timedelta(timePeriod), '%Y-%m-%d')
                startingDate = datetime.strptime(d, '%Y-%m-%d')
        length = len(listOfDates)
        newListOfDates = []
        for i in range(length):
            if i == (length - 1):
                break
            else:
                start = listOfDates[i]
                end = listOfDates[i + 1]
                # tempDate = datetime.strptime(end, '%Y-%m-%d')
                # if (end != datetime.strftime(datetime.now(), '%Y-%m-%d')):
                #     end = datetime.strftime(tempDate - timedelta(1), '%Y-%m-%d')
                temp = [start, end]
                newListOfDates.append(temp)
        stockDetails = allDetails["Stocks"]
        cashOverflow = allDetails["CashOverFlow"]

        ###############################################
        # totalPercentageSoFar = 0
        # #Temporary work space
        # justStocks = []
        # for stock in self.stocksConfirmedIn:
        #     percentage = self.stocksConfirmedIn[stock]
        #     js = {percentage : [stock]}
        #     totalPercentageSoFar = totalPercentageSoFar + percentage
        #     percentageBasedStocks.append(js)
        #--Need below
        tempDates = []
        for dateNow in stockDetails:
            tempDates.append(dateNow)
        length = len(tempDates)
        reconsiderDates = []
        for i in range(length):
            if i == (length - 1):
                break
            else:
                start = tempDates[i]
                end = tempDates[i + 1]
                js = [start,end]
            reconsiderDates.append(js)
        # --
        # for dateNow in stockDetails:
        #     stocks = stockDetails[dateNow]
        #     for stock in stocks:
        #         justStocks.append(stock)
        # for rule in self.arrayOfRulesWithPercentage:
        #     if rule[0] == " 105":
        #         country = rule[1]
        #         percentage = rule[2]
        #         stocksThatCount = self.code105ReturnStocks(country)
        #         tempArray = []
        #         for x in stocksThatCount:
        #             if x in justStocks:
        #                 tempArray.append(x)
        #         js = {percentage: tempArray}
        #         totalPercentageSoFar = totalPercentageSoFar + percentage
        #         percentageBasedStocks.append(js)
        #     else:
        #         secOrIndID =  rule[1]
        #         percentage = rule[2]
        #         stocksThatCount = self.code102_103ReturnStocks(secOrIndID)
        #         tempArray = []
        #         for x in stocksThatCount:
        #             if x in justStocks:
        #                 tempArray.append(x)
        #         js = {percentage :tempArray}
        #         totalPercentageSoFar = totalPercentageSoFar + percentage
        #         percentageBasedStocks.append(js)
        #
        #
        # tempJustStocks = justStocks.copy()
        # for stock in justStocks:
        #     for set in percentageBasedStocks:
        #         for per in set:
        #             arrayOfStocks = set[per]
        #             if stock in arrayOfStocks:
        #                 tempJustStocks.remove(stock)
        # left = 100 - totalPercentageSoFar
        # js = {left : tempJustStocks}
        # percentageBasedStocks.append(js)

        # print(percentageBasedStocks)
        # print(allDetails)



        percentageBasedStocks = self.getStockDetialsForRebalancing(stockDetails, self.date)
        updatedDetailsStock = stockDetails.copy()
        updatedAmount = self.amount

        for x in newListOfDates:
            startDate = x[0]
            endDate = x[1]
            if endDate == datetime.strftime(datetime.now(), '%Y-%m-%d'):
                break
            currentDetails = updatedDetailsStock[startDate]
            for dates in tempDates:
                if startDate < dates and endDate>=dates:
                    percentageBasedStocks = self.getStockDetialsForRebalancing(stockDetails, dates)
                    currentDetails = stockDetails[dates].copy()

            info = self.algorithmForRebalncing(percentageBasedStocks,currentDetails,startDate,endDate,updatedAmount)
            newDetails = info[0]
            updatedAmount = info[1]
            cashOverflow[endDate] = info[2]
            updatedDetailsStock[endDate] = newDetails

        sortedStocks = {}
        finalCashOverflow = {}
        for x in sorted(updatedDetailsStock.keys()):
            sortedStocks[x] = updatedDetailsStock[x]
            finalCashOverflow[x] = cashOverflow[x]

        finalDates = []
        for key in sortedStocks:
            finalDates.append(key)
        finalDates.append(datetime.strftime(datetime.now(), '%Y-%m-%d'))

        finalDatesStartEnd = []
        length = len(finalDates)
        for i in range(length):
            if i == (length - 1):
                break
            else:
                start = finalDates[i]
                end = finalDates[i + 1]
                js = [start, end]
                finalDatesStartEnd.append(js)

        for x in finalDatesStartEnd:
            startDate = x[0]
            endDate = x[1]
            blah = self.redefinedGetValues(sortedStocks[startDate], startDate, endDate)
            for y in blah:
                etfValue[y] = blah[y]
        toReturn = {}


            #now we get the value of the stocks now and get what the cash overflow is for now

        #percentageBasedStocks contains all the stocks and the percentage that the group of stocks must make up
        #Only need to do this once and then from there we get the dates and change the amoutn of stocks bought form there


        #Now need to add in the reconsidering part of the rebalacing
        ###############################################
        toReturn["UserID"] = self.userID
        toReturn["ETFid"] = self.etfID
        toReturn["CashOverFlow"] = finalCashOverflow
        toReturn["Stocks"] = sortedStocks
        toReturn["Values"] = etfValue
        return toReturn

    def getStockDetialsForRebalancing(self,stockDetails,date):
        percentageBasedStocks = []
        justStocks = []
        totalPercentageSoFar = 0
        for stock in self.stocksConfirmedIn:
            percentage = self.stocksConfirmedIn[stock]
            js = {percentage: [stock]}
            totalPercentageSoFar = totalPercentageSoFar + percentage
            percentageBasedStocks.append(js)


        stocks = stockDetails[date]
        for stock in stocks:
            justStocks.append(stock)
        for rule in self.arrayOfRulesWithPercentage:
            if rule[0] == " 105":
                country = rule[1]
                percentage = rule[2]
                stocksThatCount = self.code105ReturnStocks(country)
                tempArray = []
                for x in stocksThatCount:
                    if x in justStocks:
                        tempArray.append(x)
                js = {percentage: tempArray}
                totalPercentageSoFar = totalPercentageSoFar + percentage
                percentageBasedStocks.append(js)
            else:
                secOrIndID =  rule[1]
                percentage = rule[2]
                stocksThatCount = self.code102_103ReturnStocks(secOrIndID)
                tempArray = []
                for x in stocksThatCount:
                    if x in justStocks:
                        tempArray.append(x)
                js = {percentage :tempArray}
                totalPercentageSoFar = totalPercentageSoFar + percentage
                percentageBasedStocks.append(js)


        tempJustStocks = justStocks.copy()
        for stock in justStocks:
            for set in percentageBasedStocks:
                for per in set:
                    arrayOfStocks = set[per]
                    if stock in arrayOfStocks:
                        tempJustStocks.remove(stock)
        left = 100 - totalPercentageSoFar
        js = {left : tempJustStocks}
        percentageBasedStocks.append(js)
        return percentageBasedStocks


    def code200_202(self):
        allDetails = {}
        if len(self.c200) == 0:
            return None
        else:
            for rule in self.c200:
                if rule == "200":
                    temp = self.code200(self.c200[rule])
                    # Need to understand that rebalancing of the stock must come after the reconsidering of stocks. As then I will have all the stocks to look at.
                    allDetails = temp
            for rule in self.c200:
                if rule == "202":
                    storeRebalncePeriod = self.c200[rule]
                    self.c200 = {}
                    if len(allDetails) == 0:
                        allDetails = self.getPriceOverTime()
                    allDetails = self.code202(allDetails,storeRebalncePeriod)
        return allDetails

    def algorithmForRebalncing(self,stocksWithPercentage,stocksWithValues,startDate,endDate,amount):
        etfValueByday = {}
        toReturnStocks = {}
        start = startDate
        endday = endDate
        listOfStocks = []
        for stock in stocksWithValues:
            listOfStocks.append(stock)
        stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                etfValueByday[d] = 0
            break

        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                if d in etfValueByday:
                    price = data[d] * stocksWithValues[x]
                    etfValueByday[d] = etfValueByday[d] + price
        firstPrice = 0
        lastPrice = 0
        count = 0
        for x in etfValueByday:
            if count == 0:
                firstPrice = etfValueByday[x]
                count = 7
            lastPrice = etfValueByday[x]
        overflow = amount-firstPrice
        totalToinvest = overflow+lastPrice
        stockYield = {}
        stockWithPrice = {}
        for x in listOfStocks:
            stockWithPrice[x] = 0
            stockYield[x] = 0
        for x in stockInfo:
            data = stockInfo[x]
            count = 0
            for p in data:
                if count == 0:
                    startPrice = data[p]
                    count = 7
                lastPrice = data[p]
            top = lastPrice-startPrice
            if startPrice == 0:
                percentageYield = 0
            else:
                percentageYield = (top/startPrice)*100
            stockYield[x] = percentageYield
            stockWithPrice[x] = lastPrice

        for set in stocksWithPercentage:
            percentage = 0
            stocks = []
            for key in set:
                percentage = key
                stocks = set[key]
            percentToinvest = percentage/100
            amountForSet = percentToinvest*totalToinvest
            for st in stocks:
                valueOfStock = amountForSet-stockWithPrice[st]
                if valueOfStock>=0:
                    toReturnStocks[st] = 1
                    amountForSet = amountForSet -stockWithPrice[st]
                else:
                    toReturnStocks[st] = 0
            arraOfPositiveStocks = []
            arrOfNegativeStocks = []
            for st in stocks:
                if stockYield[st]>0:
                    arraOfPositiveStocks.append(st)
                else:
                    arrOfNegativeStocks.append(st)
            if len(arraOfPositiveStocks) == 0: #If there are no positive stocks need to invest everything, so put all stocks in positiv stocks, to apply rules there
                arraOfPositiveStocks = arrOfNegativeStocks
                arrOfNegativeStocks = []
            if len(arrOfNegativeStocks)!= 0: #if there are negative stocks give them 10% of the value
                tempAmount = 0.1*amountForSet
                canAddMore = True
                soFarInvested = 0
                while canAddMore != False:
                    testTime = soFarInvested
                    for ls in arrOfNegativeStocks:
                        sharePrice = stockWithPrice[ls]
                        temp = soFarInvested + sharePrice
                        if temp <= tempAmount:
                            soFarInvested = soFarInvested + sharePrice
                            amountOfStock = toReturnStocks[ls]
                            amountOfStock = amountOfStock+1
                            toReturnStocks[ls] = amountOfStock
                    if testTime == soFarInvested:
                        canAddMore = False
                amountForSet = amountForSet-soFarInvested

            if len(arraOfPositiveStocks)!=0: #now work with getting mean average any greater than average gets 70%
                addition = 0
                for x in arraOfPositiveStocks:
                    addition = addition + stockYield[x]
                average = addition/(len(arraOfPositiveStocks))
                aboveMean = []
                belowMean = []
                for x in arraOfPositiveStocks:
                    if stockYield[x]>=average:
                        aboveMean.append(x)
                    else:
                        belowMean.append(x)
                if len(belowMean)!=0:
                    tempAmount = 0.4 * amountForSet
                    canAddMore = True
                    soFarInvested = 0
                    while canAddMore != False:
                        testTime = soFarInvested
                        for ls in belowMean:
                            sharePrice = stockWithPrice[ls]
                            temp = soFarInvested + sharePrice
                            if temp <= tempAmount:
                                soFarInvested = soFarInvested + sharePrice
                                amountOfStock = toReturnStocks[ls]
                                amountOfStock = amountOfStock + 1
                                toReturnStocks[ls] = amountOfStock
                        if testTime == soFarInvested:
                            canAddMore = False
                    amountForSet = amountForSet - soFarInvested

                if len(aboveMean)!=0:
                    tempAmount = amountForSet
                    canAddMore = True
                    soFarInvested = 0
                    while canAddMore != False:
                        testTime = soFarInvested
                        for ls in aboveMean:
                            sharePrice = stockWithPrice[ls]
                            temp = soFarInvested + sharePrice
                            if temp <= tempAmount:
                                soFarInvested = soFarInvested + sharePrice
                                amountOfStock = toReturnStocks[ls]
                                amountOfStock = amountOfStock + 1
                                toReturnStocks[ls] = amountOfStock
                        if testTime == soFarInvested:
                            canAddMore = False
                    amountForSet = amountForSet - soFarInvested
        total = 0
        for p in toReturnStocks:
            sharePrice = stockWithPrice[p]
            total = total + (toReturnStocks[p] * sharePrice)

        tempAmount = totalToinvest-total
        canAddMore = True
        soFarInvested = 0
        while canAddMore != False:
            testTime = soFarInvested
            for ls in listOfStocks:
                sharePrice = stockWithPrice[ls]
                temp = soFarInvested + sharePrice
                if temp <= tempAmount:
                    soFarInvested = soFarInvested + sharePrice
                    amountOfStock = toReturnStocks[ls]
                    amountOfStock = amountOfStock + 1
                    toReturnStocks[ls] = amountOfStock
            if testTime == soFarInvested:
                canAddMore = False
        total = 0
        for p in toReturnStocks:
            sharePrice = stockWithPrice[p]
            total = total + (toReturnStocks[p] * sharePrice)
        overFlow = totalToinvest-total
        ls = [toReturnStocks,total,overFlow]
        return ls




    def redefinedGetValues(self,stocks,startDate,endDate):
        etfValueByday = {}
        toReturn = {}
        start = startDate
        endday = endDate
        listOfStocks = []
        for stock in stocks:
            listOfStocks.append(stock)
        stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                etfValueByday[d] = 0
            break

        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                if d in etfValueByday:
                    price = data[d] * stocks[x]
                    etfValueByday[d] = etfValueByday[d] + price

        etfValueByday

        return etfValueByday

    def rebalancingValueForETF(self,startDate,endDate):
        etfValueByday = {}
        toReturn = {}
        start = startDate
        endday = endDate
        listOfStocks = []
        for stock in self.stocksWithAmountOFShares:
            listOfStocks.append(stock)
        stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                etfValueByday[d] = 0
            break

        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                if d in etfValueByday:
                    price = data[d] * self.stocksWithAmountOFShares[x]
                    etfValueByday[d] = etfValueByday[d] + price
        toReturn["UserID"] = self.userID
        toReturn["ETFid"] = self.etfID
        toReturn["CashOverFlow"] = self.amount - self.totalInvested
        toReturn["Stocks"] = self.stocksWithAmountOFShares
        toReturn["Values"] = etfValueByday

        return toReturn

    def wowFactor(self, endDate):
        etfValueByday = {}
        toReturn = {}

        allStocks = []
        for stock in self.stocksWithAmountOFShares:
            allStocks.append(stock)

        cashOverflow = self.amount - self.totalInvested
        percentLeft = (cashOverflow/self.amount)*100
        self.calculateAmountoFstocks(allStocks,percentLeft)

        start = self.date
        endday = endDate
        listOfStocks = []

        for stock in self.stocksWithAmountOFShares:
            listOfStocks.append(stock)
        stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                etfValueByday[d] = 0
            break

        for x in stockInfo:
            data = stockInfo[x]
            for d in data:
                if d in etfValueByday:
                    price = data[d] * self.stocksWithAmountOFShares[x]
                    etfValueByday[d] = etfValueByday[d] + price

        toReturn["Stocks"] = self.stocksWithAmountOFShares
        toReturn["Values"] = etfValueByday

        return toReturn

    def wowFactorOnlyStocks(self):
        etfValueByday = {}
        toReturn = {}

        allStocks = []
        for stock in self.stocksWithAmountOFShares:
            allStocks.append(stock)

        cashOverflow = self.amount - self.totalInvested
        percentLeft = (cashOverflow / self.amount) * 100
        self.calculateAmountoFstocks(allStocks, percentLeft)

        return self.stocksWithAmountOFShares

    def getPriceOverTime(self):
        etfValueByday = {}
        toReturn = {}
        if len(self.c200) == 0:
            if self.now == True:
                # We then need to get history of the stocks from 10 years ago
                start = self.date
                endday = datetime.strftime(datetime.now(), '%Y-%m-%d')
                listOfStocks = []
                for stock in self.stocksWithAmountOFShares:
                    listOfStocks.append(stock)
                stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
                for x in stockInfo:
                    data = stockInfo[x]
                    for d in data:
                        etfValueByday[d] = 0
                    break

                for x in stockInfo:
                    data = stockInfo[x]
                    for d in data:
                        if d in etfValueByday:
                            price = data[d] * self.stocksWithAmountOFShares[x]
                            etfValueByday[d] = etfValueByday[d] + price

                # We need to get the prices of the stocks from now up until today

            else:
                start = self.date
                endday = datetime.strftime(datetime.now(), '%Y-%m-%d')
                listOfStocks = []
                for stock in self.stocksWithAmountOFShares:
                    listOfStocks.append(stock)
                stockInfo = apiCalls.getSharePriceHistory(listOfStocks, start, endday)
                for x in stockInfo:
                    data = stockInfo[x]
                    for d in data:
                        etfValueByday[d] = 0                    

                for x in stockInfo:
                    data = stockInfo[x]
                    for d in data:
                        if d in etfValueByday:
                            price = data[d] * self.stocksWithAmountOFShares[x]
                            etfValueByday[d] = etfValueByday[d] + price

                # We need to get the prices of the stocks from now up until today

            toReturn["UserID"] = self.userID
            toReturn["ETFid"] = self.etfID
            toReturn["CashOverFlow"] = {self.date : self.amount - self.totalInvested}
            collectionOfStocks = {self.date : self.stocksWithAmountOFShares}
            toReturn["Stocks"] = collectionOfStocks
            toReturn["Values"] = etfValueByday
            return toReturn
        else:
            return self.code200_202()

    def code102_103ReturnStocks(self,idValue):
        stocksInSector = apiCalls.companiesByIndustry(idValue)
        stocksInBoth = []
        for x in stocksInSector:
            if x in self.listOfAllStocks:
                stocksInBoth.append(x)


        return stocksInBoth

    def code105ReturnStocks(self, country):
        stocksInExchange = apiCalls.companiesByExchange(country)
        stocksInBoth = []
        for x in stocksInExchange:
            if x in self.listOfAllStocks:
                stocksInBoth.append(x)

        return stocksInBoth
