from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class User(db.Model):
    __tablename__ = "user_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str]
    patients: Mapped[list["Patient"]] = relationship()
    sessions: Mapped[list["Session"]] = relationship()

    def __init__(self, username, password, email):
        self.password = password
        self.username = username
        self.email = email

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    @property
    def is_active(self):
        return True

    def get_id(self):
        return self.username

    def verify_password(self, password_in):
        return password_in == self.password

    def show_id(self):
        return self.id


class Patient(db.Model):
    __tablename__ = "patient_table"

    patient_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))
    sessions: Mapped[list["Session"]] = relationship()

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id


class Session(db.Model):
    __tablename__ = "session_table"

    session_id: Mapped[int] = mapped_column(primary_key=True)
    session_name: Mapped[str] = mapped_column(nullable=False)
    patient_id: Mapped[int] = mapped_column(ForeignKey("patient_table.patient_id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("user_table.id"))

    def __init__(self, session_name, patient_id, user_id):
        self.session_name = session_name
        self.patient_id = patient_id
        self.user_id = user_id


def database_test():
    test = Flask(__name__)
    test.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
    db.init_app(test)
    with test.app_context():
        db.drop_all()
        db.create_all()
        new_user = User(username="test", password="test", email="test@test.com")
        db.session.add(new_user)
        db.session.commit()

        new_patient = Patient(name="chen", user_id=new_user.id)
        db.session.add(new_patient)
        db.session.commit()

        new_session = Session(
            session_name=f"{new_patient.name}_5/6/2024",
            patient_id=new_patient.patient_id,
            user_id=new_patient.user_id,
        )
        db.session.add(new_session)
        db.session.commit()

        users = db.session.execute(db.select(User)).scalars()
        patients = db.session.execute(db.select(Patient)).scalars()
        sessions = db.session.execute(db.select(Session)).scalars()

        out1 = users.fetchall()[0] == new_user
        out2 = patients.fetchall()[0] == new_patient
        out3 = sessions.fetchall()[0] == new_session
        db.session.commit()
        db.session()
        db.drop_all()
    return (out1 and out2) and out3
