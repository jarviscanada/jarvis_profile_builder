import csv
import sys
import json

csv_filename=sys.argv[1]
out_dir = sys.argv[2]

def make_project(name, git_url):
    return {"name": name, "git_url": git_url}

def make_profile(csv_profile):
    profile = {}
    profile['name'] = csv_profile['Name']
    profile['summary'] = csv_profile['Summary']
    projects = []
    projects.append(make_project("Cluster Monitor",csv_profile["Core Java"]))
    projects.append(make_project("Core Java Apps",csv_profile["Core Java"]))
    projects.append(make_project("Spring Boot REST API App",csv_profile["Java Microservice (SpringBoot)"]))
    projects.append(make_project("Hadoop & Spark",csv_profile["Big Data (Hadoop, Spark, Kafka)"]))
    projects.append(make_project("Cloud & DevOps",csv_profile["Cloud Computing & DevOps"]))
    profile['jarvis_projects'] = projects
    return profile

def write_to_file(profile, filepath):
    with open(filepath, 'w') as fp:
        json.dump(profile, fp=fp, indent=4)

rows=[]
with open(csv_filename, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for csv_profile in reader:
        profile = make_profile(csv_profile)
        filepath = out_dir + "/" + profile['name'].replace(" ", "_") + "-profile.json"
        write_to_file(profile, filepath)
