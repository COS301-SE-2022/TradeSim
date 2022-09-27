import os

def getpass():
    return(os.environ["DATABASE"])

def getapi():
    return(os.environ.get("APIKEY"))

def getFinHubApi():
    return(os.environ.get("FINNHUBAPI"))
