# {{profile.name}} . Jarvis Consulting

{{profile.summary}}

## Skills

**Proficient:** {{ ", ".join(profile['skills']["proficient"]) }}

**Competent:** {{ ", ".join(profile['skills']["competent"]) }}

**Familiar:** {{ ", ".join(profile['skills']["familiar"]) }}

## Jarvis Projects

Project source code: [{{profile.github_repo_root_url}}]({{profile.github_repo_root_url}})

{%- for project in profile['jarvis_projects'] %}
{%- set title = "- **[" + project.name + "](" + profile.github_repo_root_url + "/tree/master" + project.git_url + ")**:" %}
{%- if project.description %} 
   {%- if project.description is iterable and project.description is not string %}
{{title}}
      {%- for desc in project['description'] %}
  - {{desc}}
      {%- endfor %}
   {%- else %}
{{title}} {{project.description}}
   {%- endif %}
{%- else %}
{{title}} Not Started
{%- endif %}
{% endfor %}

## Higlighted Projects
{%- for project in profile['highlighted_projects'] %}
**{{project.name}}** {%- if project.git_url %} [[GitHub]({{project.git_url}})]{%- endif %}: {{project.description}}
{% endfor %}

## Professional Experiences
{% for exp in profile.professional_experience %}
**{{exp.title}}, {{exp.company}} ({{exp.duration}})**: {{exp.description}}
{% endfor %}

## Education
{%- for edu in profile['education'] %}
**{{edu.school_name}} ({{edu.duration}})**, {{edu.degree}}, {{edu.department}} 
{%- if edu.awards_achievements and edu.awards_achievements|length > 0 %}
{%- for em in edu['awards_achievements'] %}
- {{em}}
{%- endfor %}
{%- endif %}
{% endfor %}

## Miscellaneous
{%- if profile.others and profile.others|length > 0 %}
{%- for item in profile.others %}
{%- if item.bullets and item.bullets|length > 0 %}
{%- for bullet in item.bullets %}
- {{bullet}}
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- endif %}