FROM python:3.6-buster

WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY rcon rcon
ENV FLASK_APP rcon.connection
ENV HLL_HOST ''
ENV HLL_PORT ''
ENV HLL_PASSWORD ''
