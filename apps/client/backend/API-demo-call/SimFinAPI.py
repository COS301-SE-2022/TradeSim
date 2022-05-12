import IndustrySector
import requests

api_key = "NBpcYHWZApdpErjTNUHBQiiWQ9RZSvcd"


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

def CompaniesByIndustry():
    request_url = 'https://simfin.com/api/v2/finder?api-key=NBpcYHWZApdpErjTNUHBQiiWQ9RZSvcd'
    meta = {"id": 7, "value": 2021, "operator": "eq"}
    condition = {"operator": "start", "value": "100"}
    search = [{"indicatorId": "0-73", "meta": [meta], "condition": condition}]
    parameters = {"search": search, "resultsPerPage": 0}


    request = requests.post(request_url, json = parameters)

    data = request.json()
    arrayOfInfo = []
    for x in data['results']:
        arrayOfInfo.append(x)

    return arrayOfInfo
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


if __name__ == '__main__':
    CompaniesByIndustry()
    # listOfAllCompanies = listallcompanies()
    # DictionaryOfSectors = IndustrySector.getFile()
