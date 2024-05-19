import unittest
from application import app
import os
from dotenv import load_dotenv

class FlaskTest(unittest.TestCase):
    # configure for github test
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        load_dotenv()
        self.headers = headers = {
            "API-Key" : os.getenv("USER_KEY")
        }

    #simple tests for status code
    def test_index(self): 
        response = self.app.get("/",headers = self.headers)
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()