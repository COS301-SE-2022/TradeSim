import requests
import pandas as pd


api_key = "NBpcYHWZApdpErjTNUHBQiiWQ9RZSvcd"

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


df = pd.DataFrame(output, columns=columns)


writer = pd.ExcelWriter("simfin_data.xlsx", engine='xlsxwriter')
df.to_excel(writer)
writer.save()
writer.close()
