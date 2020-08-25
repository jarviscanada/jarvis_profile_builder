# Jarvis Profile Builder

## Introduction

Jarvis Profile Builder is an utility tool that renders/converts a given `profile.yaml` file into JSON, markdown, and PDF. As a Jarvis consultant/trainee, you can easily update the single configuraiton file (`profile.yaml`) to generate different formats that allows account managers to distribute to clients.

## Quick Start 

Please follow the steps below to setup this tool in your Github repo. 

```bash
#cd to your Github repo parent directory
cd jarvis_data_eng_YourName

#make sure docker engine is started
docker info

#switch to the feature branch
git checkout -b feature/profile

#init profile dir
mkdir profile && cd profile && wget https://raw.githubusercontent.com/jarviscanada/jarvis_profile_builder/master/profile_app.sh -O profile_app.sh && bash profile_app.sh init

#update your name from the profile.yaml file
vim profile.yaml

#Render/Generate different file formats
#Make sure you run this command prior every profile pull request
bash profile_app.sh

#This tool will generate the following files
../README.md #overwrite your existing README
profile.json #this file will be consume by Jarvis Consultant App
jarvis_profile_John_Smith.pdf #PDF version of ../README.md
```

## `profile.yaml`
As a Jarvis consultant, this should be the only file you need to modify. Please read the [guidelines](https://www.notion.so/jarviscanada/Updating-Build-Your-Jarvis-Profile-01f001361c694b9bae7f1e53d0d1c93a).

## `profile_app.sh`
Usage:
```bash
#download sample yaml file
bash profile_app.sh init

#Render/convert the profile.yaml
bash profile_app.sh
```
The script will execute the following components documented below.👇

### YAML validator
[Yamale](https://github.com/23andMe/Yamale) is used to validate the profile.yaml against the [profile_schema.yaml](./yamale/profile_schema.yaml). 

[jrvs/yamale](https://hub.docker.com/r/jrvs/yamale) docker image is available

### Markdown
[render_mardown](./render_markdown) is a Python tool that renders the profile.yaml file into a markdown file. The rendered markdown file will overwrite the `../README.md` which servers as the landing page for your Github.

[jrvs/render_profile_md](https://hub.docker.com/r/jrvs/render_profile_md) docker image is available

### JSON
`mikefarah/yq` docker image is used to convert the profile.yaml into a JSON. The JSON file will be consumed by the Jarvis consulant web app which allows Jarvis' cleints to easily view all profiles.

Jarvis Consultant App demo

![Imgur](https://imgur.com/yVaQc8L.gif)

### PDF
`pandoc/latex:2.9.2.1` is used to render a given markdown file into PDF