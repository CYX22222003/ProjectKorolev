import unittest
from unittest.mock import patch, MagicMock
from application import app
import os
from dotenv import load_dotenv
from src.models import db, User, database_test
from src.file_manager import test_file_manager
from src.genai_manager import test_genai_manager
from flask_login import LoginManager, login_user, current_user, logout_user, UserMixin
import HtmlTestRunner

class MockUser(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

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

    # user signup API endpoint
    def test_user_signup(self):
        correct_user = {"username": "test", "email": "Test", "password": "Test"}
        response = self.app.post(
            "/user/create", headers=self.headers, json=correct_user
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_data(as_text=True), "username: test, email: Test, id: 1"
        )

        error = self.app.post("/user/create", headers=self.headers, json={})
        self.assertEqual(error.status_code, 500)

    @patch("src.models.db.session.execute")
    @patch("flask_login.login_user")
    def test_user_login(self, mock_login_user, mock_db_execute):
        mock_user = MagicMock()
        mock_user.is_active = True
        mock_user.verify_password.return_value = True
        mock_user.get_id.return_value = 1

        mock_db_execute.return_value.scalar_one.return_value = mock_user

        mock_login_user.return_value = None

        login_data = {"username": "test_user", "passwd": "correct_password"}

        # Make POST request to login endpoint
        response = self.app.post("/login", headers=self.headers, json=login_data)

        # Assert response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_data(as_text=True), "1 logged in")

    def test_user_logout(self):
        pass

    def test_patient_creation(self):
        pass

    def test_patient_delete(self):
        pass

    def test_session_creation(self):
        pass

    def test_session_delete(self):
        pass

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
    unittest.main(
        testRunner=HtmlTestRunner.HTMLTestRunner(
            output="test_report", add_timestamp=False
        )
    )
