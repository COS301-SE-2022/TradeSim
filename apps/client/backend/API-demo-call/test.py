import SimFinAPI
import RunFileMain
import unittest


class TestSum(unittest.TestCase):

    def test_listAllCompanies(self):
        self.assertEqual(len(SimFinAPI.listallcompanies()), 3148, "The length of the list should be 3148")

    def test_IntegrationOfETF(self):
        if __name__ == '__main__':
            RunFileMain
            self.assertEqual(len(RunFileMain.Stocks), 36, "The length of the amount of stocks should be 36")


if __name__ == '__main__':
    unittest.main()

