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
    profile['template'] = "b1_simple_profile_template"
    projects = []
    projects.append(make_project("Cluster Monitor",csv_profile["linux"]))
    projects.append(make_project("Core Java Apps",csv_profile["java"]))
    projects.append(make_project("Spring Boot REST API App",csv_profile["springboot"]))
    projects.append(make_project("Hadoop",csv_profile["hadoop"]))
    projects.append(make_project("Spark",csv_profile["spark"]))
    projects.append(make_project("Cloud & DevOps",csv_profile["cloud"]))
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
