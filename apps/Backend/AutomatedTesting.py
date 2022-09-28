import unittest
import apiCalls
import AiFactor
from unittest import mock
import mock


class AIfactor(unittest.TestCase):

    def __init__(self):
        date = ("2021-01-01")
        seedValue = ("81")
        self.ai = AiFactor.AiFactor(date, seedValue)

    def testCode000(self):

        data = self.ai.code000()[0]
        knownValues = apiCalls.listallcompanies()
        assert data in knownValues, "Test to see if method generates random stock from database"



if __name__ == "__main__":
    unittest.main()