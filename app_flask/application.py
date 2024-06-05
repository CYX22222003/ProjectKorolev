from flask import Flask, request, jsonify, session, redirect, url_for, Response
from flask_cors import CORS
from src.models import db, User, Patient, Session
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


@app.route("/user/<int:id>")
def user_detail(id):
    user = db.get_or_404(User, id)
    return Response(
        f"username: {user.username}, email: {user.email}, id: {user.id}",
        content_type="text/plain",
    )


@app.route("/user/<int:id>/delete", methods=["GET", "POST", "DELETE"])
def user_delete(id):
    user = db.get_or_404(User, id)

    if request.method == "DELETE":
        db.session.delete(user)
        db.session.commit()
        return f"{user.username} is deleted"

    return "unable to delete the content"


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

        if user == None:
            return "unable to login"

        if not user.is_active:
            return "inactive account"
        if not user.verify_password(passwd):
            return "wrong password or username"

        login_user(user)
        return f"{current_user.get_id()} logged in"
    return "errors occured"


@app.route("/welcome", methods=["GET"])
@login_required
def welcome():
    return f"welcome {current_user.get_id()}. Login is successful"


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return "logged out successfully"


# patient management
@app.route("/patients", methods=["GET"])
@login_required
def show_all_patients():
    order = db.select(Patient).filter_by(user_id=current_user.show_id())
    patients = db.session.execute(order).scalars()
    iter = list(patients.fetchall())
    return jsonify({"list": list(map(lambda x: (x.name, x.patient_id), iter))})


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


@app.route("/patient/<int:patient_id>/delete", methods=["DELETE"])
@login_required
def delete_patient(patient_id):
    patient = db.get_or_404(Patient, patient_id)
    if request.method == "DELETE":
        db.session.delete(patient)
        db.session.commit()
        return "successful delete"


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


@app.route("/sessions", methods=["GET"])
@login_required
def show_sessions():
    order = db.select(Session).filter_by(user_id=current_user.show_id())
    sessions = db.session.execute(order).scalars()
    return jsonify(
        {
            "collections": list(
                map(
                    lambda x: [x.session_name, x.patient_id, x.user_id],
                    list(sessions.fetchall()),
                )
            )
        }
    )


@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response


if __name__ == "__main__":
    app.run()
