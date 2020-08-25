#!/bin/bash


function validate() {
  docker pull jrvs/yamale
  docker run --rm -v "${PWD}":/workdir jrvs/yamale yamale -s /schema/profile_schema.yaml profile.yaml
}

function get_profile_name() {
  profile_name=$(docker run -it --rm -v "${PWD}":/workdir mikefarah/yq yq r profile.yaml name  | xargs | tr -d '\r' | sed -e 's/ /_/g')
  profile_prefix=jarvis_profile_${profile_name}
}

function yaml_to_json() {
  docker run --rm -v "${PWD}":/workdir mikefarah/yq yq r -j --prettyPrint profile.yaml > profile.json
}

function render_md() {
  docker pull jrvs/render_profile_md
  docker run --rm -it -v "${PWD}":/workdir jrvs/render_profile_md  profile.yaml profile.md
}

function render_pdf() {
  template_profile=profile.md
  output_profile_pdf=${profile_prefix}.pdf

  top_bot_margin=1.75cm
  left_right_margin=1.5cm
  font_size=8

  docker run --rm --volume "$(pwd):/data" --user $(id -u):$(id -g) pandoc/latex:2.9.2.1 \
    ${template_profile} -f markdown -t pdf -s \
    --pdf-engine=xelatex -V pagestyle=empty -V fontsize=${font_size}pt -V geometry:"top=${top_bot_margin}, bottom=${top_bot_margin}, left=${left_right_margin}, right=${left_right_margin}" -o ${output_profile_pdf}
}

validate
get_profile_name
yaml_to_json
render_md
render_pdf