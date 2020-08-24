from jinja2 import Template
import yaml
import sys

if len(sys.argv) != 4:
    sys.exit("Invalid number of arguments.\nUsage: {} template.md profile.yaml output.md".format(sys.argv[0]))

template = sys.argv[1]
yaml_file = sys.argv[2]
output_file = sys.argv[3]

#profile
with open(yaml_file, "r") as f:
    profile = yaml.load(f, Loader=yaml.FullLoader)

with open(template, "r") as f:
    profile_md_template = Template(f.read())

with open(output_file, "w") as f:
    md_str = profile_md_template.render(profile=profile)
    f.write(md_str)