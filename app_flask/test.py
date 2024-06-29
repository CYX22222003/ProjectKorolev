import unittest
from application import app
import os
from dotenv import load_dotenv
from src.models import database_test
from src.file_manager import test_file_manager
from src.genai_manager import test_genai_manager
import HtmlTestRunner

class FlaskTest(unittest.TestCase):
    # configure for github test
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        load_dotenv()
        self.headers = {"Authorization": os.getenv("USER_KEY")}

    # simple tests for status code
    def test_index(self):
        """Test index endpoint."""
        response = self.app.get("/", headers=self.headers)
        self.assertEqual(response.status_code, 200)

    # simple db_test
    def test_db(self):
        """Test database functionality."""
        self.assertEqual(database_test(), True)

    # simple tests for file manager
    def test_file_manager(self):
        """Test file manager functionality."""
        self.assertEqual(test_file_manager(), True)

    # simple tests for genai manager
    def test_genai_manager(self):
        
        out = test_genai_manager()
        self.assertGreater(len(out), 0)


if __name__ == "__main__":
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output="test_report"))
