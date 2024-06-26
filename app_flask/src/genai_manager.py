from dotenv import load_dotenv
import google.generativeai as genai
import os


class GenAIManager:
    def __init__(self, text, task):
        self.text = text
        self.task = task

        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-1.5-pro")

    def get_ai_response(self):
        response = self.model.generate_content(f"{self.task}\n{self.text}")
        return response.text

def test_genai_manager():
    manager = GenAIManager(
        "Statement: Singapore is the largest city in the world.",
        "Is the statement correct?",
    )

    return manager.get_ai_response()


if __name__ == "__main__":
    print(test_genai_manager())
