FROM python:3.10-bullseye

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app
COPY . /app

COPY requirements.txt /

RUN pip install -r requirements.txt

EXPOSE 8000
ENV FLASK_APP=app.py

CMD ["gunicorn", "--config", "gunicorn.config.py", "app:app"]
