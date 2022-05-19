import json

import requests

api_key = 

def BigFunction():
    request_url = 'https://finnhub.io/api/v1/webhook/add?token='
    api_request = requests.post(request_url + api_key, json={'event': 'earnings', 'symbol': 'AAPL'})
    response = api_request.json()
    print(response)

    webId = response['id']

    request_url2 = 'https://finnhub.io/api/v1/webhook/list?token='
    api_request2 = requests.get(request_url2 + api_key)
    response2 = api_request2.json()
    print(response2)

    request_url3= 'https://finnhub.io/api/v1/webhook/delete?token='
    api_request3 = requests.post(request_url3 + api_key, json={'id': webId})
    # api_request4 = requests.post(request_url3 + api_key, json={'id': 11093})
    response3 = api_request3.json()
    print(response3)

    request_url4 = "https://finnhub.io/api/v1/stock/profile2?"
    api_request4 = requests.get(request_url4, params = {'symbol': 'AAPL' ,'token': api_key})
    response4 = api_request4.json()
    print(response4)

    request_url5 = "https://finnhub.io/api/v1/stock/metric?"
    api_request5 = requests.get(request_url5, params = {'symbol': 'AAPL' ,'token': api_key, 'metric' : 'all'})
    response5 = api_request5.json()
    print(response5)

def getQuote(symbol):
    #This function will return the Current Price and the Percent Change
    request_url = "https://finnhub.io/api/v1/quote?symbol="+symbol+"&token="
    api_request = requests.get(request_url + api_key)
    response = api_request.json()

    if "error" in response:
        return None;

    list = []
    list.append(response["c"])
    if(response["dp"]== None):
        list.append(-100)
    else:
        list.append(response['dp'])
    return list

