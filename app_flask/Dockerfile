FROM python:3.10-bullseye

WORKDIR /app
COPY . /app

COPY requirements.txt /
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
ENV FLASK_APP=application.py

CMD ["gunicorn", "--config", "gunicorn.config.py", "application:app"]
