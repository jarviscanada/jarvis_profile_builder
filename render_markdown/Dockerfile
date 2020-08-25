# set base image (host OS)
FROM python:3.7.5-alpine

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

# copy the content of the local src directory to the working directory
COPY *.py profile_template.md /app/

WORKDIR /workdir

# command to run on container start
ENTRYPOINT [ "python", "/app/render_markdown.py", "/app/profile_template.md"]
