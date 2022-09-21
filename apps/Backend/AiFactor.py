#So we should first start by creating an array of all the rules, then randomly create etfs based of that rule
#The next thing is to find the etf
import random
import apiCalls
import csv
import ETF
from datetime import datetime,timedelta
import numpy as np
import matplotlib.pyplot as plt


class AiFactor:

    def __init__(self,date):
        self.date = date
        self.lstOfRules = ["000", "001", "002", "003", "011", "012", "013", "101", "102", "103", "104", "105", "106"]
        self.seedValue = 81
        self.percentage = 100

    def generateRandomETF(self):
        random.seed(self.seedValue)
        lstAmountOfRules = random.sample(range(1, 10), 1)
        amountOfRules = lstAmountOfRules[0]
        random.seed(amountOfRules)

        #For loop needs to be done as this might allow for repeats where the random function does not allow for repeats
        etfRules = []
        for y in range(4): #This is how many etfs to create
            lstOfRulesToUse = []
            x = 0
            while x < amountOfRules:
                temp = random.sample(range(0, len(self.lstOfRules)), 1)
                # In the following if statement we are removing rules that can't have duplicates
                if temp[0] == 4 or temp[0] == 5 or temp[0] == 6 or temp[0] == 10 or temp[0] == 11 or temp[0] == 12:
                    if temp[0] in lstOfRulesToUse:
                        # rerun the forloop
                        x = x
                    else:
                        lstOfRulesToUse.append(temp[0])
                        x = x+1
                else:
                    lstOfRulesToUse.append(temp[0])
                    x = x+1

            properLst = []
            for code in lstOfRulesToUse:
                properLst.append(self.lstOfRules[code])


            etfRules.append(properLst)

        print(etfRules)
        dictionaryOfETF = {}
        count = 0
        for eachETF in etfRules:
            rules = []
            count = count +1
            self.percentage = 100
            for rule in eachETF:
                if rule == "000":
                    parameters = self.code000()
                    toAdd = [rule,parameters]
                    rules.append(toAdd)
                elif rule == "001":
                    parameters = self.code001()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "002":
                    parameters = self.code002()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "003":
                    parameters = self.code003()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "011":
                    parameters = self.code011()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "012":
                    parameters = self.code012()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "013":
                    parameters = self.code013()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "101":
                    parameters = self.code101()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "102":
                    parameters = self.code102()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "103":
                    parameters = self.code103()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "104":
                    parameters = self.code104()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "105":
                    parameters = self.code105()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
                elif rule == "106":
                    parameters = self.code106()
                    toAdd = [rule, parameters]
                    rules.append(toAdd)
            print("================================================================")
            print("                            New ETF                             ")
            print(rules)
            etfNew = ETF.ETF("0","0",rules,self.date,1000000)
            etfNew.createETF()
            beginDate = datetime.strptime(self.date, '%Y-%m-%d')
            endDate = datetime.strftime(beginDate + timedelta(365), '%Y-%m-%d')
            data = etfNew.wowFactor(endDate)
            print(data)
            tmpJson = {"Rules" : rules, "Prices" : data["Values"]}
            dictionaryOfETF[count] = tmpJson
        self.startAIalgorithm(dictionaryOfETF)


        #Now we have the original 10 stocks I think the idea is to create a recursive function that takes the 10 etfs
    def startAIalgorithm(self, dictionaryOfETF):
        rSqauredValues = {}
        for etf in dictionaryOfETF:
            values = dictionaryOfETF[etf]
            dctOfPrices = values["Prices"]
            Yvalues = []
            Xvalues = []
            howManyDays = 0
            for date in dctOfPrices:
                howManyDays = howManyDays + 1
                Yvalues.append(dctOfPrices[date])
                Xvalues.append(howManyDays)
            rSquare = self.fitnessFunction(Xvalues,Yvalues)
            rSqauredValues[etf] = rSquare
        ###########################
        amountOfETFsToMutate = 2
        ###########################
        sortedStocks = sorted(rSqauredValues.items(), key=lambda x: x[1], reverse=True)
        print(sortedStocks)
        stocksToMutate = []
        count = 0
        for x in sortedStocks:
            if count==amountOfETFsToMutate:
                break
            stocksToMutate.append(x)







    def fitnessFunction(self,XValues,Yvalues):
        x = np.array(XValues)
        y = np.array(Yvalues)

        if len(Yvalues) == 0:
            return 0

        a, b = np.polyfit(x, y, 1)

        # add points to plot
        plt.scatter(x, y, color='purple')

        # add line of best fit to plot
        plt.plot(x, a * x + b, color='steelblue', linestyle='--', linewidth=2)
        plt.text(20,500000 , 'y = ' + '{:.2f}'.format(b) + ' + {:.2f}'.format(a) + 'x', size=15)
        plt.show()
        algorithm = "a*x + b"
        predictedValues = []
        for eachX in XValues:
            temp = (a*eachX) + b
            predictedValues.append(temp)
        length = len(Yvalues)
        SSR = 0
        for pos in range(len(Yvalues)):
            actualY = Yvalues[pos]
            predictedY = predictedValues[pos]
            minus = actualY - predictedY
            powered = minus*minus
            SSR = SSR + powered

        mean = 0
        total = 0
        for value in Yvalues:
            total = total + value
        mean = total/len(Yvalues)
        SST = 0
        for value in Yvalues:
            minus = value - mean
            sqaured = minus*minus
            SST = SST + sqaured

        equation = SSR/SST
        rSquared = 1 - equation
        return rSquared




    def code000(self):
        #need to randomise specific tickers
        lstOFStocks = apiCalls.listallcompanies()
        tick = random.sample(lstOFStocks,1)
        return tick
    def code001(self):
        # need to randomise sector
        file = open('databases\industries.csv')
        type(file)
        csvreader = csv.reader(file)
        rows = []
        for row in csvreader:
            rows.append(row)
        tempLst = []
        for row in rows:
            line = row[0]
            arr = line.split(";")
            tempLst.append(arr[0])
        del tempLst[0]
        t = random.sample(tempLst,1)
        sector = t[0][0:3]
        toReturn = [sector]

        return toReturn
    def code002(self):
        # need to randomise industries
        file = open('databases\industries.csv')
        type(file)
        csvreader = csv.reader(file)
        rows = []
        for row in csvreader:
            rows.append(row)
        tempLst = []
        for row in rows:
            line = row[0]
            arr = line.split(";")
            tempLst.append(arr[0])
        del tempLst[0]
        industry = random.sample(tempLst, 1)


        return industry

    def code003(self):
        # need to randomise country
        lstOfCodes = ["AS","AT","AX","BA","BC", "BD", "BE", "BK", "BO", "BR", "CA", "CN", "CO", "CR", "DB", "DE", "DU", "F", "HE", "HK", "HM", "IC", "IR", "IS", "JK", "JO", "KL", "KQ", "KS", "L", "LN", "LS", "MC","ME","MI","MU","MX","NE","NL","NS","NZ","OL","PA","PM", "PR", "QA", "RG", "SA", "SG", "SI", "SN", "SR", "SS", "ST", "SW", "SZ", "T", "TA", "TL", "TO","TW", "TWO", "US", "V", "VI", "VN", "VS", "WA", "HA", "SX", "TG", "SC"]
        country = random.sample(lstOfCodes, 1)

        return country

    def code011(self):
        # need to randomise minMarketCap and MaxMarketCap
        lstOFStocks = apiCalls.listallcompanies()
        stockInformation = apiCalls.getShareMarketEarn(lstOFStocks, self.date)
        stocksWithMarketCap = {}
        for stock in stockInformation:
            parameters = stockInformation[stock]
            marketCap = parameters[1]
            if marketCap != None:
                stocksWithMarketCap[stock] = marketCap
        sortedStocks = sorted(stocksWithMarketCap.items(), key=lambda x: x[1], reverse=True)
        highestMarketCap = sortedStocks[0][1]
        smallestMarketCap = sortedStocks[-1][1]
        #######################
        m = random.sample(range(smallestMarketCap, highestMarketCap), 2)
        minMarketCap = 0
        maxMarketCap = 0
        if m[0] > m[1]:
            maxMarketCap = m[0]
            minMarketCap = m[1]
        else:
            maxMarketCap = m[1]
            minMarketCap = m[0]
        #######################
        dct = [minMarketCap, maxMarketCap]

        return dct

    def code012(self):
        # need to randomise earnings min and max
        lstOFStocks = apiCalls.listallcompanies()
        stockInformation = apiCalls.getShareMarketEarn(lstOFStocks, self.date)
        stocksEarnings = {}
        for stock in stockInformation:
            parameters = stockInformation[stock]
            earnings = parameters[2]
            if earnings != None:
                stocksEarnings[stock] = earnings
        sortedStocks = sorted(stocksEarnings.items(), key=lambda x: x[1], reverse=True)
        highestEarning = sortedStocks[0][1]
        smallestEarning = sortedStocks[-1][1]
        #######################
        m = random.sample(range(int(smallestEarning), int(highestEarning)), 2)
        minEarning = 0
        maxEarning = 0
        if m[0] > m[1]:
            minEarning = m[0]
            minEarning = m[1]
        else:
            maxEarning = m[1]
            minEarning = m[0]
        #######################
        dct = [minEarning, maxEarning]

        return dct

    def code013(self):
        # need to randomise stock Price min and max
        lstOFStocks = apiCalls.listallcompanies()
        stockInformation = apiCalls.getShareMarketEarn(lstOFStocks, self.date)
        stocksPrice = {}
        for stock in stockInformation:
            parameters = stockInformation[stock]
            price = parameters[0]
            if price != None:
                stocksPrice[stock] = price
        sortedStocks = sorted(stocksPrice.items(), key=lambda x: x[1], reverse=True)
        highestprice = sortedStocks[0][1]
        smallestprice = sortedStocks[-1][1]
        #######################
        m = random.sample(range(int(smallestprice), int(highestprice)), 2)
        minPrice = 0
        maxPrice = 0
        if m[0] > m[1]:
            maxPrice = m[0]
            minPrice = m[1]
        else:
            maxPrice = m[1]
            minPrice = m[0]
        #######################
        dct = [minPrice, maxPrice]

        return dct


    def code101(self):
        #need to randomise certain ticker and the percentage
        percentToKeep = int(0.5*self.percentage)
        temp = self.percentage-percentToKeep
        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage-percentage
        self.percentage = t

        lstOFStocks = apiCalls.listallcompanies()
        tick = random.sample(lstOFStocks, 1)
        ticker = tick[0]

        dct = [ticker, percentage]
        return dct

    def code102(self):
        #need to randomise sectorID and percentage and amountOfCompanies
        percentToKeep = int(0.5 * self.percentage)
        temp = self.percentage - percentToKeep

        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage - percentage
        self.percentage = t

        file = open('databases\industries.csv')
        type(file)
        csvreader = csv.reader(file)
        rows = []
        for row in csvreader:
            rows.append(row)
        tempLst = []
        for row in rows:
            line = row[0]
            arr = line.split(";")
            tempLst.append(arr[0])
        del tempLst[0]
        t = random.sample(tempLst, 1)
        sector = t[0][0:3]

        ran = random.sample(range(1, 30), 1)
        amountOfCompanies = ran[0]

        dct = [sector, percentage, amountOfCompanies]

        return dct

    def code103(self):
        #need to randomise industryID and percentage and amountOfCompanies
        percentToKeep = int(0.5 * self.percentage)
        temp = self.percentage - percentToKeep

        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage - percentage
        self.percentage = t

        file = open('databases\industries.csv')
        type(file)
        csvreader = csv.reader(file)
        rows = []
        for row in csvreader:
            rows.append(row)
        tempLst = []
        for row in rows:
            line = row[0]
            arr = line.split(";")
            tempLst.append(arr[0])
        del tempLst[0]
        t = random.sample(tempLst, 1)
        industry = t[0]
        ran = random.sample(range(1, 30), 1)
        amountOfCompanies = ran[0]

        dct = [industry, percentage, amountOfCompanies]

        return dct

    def code104(self):
        #need to randomise percentage and amountOfCompanies
        percentToKeep = int(0.5 * self.percentage)
        temp = self.percentage - percentToKeep

        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage - percentage
        self.percentage = t

        ran = random.sample(range(1,30),1)
        amountOfCompanies = ran[0]

        dct = [percentage, amountOfCompanies]
        return dct

    def code105(self):
        #need to randomise country and percentage and amountOfCompanies
        percentToKeep = int(0.5 * self.percentage)
        temp = self.percentage - percentToKeep

        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage - percentage
        self.percentage = t

        lstOfCodes = ["AS", "AT", "AX", "BA", "BC", "BD", "BE", "BK", "BO", "BR", "CA", "CN", "CO", "CR", "DB", "DE",
                      "DU", "F", "HE", "HK", "HM", "IC", "IR", "IS", "JK", "JO", "KL", "KQ", "KS", "L", "LN", "LS",
                      "MC", "ME", "MI", "MU", "MX", "NE", "NL", "NS", "NZ", "OL", "PA", "PM", "PR", "QA", "RG", "SA",
                      "SG", "SI", "SN", "SR", "SS", "ST", "SW", "SZ", "T", "TA", "TL", "TO", "TW", "TWO", "US", "V",
                      "VI", "VN", "VS", "WA", "HA", "SX", "TG", "SC"]
        country = random.sample(lstOfCodes, 1)
        ran = random.sample(range(1, 30), 1)
        amountOfCompanies = ran[0]

        dct = [country[0], percentage, amountOfCompanies]

        return dct

    def code106(self):
        #need to randomise percentage and amountOfCompanies
        percentToKeep = int(0.5 * self.percentage)
        temp = self.percentage - percentToKeep

        checkBoolean = False
        value = 0
        if temp <= 10:
            checkBoolean = True
            value = int(0.5*temp)
        while checkBoolean == False:
            m = random.sample(range(1, self.percentage), 1)
            value = m[0]
            if value <= temp:
                checkBoolean = True

        percentage = value
        t = self.percentage - percentage
        self.percentage = t

        ran = random.sample(range(1, 30), 1)
        amountOfCompanies = ran[0]

        dct = [percentage, amountOfCompanies]

        return dct