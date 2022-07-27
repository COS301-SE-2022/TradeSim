import requests

def testAutomated():
    url = 'http://127.0.0.1:6969/createRules'
    CreateRules = {
        "UserID": 1,
        "ETFid": 11,
        "Rules": [
            ["104", ["10", "5"]],
            ["106", ["40", "10"]],
            ["102", ["101", "10", "20"]],
            ["101", ["AAPL", "40"]],
            ["202", ["8"]]
        ],
        "date": "2020-02-10",
        "amount": 1000000
    }

    print("Sending request")
    x = requests.post(url, json=CreateRules)

    print(x.text)


if __name__ == "__main__":
   testAutomated()