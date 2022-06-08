import requests

api_key = ""


def listallcompanies():
    request_url = 'https://simfin.com/api/v2/companies/list'

    parameters = {"api-key": api_key}

    request = requests.get(request_url, parameters)
    data = request.json()
    listComp = []
    size = len(data['data'])
    for x in range(size):
        listComp.append(data['data'][x])

    # print(data['columns'])
    # for x in range(size):
    #     print(listComp[x])
    return listComp

def listallGeneralCompanyInformation(id):
    request_url = 'https://simfin.com/api/v2/companies/general'

    parameters = {"id": id,"api-key": api_key}

    request = requests.get(request_url, parameters)
    data = request.json()
    listComp = []
    p =data['columns']
    print(p)
    size = len(data['data'])
    for x in range(size):
        listComp.append(data['data'][x])

    # print(data['columns'])
    # for x in range(size):
    #     print(listComp[x])
    return listComp


def CompaniesByIndustry(value):
    #This function will return the symbols of the comapnies in a industry or Sector
    request_url = 'https://simfin.com/api/v2/finder?api-key=' + api_key
    # This function returns companies that are in a certain field and their last clossing price is greater that 15$
    meta = {"id": 7, "value": 2022, "operator": "eq"}
    condition = {"operator": "start", "value": value}

    # This search function is for the last clossing time
    # meta1 = {"id": 7, "value": 2022, "operator": "eq"}
    # condition1 = {"operator": "be", "value": 15}

    meta1 = {"id": 7, "value": 2022, "operator": "eq"}
    condition1 = {"operator": "diff", "value": 0}

    search = [{"indicatorId": "0-73", "meta": [meta], "condition": condition},
              {"indicatorId": "0-71", "meta": [meta1], "condition": condition1}]
    parameters = {"search": search, "resultsPerPage": 0}

    request = requests.post(request_url, json=parameters)

    data = request.json()
    listOfSymbols = []
    for x in data['results']:
        each = x['values'][1]
        listOfSymbols.append(each['value'])


    return listOfSymbols
    # listComp = []
    # size = len(data['data'])
    # for x in range(size):
    #     listComp.append(data['data'][x])

    # print(data['columns'])
    # for x in range(size):
    #     print(listComp[x])


def statements():
    tickers = ["AAPL", "NVDA", "WMT"]

    periods = ["q1", "q2", "q3", "q4"]
    year_start = 2012
    year_end = 2020

    request_url = 'https://simfin.com/api/v2/companies/statements'

    columns = []

    output = []

    for ticker in tickers:

        for year in range(year_start, year_end + 1):

            for period in periods:
                parameters = {"statement": "pl", "ticker": ticker, "period": period, "fyear": year, "api-key": api_key}

                request = requests.get(request_url, parameters)
                data = request.json()[0]
                print(data)

                if data['found'] and len(data['data']) > 0:

                    if len(columns) == 0:
                        columns = data['columns']

                    output += data['data']
