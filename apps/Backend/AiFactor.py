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

    def __init__(self,date,seedValue):
        self.date = date
        self.lstOfRules = ["000", "001", "002", "003", "011", "012", "013", "101", "102", "103", "104", "105", "106"]
        self.seedValue = seedValue
        self.percentage = 100
        self.amountOfETfs = 6
        self.amountOfRules = 10

    def generateRandomETF(self):
        random.seed(self.seedValue)
        lstAmountOfRules = random.sample(range(1, self.amountOfRules), 1)
        amountOfRules = lstAmountOfRules[0]
        random.seed(amountOfRules)

        #For loop needs to be done as this might allow for repeats where the random function does not allow for repeats
        etfRules = []
        for y in range(self.amountOfETfs): #This is how many etfs to create
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
            tmpJson = {"Rules" : rules, "Values" : data["Values"]}
            dictionaryOfETF[count] = tmpJson
        toReturn = self.startAIalgorithm(dictionaryOfETF)
        return toReturn


        #Now we have the original 10 stocks I think the idea is to create a recursive function that takes the 10 etfs
    def startAIalgorithm(self, dictionaryOfETF):
        rSqauredValues = {}
        for etf in dictionaryOfETF:
            values = dictionaryOfETF[etf]
            dctOfPrices = values["Values"]
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
        amountOfETFsToMutate = 4
        ###########################
        sortedStocks = sorted(rSqauredValues.items(), key=lambda x: x[1], reverse=True)
        print(sortedStocks)
        etfsWithRsquared = []
        etfsWithRules = {}
        count = 0
        for x in sortedStocks:
            if count==amountOfETFsToMutate:
                break
            etfsWithRsquared.append(x)
            count = count +1
        for x in etfsWithRsquared:
            etfCode = x[0]
            etfsWithRules[etfCode] = dictionaryOfETF[etfCode]
        toReturn = self.mutationAndCrossOver(etfsWithRsquared,etfsWithRules)
        return toReturn

    def mutationAndCrossOver(self,etfsWithRsquared,etfsWithRulesparameter):
        #First step is to mutate the stocks by changing one rule. in each etf and then remaking etf and comparing
        amountOfETFsToMutate = len(etfsWithRsquared)
        newCode = self.amountOfETfs +1
        OGetfs = {}
        dictForR = {}
        for x in etfsWithRsquared:
            dictForR[x[0]] = x[1]

        for p in dictForR:
            tempJson = {"RValue" : dictForR[p]}
            tempJson["Rules"] = etfsWithRulesparameter[p]["Rules"]
            tempJson["Values"] = etfsWithRulesparameter[p]["Values"]
            OGetfs[p] = tempJson

        boolBestFunction = False

        while boolBestFunction == False:
            etfsWithRules = {}
            for p in OGetfs:
                etfsWithRules[p] = {"Rules" : OGetfs[p]["Rules"], "Values" : OGetfs[p]["Values"]}


            mutatedETfs = {}
            for etf in etfsWithRules:
                rules = etfsWithRules[etf]['Rules']
                #now we mutate the rules.
                posToMutate = random.sample(range(0,len(rules)-1),1)

                randomRule = rules[posToMutate[0]]
                rule = randomRule[0]
                mutatedRule = []
                changed = False
                while changed == False:
                    if rule == "000":
                        parameters = self.code000()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "001":
                        parameters = self.code001()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "002":
                        parameters = self.code002()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "003":
                        parameters = self.code003()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "011":
                        parameters = self.code011()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "012":
                        parameters = self.code012()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "013":
                        parameters = self.code013()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "101":
                        percent = randomRule[1][1]
                        self.percentage = self.percentage+percent
                        parameters = self.code101()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "102":
                        percent = randomRule[1][1]
                        self.percentage = self.percentage + percent
                        parameters = self.code102()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "103":
                        percent = randomRule[1][1]
                        self.percentage = self.percentage + percent
                        parameters = self.code103()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "104":
                        percent = randomRule[1][0]
                        self.percentage = self.percentage + percent
                        parameters = self.code104()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "105":
                        percent = randomRule[1][1]
                        self.percentage = self.percentage + percent
                        parameters = self.code105()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd
                    elif rule == "106":
                        percent = randomRule[1][0]
                        self.percentage = self.percentage + percent
                        parameters = self.code106()
                        toAdd = [rule, parameters]
                        mutatedRule = toAdd

                    if mutatedRule[1] == randomRule[1]:
                        changed = False
                        print("not Changed")
                    else:
                        print("Changed")
                        changed = True

                newRules = rules.copy()
                newRules[posToMutate[0]] = mutatedRule

                etfNew = ETF.ETF("0", "0", newRules, self.date, 1000000)
                etfNew.createETF()
                beginDate = datetime.strptime(self.date, '%Y-%m-%d')
                endDate = datetime.strftime(beginDate + timedelta(365), '%Y-%m-%d')
                data = etfNew.wowFactor(endDate)
                tmpJson = {"Rules": newRules, "Values": data["Values"]}
                mutatedETfs[newCode] = tmpJson
                newCode = newCode +1


            for etf in mutatedETfs:
                values = mutatedETfs[etf]
                dctOfPrices = values["Values"]
                Yvalues = []
                Xvalues = []
                howManyDays = 0
                for date in dctOfPrices:
                    howManyDays = howManyDays + 1
                    Yvalues.append(dctOfPrices[date])
                    Xvalues.append(howManyDays)
                rSquare = self.fitnessFunction(Xvalues, Yvalues)
                tempLst = [etf,rSquare]
                etfsWithRsquared.append(tempLst)
            newDictOfetdsWithRsquared = {}
            for x in etfsWithRsquared:
                codeETF = x[0]
                rValue = x[1]
                newDictOfetdsWithRsquared[codeETF] = rValue
            sortedStocks = sorted(newDictOfetdsWithRsquared.items(), key=lambda x: x[1], reverse=True)
            for x in etfsWithRules:
                mutatedETfs[x] = etfsWithRules[x].copy()
            etfsRCrossover = {}
            etfwithRulesCrossOver = {}
            count = 0
            arrayOfStocksToChange = []
            print(sortedStocks)
            for x in sortedStocks:
                if count == amountOfETFsToMutate:
                    break
                etfsRCrossover[x[0]] = x[1]
                arrayOfStocksToChange.append(x[0])
                count = count + 1
            for x in etfsRCrossover:
               etfwithRulesCrossOver[x] = mutatedETfs[x]
            print(etfsRCrossover)

            #So now we need to split array of Stocks to Change into groups of 2
            length = len(arrayOfStocksToChange)
            whichETFsToChange = []
            for y in range(length):
                if (y % 2) == 0:
                    first = arrayOfStocksToChange[y]
                    second = arrayOfStocksToChange[y+1]
                    temp = [first,second]
                    whichETFsToChange.append(temp)

            newCrossOverETF = {}
            for eachCrossOver in whichETFsToChange:
                first = eachCrossOver[0]
                second = eachCrossOver[1]
                firstETF = etfwithRulesCrossOver[first]
                secondETF = etfwithRulesCrossOver[second]
                firstRules = firstETF["Rules"]
                secondRules = secondETF["Rules"]
                amountOFRules = len(firstRules)
                breakingPoint = int(amountOFRules/2)
                firstETFRulesStart = firstRules[:breakingPoint].copy()
                firstETFRulesEnd = firstRules[breakingPoint:].copy()
                secondETFRulesStart = secondRules[:breakingPoint].copy()
                secondETFRulesEnd = secondRules[breakingPoint:].copy()
                rules1 = firstETFRulesStart.copy() + secondETFRulesEnd.copy()
                rules2 = secondETFRulesStart.copy() + firstETFRulesEnd.copy()
                crossOverRules = [rules1,rules2]
                for i in crossOverRules:
                    etfNew = ETF.ETF("0", "0", i, self.date, 1000000)
                    etfNew.createETF()
                    beginDate = datetime.strptime(self.date, '%Y-%m-%d')
                    endDate = datetime.strftime(beginDate + timedelta(365), '%Y-%m-%d')
                    data = etfNew.wowFactor(endDate)
                    tmpJson = {"Rules": i, "Values": data["Values"]}
                    newCrossOverETF[newCode] = tmpJson
                    newCode = newCode + 1
            print(newCrossOverETF)
            for etf in newCrossOverETF:
                values = newCrossOverETF[etf]
                dctOfPrices = values["Values"]
                Yvalues = []
                Xvalues = []
                howManyDays = 0
                for date in dctOfPrices:
                    howManyDays = howManyDays + 1
                    Yvalues.append(dctOfPrices[date])
                    Xvalues.append(howManyDays)
                rSquare = self.fitnessFunction(Xvalues, Yvalues)
                tempLst = [etf, rSquare]
                etfsWithRsquared.append(tempLst)
            print(etfsWithRsquared)

            newDictOfetdsWithRsquared = {}
            for x in etfsWithRsquared:
                codeETF = x[0]
                rValue = x[1]
                newDictOfetdsWithRsquared[codeETF] = rValue
            sortedStocks = sorted(newDictOfetdsWithRsquared.items(), key=lambda x: x[1], reverse=True)
            print(sortedStocks)
            count = 0
            tempCodesWithRvalues = {}
            for i in sortedStocks:
                if count == amountOfETFsToMutate:
                    break
                tempCodesWithRvalues[i[0]] = i[1]
                count = count + 1
            for x in etfwithRulesCrossOver:
                newCrossOverETF[x] = etfwithRulesCrossOver[x]
            finalSet = {}
            print("============================")
            for p in tempCodesWithRvalues:
                tempJson = {"RValue" : tempCodesWithRvalues[p]}
                tempRules = newCrossOverETF[p]["Rules"]
                tempPrices = newCrossOverETF[p]["Values"]
                tempJson["Rules"] = tempRules
                tempJson["Values"] = tempPrices
                finalSet[p] = tempJson
                print(finalSet)
            print(OGetfs)
            for y in OGetfs:
                finalSet[y] = OGetfs[y].copy()
            sortedETFS = sorted(finalSet.items(), key=lambda x: x[1]["RValue"], reverse=True)
            toCheck = {}
            count = 0
            for n in sortedETFS:
                if count == amountOfETFsToMutate:
                    break
                toCheck[n[0]] = finalSet[n[0]]
                count = count + 1
            ogList = []
            newList = []
            for y in toCheck:
                newList.append(y)
            for y in OGetfs:
                ogList.append(y)
            if ogList == newList:
                #Stop as the best 4 etfs have been created
                print("We have reached the best possible answers")
                boolBestFunction = True
            else:
                #we must continue and go again
                print("Not equal therefore better list thus continue")
                OGetfs = toCheck.copy()

        theBestStock = []
        for x in OGetfs:
            theBestStock = OGetfs[x]

        etfNew = ETF.ETF("0", "0", theBestStock["Rules"], self.date, 1000000)
        etfNew.createETF()
        data = etfNew.wowFactorOnlyStocks()
        theBestStock["Stocks"] = data

        return theBestStock


        #Now we just need to grab the stocks from theBestStock


        # now we check toCheck and OGetfs and if they the same then stop


        #next we grab the best 4 again and see if it has done better than the original 4,
        #we will do this by keeping the orginal 4 that are ranked and then we add the new 4 etfs
        #and if the 4 orginal etfs are the highest after being ranked then end the program,
        #if there is just 1 new etf in the top 4 then we must redo the entire algorithm







        #So now I ranked the etfs and now we perform crossover using the best 2 and then next best





    def fitnessFunction(self,XValues,Yvalues):
        count = 0
        for i in Yvalues:
            if count != 0:
                fiftyPercent = 0.5*Yvalues[count-1]
                if i <= fiftyPercent:
                    Yvalues[count] = Yvalues[count-1]
            count = count +1
        x = np.array(XValues)
        y = np.array(Yvalues)

        if len(Yvalues) == 0:
            return 0

        a, b = np.polyfit(x, y, 1)

        # add points to plot
        # plt.scatter(x, y, color='purple')

        # add line of best fit to plot
        # plt.plot(x, a * x + b, color='steelblue', linestyle='--', linewidth=2)
        # plt.text(20,500000 , 'y = ' + '{:.2f}'.format(b) + ' + {:.2f}'.format(a) + 'x', size=15)
        # plt.show()
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
