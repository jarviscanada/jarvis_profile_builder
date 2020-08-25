# Jarvis Profile Builder

Jarvis Profile Builder is an utility tool that renders/converts a given [profile.yaml](./profile.yaml) file into [profile.json](./profile.json), [profile.md](./profile.md), and [profile.pdf](./jarvis_profile_Jack_Smith.pdf) files. As a Jarvis consultant/trainee, you can easily update the single configuraiton file (`profile.yaml`) to generate different formats that allows account managers to distribute to clients.

<img src="https://i.imgur.com/ZATEl1H.jpg" width="720">

# Quick Start 

Please follow the steps below to setup this tool in your Github repo. 

```bash
#cd to your Github repo parent directory
cd jarvis_data_eng_YourName

#make sure docker engine is started
docker info

#switch to the feature branch
git checkout master
git checkout -b feature/profile

#init profile dir
mkdir profile && cd profile && wget https://raw.githubusercontent.com/jarviscanada/jarvis_profile_builder/develop/profile_app.sh -O profile_app.sh && bash profile_app.sh init

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

# `profile.yaml`

As a Jarvis consultant, this should be the only file you need to modify. Please see [Build your profile](##build-your-profile) section.

YAML (a recursive acronym for "YAML Ain't Markup Language") is a human-readable data-serialization language (similar to JSON but more human-readable). It is commonly used for configuration files and in applications where data is being stored or transmitted.

[YAML Syntax Guide](https://rollout.io/blog/yaml-tutorial-everything-you-need-get-started/)

# `profile_app.sh`
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

<img src="https://imgur.com/yVaQc8L.gif" width="300">

### PDF
`pandoc/latex:2.9.2.1` is used to render a given markdown file into PDF

# Build your profile

- [ ] Setup the profile tool frome your Github repo by following the [Quick Start](#quick-start) Section above
- [ ] Edit the profile.yaml file from your favorite IDE.
  - [ ] Check your spelling and grammar through https://www.grammarly.com/
  - [ ] Execute `bash profile_app.sh`
- [ ] Open a pull request that merges the feature branch into the master branch (yes, you can skip `develop` and `release` branches)
- [ ] Senior developer and CSA will comment and review your PR.
- [ ] You will need to update your `profile.yaml` file for each project as part of the project closing ticket.

# Appendix: Project/Job Description
A project/job description allows hiring managers to understand the followings:

- Context (e.g. web app for store owners, mobile app for students, etc.)
- Technical keywords, such as language, frameworks, design, tools, etc. (e.g. Java, Springboot, Microservice, REST API, Hadoop, Spark, etc.)
- Results and achievements (e.g. performance improvement, award, product delivery, etc.)

For non-technical projects/jobs, you can focus on soft skills instead of technologies (e.g. agile/scrum, team collaboration, communication, problem solving, etc.)

A project/job description shall start with an action verb
  - Non-technical [action verbs](https://careernetwork.msu.edu/resources-tools/resumes/action-verbs.html)
  - Common action verbs for developers
    - Designed
    - Implemented
    - Coded
    - Programmed
    - Developed
    - Architected
    - Utilized
    - Collaborated
    - Worked
    - Initiated and lead
  - More [action verbs](./docs/Action_Wrods_For_Engineering.pdf)