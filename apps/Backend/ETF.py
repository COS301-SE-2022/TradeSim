import apiCalls
class ETF:

    stocksConfirmedIn = []
    def __init__(self,UserID, etfID, rules):
        self.UserID = UserID
        self.etfIF = etfID
        self.rules = rules
        self.listOfAllStocks = []


    def createETF(self):


        self.prioritizeRules()

        self.listOfAllStocks = apiCalls.listallcompanies()

        print(self.listOfAllStocks)
        for x in self.rules:
            code = x[0]
            parameters = x[1]
            self.convertCodeToEtf(code,parameters)

        print(self.listOfAllStocks)


        # first = apiCalls.getShareMarketEarn(names, "2018-06-29")
        # first contains all the shares with corresponding share Price, Market Cap and earnings, first is a dictionary so the index is the ticker of the share
        # apiCalls.CompaniesByIndustry(106)
        # country = apiCalls.getCountry(
        #     ['CRDF', 'CRDO', 'CREE', 'CRI', 'CRIS', 'CRL', 'CRM', 'CRNC', 'CROX', 'CRR', 'CRS', 'CRSP', 'CRSR', 'CRTO',
        #      'CRUS', 'CRVS', 'CRWD', 'CRWS', 'CRY', 'CRZO'])
        # print(country)


    def code000(self,ticker):
        # First we will now remove the stock in this particular moment
        newListOFstocks = []
        for x in self.listOfAllStocks:
            if x!=ticker:
                newListOFstocks.append(x)

        self.listOfAllStocks = newListOFstocks

    def code101(self, ticker):
            #First we want to check if the stock exists
            if ticker in self.listOfAllStocks:
                self.stocksConfirmedIn.append(ticker)
            else:
                print("Stock Doesn't Exist")
                # So we will need to return some way of saying that this stock doesnt exist

    def convertCodeToEtf(self,code, parameters):
        # In here we will have many switch statements when we get the code and its parameters in order to know what to do with it
        if code == "000":
            ticker = parameters[0]
            self.code000(ticker)
            # Reject by specific companies
            # The ticker is our only parameter
        elif code == "001":
            sectorID = parameters[0]
            # Reject by specific Sector
            # The sectorID is our only parameter
        elif code == "002":
            industryID = parameters[0]
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
            # Market cap Min and Max
            # The min and max market Cap is our only parameter
        elif code == "012":
            minEarnings = parameters[0]
            maxEarnings = parameters[1]
            # Earnings Min and Max
            # The min and max earning is our only parameter
        elif code == "013":
            minPrice = parameters[0]
            maxPrice = parameters[1]
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
            # percentage in a specific sector
        elif code == "103":
            industryID = parameters[0]
            Percentage = parameters[1]
            amountOfCompanies = parameters[2]
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
        newRuleList = []
        countPrioritize = 0
        while len(newRuleList) != len(self.rules):
            for rule in self.rules:
                code = rule[0]
                parameters = rule[1]
                if countPrioritize == 0:
                    if code == "000" or code == "101":
                        newRuleList.append(rule)
                if countPrioritize == 1:
                    if code == "011" or code == "012" or code == "013" or code == "104":
                        newRuleList.append(rule)
                if countPrioritize == 3:
                    if code == "001" or code == "002" or code == "003" or code == "102" or code == "103" or code == "105":
                        newRuleList.append(rule)
            countPrioritize = countPrioritize +1

        self.rules = newRuleList