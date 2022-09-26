import os

def getpass():
    return(os.environ["DATABASE"])

def getapi():
    return(os.environ["APIKEY"])

def getFinHubApi():
    return(os.environ["FINNHUBAPI"])
