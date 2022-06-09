import apiCalls
from datetime import datetime,timedelta
class ETF:

    stocksConfirmedIn = []
    stocksWithAmountOFShares = {}
    totalInvested = 0
    def __init__(self,UserID, etfID, rules, date, amount):
        self.UserID = UserID
        self.etfIF = etfID
        self.rules = rules
        self.amount = amount
        if date == None:
            self.date = datetime.strftime(datetime.now() - timedelta(2),'%Y-%m-%d')
        else:
            self.date = date
        self.listOfAllStocks = []
        self.priorityTwoRules = []


    def createETF(self):

        self.prioritizeRules()

        self.listOfAllStocks = apiCalls.listallcompanies()


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

        self.calculateAmountoFstocks(self.listOfAllStocks,50)
        print(self.totalInvested)
        print(self.stocksWithAmountOFShares)






    def code000(self,ticker):
        # First we will now remove the stock in this particular moment
        newListOFstocks = []
        for x in self.listOfAllStocks:
            if x!=ticker:
                newListOFstocks.append(x)

        self.listOfAllStocks = newListOFstocks

    def code101(self, ticker):
            #First we want to check if the stock exists
            allStocksThatExists = apiCalls.listallcompanies()
            if ticker in allStocksThatExists:
                self.stocksConfirmedIn.append(ticker)
            else:
                print("Stock Doesn't Exist")
                # So we will need to return some way of saying that this stock doesnt exist

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

    def code001_002(self, idValue):
        stocksToReject = apiCalls.CompaniesByIndustry(idValue)
        tempStocks = self.listOfAllStocks.copy()
        for x in stocksToReject:
            if x in tempStocks:
                tempStocks.remove(x)

        self.listOfAllStocks = tempStocks

    def code102_103(self,idValue, percentage):
        stocksInSector = apiCalls.CompaniesByIndustry(idValue)
        stocksInBoth = []
        for x in stocksInSector:
            if x in self.listOfAllStocks:
                stocksInBoth.append(x)

        self.calculateAmountoFstocks(stocksInBoth,percentage)




    def calculateAmountoFstocks(self, stocks, percentage):
        percent = percentage / 100
        moneyToInvest = self.amount * percent
        stockAndAmount = {}

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
            # Reject by country
            # The country is our only parameter
        elif code == "010":
            amountOfCompanies = parameters[0]
            # Minimum amount of companies to invest into
            # The amount is our only parameter
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
            Percentage = parameters[1]
            self.code101(ticker)
            # companies by name or ticker.
        elif code == "102":
            SectorID = parameters[0]
            Percentage = parameters[1]
            amountOfCompanies = parameters[2]
            self.code102_103(SectorID,Percentage)
            # percentage in a specific sector
        elif code == "103":
            industryID = parameters[0]
            Percentage = parameters[1]
            amountOfCompanies = parameters[2]
            self.code102_103(industryID, Percentage)
            # percentage in a specific industry
        elif code == "104":
            percentage = parameters[0]
            amountOfCompanies = parameters[1]
            # companies with the highest market cap
        elif code == "105":
            country = parameters[0]
            percentage = parameters[1]
            amountOfCompanies = parameters[2]
            # companies based in specific countries
        elif code == "106":
            percentage = parameters[0]
            amountOfCompanies = parameters[1]
            # companies with the highest revenue
        elif code == "200":
            balancePeriodInWeeks = parameters[0]
            # balance period and/or balance threshold percentage
        elif code == "201":
            percentageDrop = parameters[0]
            # percentage that a stock can drop before the ETF sells the stock automatically
        elif code == "202":
            reconsiderPeriodInWeeks = parameters[0]
            # time period in which it must reconsider its stocks

    def prioritizeRules(self):
        #Still need to implement a bit more here, This is just a first Glance
        newRuleList = []
        countPrioritize = 0
        while len(newRuleList) != len(self.rules):
            for rule in self.rules:
                code = rule[0]
                parameters = rule[1]
                if countPrioritize == 0:
                    if code == "000" or code == "101" or code == "001" or code == "002" or code == "003":
                        newRuleList.append(rule)
                if countPrioritize == 1:
                    if code == "011" or code == "012" or code == "013" or code == "104":
                        newRuleList.append(rule)
                if countPrioritize == 3:
                    if code == "102" or code == "103" or code == "105":
                        newRuleList.append(rule)
            countPrioritize = countPrioritize +1

        self.rules = newRuleList