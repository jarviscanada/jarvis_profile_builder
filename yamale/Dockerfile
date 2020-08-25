# set base image (host OS)
FROM python:3.7.5-alpine

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY profile_schema.yaml /schema/

WORKDIR /workdir/
