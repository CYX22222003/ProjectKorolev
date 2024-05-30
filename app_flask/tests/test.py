import unittest
from application import app
import os
from dotenv import load_dotenv
from src.models import database_test

class FlaskTest(unittest.TestCase):
    # configure for github test
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        load_dotenv()
        self.headers = headers = {
            "Authorization" : os.getenv("USER_KEY")
        }

    #simple tests for status code
    def test_index(self): 
        response = self.app.get("/",headers = self.headers)
        self.assertEqual(response.status_code, 200)

    #simple db_test
    def test_db(self):
        self.assertEqual(database_test(), True)


if __name__ == "__main__":
    unittest.main()