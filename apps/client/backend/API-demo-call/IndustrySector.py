import csv

def getFile():
    dictOfValues = {"IndustryID" : ["Sector","Industry"]}
    with open('../Database/industries.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        temp = 0
        for x in reader:
            temp = temp+1
            if(temp!=1):
                for i in x:
                    y = i.replace("\"","")
                    a = y.replace("+",",")
                    z = a.split(";")
                    dictOfValues[z[0]] = [z[1],z[2]]
    return dictOfValues