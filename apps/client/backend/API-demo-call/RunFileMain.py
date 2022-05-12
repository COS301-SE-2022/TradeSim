import IndustrySector
import SimFinAPI
import FinnhubAPI


if __name__ == '__main__':
    DictionaryOfSectors = IndustrySector.getFile()
    comp = SimFinAPI.CompaniesByIndustry(101002)
    for name in comp:
        print(name)
        FinnhubAPI.getQuote(name)
    # listOfAllCompanies = listallcompanies()
