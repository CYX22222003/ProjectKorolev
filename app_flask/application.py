from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from src.models import db, User, Patient, Session
from src.file_manager import FileManager
from src.genai_manager import GenAIManager
from src.file_list_manager import FileListManager
import json
import os
from dotenv import load_dotenv
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    current_user,
    login_required,
)

load_dotenv()

app = Flask(__name__)
wsgi_app = app.wsgi_app
app.config["SECRET_KEY"] = "YOUR-SECRET"
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = "true"
CORS(app, supports_credentials=True, resources=r"/*")

db.init_app(app)
with app.app_context():
    db.drop_all()
    db.create_all()

# simple API key generation
dummy_db = {os.getenv("USER_KEY"): "user1"}


def authenticate_api_key(api_key):
    return dummy_db.get(api_key)


@app.before_request
def before_request():
    if request.method != "OPTIONS":
        request.get_data()
        api_key = request.headers.get("Authorization")
        if not api_key or not authenticate_api_key(api_key):
            return jsonify({"error": "Unauthorized"}), 401


# default routes for testing
@app.route("/")
def hello_world():
    return "Hello from Flask!"


# user management
@app.route("/users")
def user_list():
    users = db.session.execute(db.select(User).order_by(User.username)).scalars()

    return str(
        list(
            map(
                lambda x: f"username: {x.username}, email : {x.email}",
                list(users.fetchall()),
            )
        )
    )


# sign up function
@app.route("/user/create", methods=["GET", "POST"])
def user_create():
    if request.method == "POST":
        request.get_data()
        result = json.loads(request.data.decode())

        user = User(
            username=result["username"],
            email=result["email"],
            password=result["password"],
        )
        db.session.add(user)
        db.session.commit()
        return Response(
            f"username: {user.username}, email: {user.email}, id: {user.id}",
            content_type="text/plain",
        )
    return Response("Fail to create", status=500)


@app.route("/user/<int:user_id>")
def user_detail(user_id):
    user = db.get_or_404(User, user_id)
    return Response(
        f"username: {user.username}, email: {user.email}, id: {user.id}",
        content_type="text/plain",
    )


@app.route("/user/<int:user_id>/delete", methods=["GET", "POST", "DELETE"])
def user_delete(user_id):
    user = db.get_or_404(User, user_id)

    if request.method in ("DELETE", "POST"):
        db.session.delete(user)
        db.session.commit()
        return f"{user.username} is deleted"

    return Response("unable to delete the content", status=500)


# user login and registration in Flask
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def user_loader(username):
    return db.session.execute(db.select(User).filter_by(username=username)).scalar_one()


@app.route("/login", methods=["GET", "POST"])
def login_test():
    if request.method == "POST":
        request.get_data()
        result = json.loads(request.data.decode())
        username = result["username"]
        passwd = result["passwd"]
        user = db.session.execute(
            db.select(User).filter_by(username=username)
        ).scalar_one()

        if user is None:
            return Response("unable to login", status=500)

        if not user.is_active:
            return Response("inactive account", status=500)
        if not user.verify_password(passwd):
            return Response("wrong password or username", status=500)

        login_user(user)
        return f"{current_user.get_id()} logged in"
    return Response("errors occured", status=500)


@app.route("/welcome", methods=["GET"])
@login_required
def welcome():
    return f"welcome {current_user.get_id()}. Login is successful"


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return Response("logged out successfully", status=200)


@app.route("/user/update", methods=["PUT"])
@login_required
def update_account():
    if request.method == "PUT":
        request.get_data()
        result = json.loads(request.data.decode())

        new_password = result["new_password"]
        old_password = result["old_password"]
        email = result["email"]

        if current_user.verify_password(old_password):
            current_user.password = new_password
            current_user.email = email
            db.session.commit()
            return "update successfully"
        return "Please key in the correct password"
    return Response("Fail to update", status=500)


# patient management
@app.route("/patients", methods=["GET"])
@login_required
def show_all_patients():
    order = db.select(Patient).filter_by(user_id=current_user.show_id())
    patients = db.session.execute(order).scalars()
    return jsonify(
        {
            "list": list(
                map(
                    lambda x: {"patient_name": x.name, "patient_id": x.patient_id},
                    list(patients.fetchall()),
                )
            )
        }
    )


@app.route("/patient/create", methods=["POST"])
@login_required
def create_new_patient():
    if request.method == "POST":
        request.get_data()
        result = json.loads(request.data.decode())
        patient = Patient(name=result["patient_name"], user_id=current_user.show_id())
        db.session.add(patient)
        db.session.commit()
        return "patient is successfully created"
    return Response("Fail to create", status=500)


@app.route("/patient/<int:patient_id>/delete", methods=["DELETE"])
@login_required
def delete_patient(patient_id):
    patient = db.get_or_404(Patient, patient_id)
    if request.method == "DELETE" and patient.user_id == current_user.show_id():
        db.session.delete(patient)
        db.session.commit()
        return "successful delete"
    return Response("fail to delete", status=500)


