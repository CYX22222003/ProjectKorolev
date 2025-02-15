import unittest
from application import app
import os
from dotenv import load_dotenv
from src.models import database_test
from src.file_manager import test_file_manager
from src.genai_manager import test_genai_manager
from src.file_list_manager import test_multi_filemanager2
import HtmlTestRunner
import asyncio


class FlaskTest(unittest.TestCase):
    # configure for github test
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        load_dotenv()
        self.headers = {"Authorization": os.getenv("USER_KEY")}

    # simple tests for status code
    def test_index(self):
        """Simple test case for status code"""
        response = self.app.get("/", headers=self.headers)
        self.assertEqual(response.status_code, 200)

    # simple db_test
    def test_db(self):
        self.assertEqual(database_test(), True)

    # simple tests for file manager
    def test_file_manager(self):
        self.assertEqual(test_file_manager(), True)

    # simple tests for genai manager
    def test_genai_manager(self):
        out = test_genai_manager()
        asyncio.run(test_multi_filemanager2())
        # out = "1"
        self.assertGreater(len(out), 0)


if __name__ == "__main__":
    unittest.main(
        testRunner=HtmlTestRunner.HTMLTestRunner(output="test_report/test.html")
    )