@app.route("/patient/<int:patient_id>/update", methods=["PUT"])
@login_required
def update_patient(patient_id):
    old_patient = db.get_or_404(Patient, patient_id)
    if request.method == "PUT" and old_patient.user_id == current_user.show_id():
        request.get_data()
        result = json.loads(request.data.decode())
        new_name = result["patient_name"]
        old_patient.name = new_name
        db.session.commit()
        return "Update successfully"
    return Response("fail to update", status=500)


# session management
@app.route("/session/create", methods=["POST"])
@login_required
def create_new_session():
    if request.method == "POST":
        request.get_data()
        result = json.loads(request.data.decode())
        new_session = Session(
            session_name=result["session_name"],
            patient_id=result["patient_id"],
            user_id=current_user.show_id(),
        )
        db.session.add(new_session)
        db.session.commit()
        return "session is successfully created"
    return Response("Fail to create session", status=500)


@app.route("/sessions", methods=["GET"])
@login_required
def show_sessions():
    order = db.select(Session).filter_by(user_id=current_user.show_id())
    sessions = db.session.execute(order).scalars()
    return jsonify(
        {
            "collections": list(
                map(
                    lambda x: {
                        "session_name": x.session_name,
                        "patient_id": x.patient_id,
                        "user_id": x.user_id,
                        "session_id": x.session_id,
                        "patient_name": db.get_or_404(Patient, x.patient_id).name,
                    },
                    list(sessions.fetchall()),
                )
            )
        }
    )


@app.route("/session/<int:patient_id>/get", methods=["GET"])
@login_required
def show_session_patient(patient_id):
    order = db.select(Session).filter_by(
        user_id=current_user.show_id(), patient_id=patient_id
    )
    sessions = db.session.execute(order).scalars()
    patient_name = db.get_or_404(Patient, patient_id).name
    return jsonify(
        {
            "collections": list(
                map(
                    lambda x: {
                        "session_name": x.session_name,
                        "patient_id": x.patient_id,
                        "user_id": x.user_id,
                        "session_id": x.session_id,
                        "patient_name": patient_name,
                    },
                    list(sessions.fetchall()),
                )
            )
        }
    )


@app.route("/session/<int:session_id>/delete", methods=["DELETE"])
@login_required
def delete_sessions(session_id):
    deleted_session = db.get_or_404(Session, session_id)
    if request.method == "DELETE" and deleted_session.user_id == current_user.show_id():
        db.session.delete(deleted_session)
        db.session.commit()
        return "session is successfully deleted"
    return Response("Fail to delete", status=500)


@app.route("/session/<int:session_id>/update", methods=["PUT"])
@login_required
def update_session(session_id):
    old_session = db.get_or_404(Session, session_id)
    if request.method == "PUT" and old_session.user_id == current_user.show_id():
        request.get_data()
        result = json.loads(request.data.decode())
        new_name = result["session_name"]
        old_session.session_name = new_name
        db.session.commit()
        return "Update successfully"
    return Response("Fail to update", status=500)


# GenAI actions
@app.route("/ai/action", methods=["POST"])
@login_required
def call_ai_actions():
    context = "Imagine you are a mental health practitioner."
    reply_format = "Reply in plain text only, don't display in Markdown."
    if request.method == "POST":
        file_manager = FileManager(current_user.get_id())

        container_name = current_user.get_id()

        request.get_data()
        result = json.loads(request.data.decode())

        file_name = result["dest"]
        prompt = result["prompt"]
        file_manager.download_file(container_name, file_name)
        try:
            if file_manager.find_doctype(file_name) == ".docx":
                original_doc = file_manager.handle_docx_file()
                file_manager.remove_file(file_manager.dest + ".docx")
            else:
                original_doc = file_manager.handle_txt_file()
                file_manager.remove_file(file_manager.dest + ".txt")
        except Exception as exc:
            raise Exception("fail to handle the downloaded file") from exc

        genai_manager = GenAIManager(original_doc, prompt + context + reply_format)

        return jsonify({"AIresponse": genai_manager.get_ai_response()})

    return Response("Wrong method", status=500)


@app.route("/ai/patient", methods=["POST"])
async def patient_analysis():
    # Extract information from request
    request.get_data()
    result = json.loads(request.data.decode())

    patient_id = result["patient_id"]
    prompt = result["prompt"]

    patient = db.get_or_404(Patient, patient_id)
    patient_name = patient.name
    # list blobs related to a patient
    load_lister = FileManager("")
    file_list = load_lister.list_blob(current_user.get_id(), patient_name)

    # create multiple document compiler
    compiler = FileListManager(current_user.get_id(), file_list=file_list)
    out = await compiler.genai_call_helper(prompt)

    return jsonify({"AIResponse" : out})


@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


if __name__ == "__main__":
    app.run()
