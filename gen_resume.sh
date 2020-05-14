#!/bin/bash

set -ex

#cd to script dir
cd "$(dirname "$0")"

init() {
  chmod +x $0
  wget https://raw.githubusercontent.com/jarviscanada/jarvis_resume_builder/master/resume_template.md -O ../README.md
  bash gen_resume.sh Firstname_Lastname
  exit 0
}

gen_resume() {
  name=$1
  if ! docker info &>/dev/null; then
    echo "Error: docker engine is not running"
    exit 1
  fi

  template_resume=../README.md
  no_quote_resume=.resume.md
  output_resume_pdf=jarvis_resume_${name}.pdf
  sed '/^>/d' $template_resume >$no_quote_resume

  top_bot_margin=1.75cm
  left_right_margin=1.5cm
  font_size=8

  docker run --rm --volume "$(pwd):/data" --user $(id -u):$(id -g) pandoc/latex:2.9.2.1 \
    ${no_quote_resume} -f markdown -t pdf -s \
    --pdf-engine=xelatex -V pagestyle=empty -V fontsize=${font_size}pt -V geometry:"top=${top_bot_margin}, bottom=${top_bot_margin}, left=${left_right_margin}, right=${left_right_margin}" -o ${output_resume_pdf}

  rm $no_quote_resume
  exit 0
}

if [ "$#" -ne 1 ]; then
  echo "Error: missing argument"
  echo "Usage: ./$0 init|firstname_lastname"
fi

if [ "$1" = "init" ]; then
  init
fi

if [[ "$1" == *"_"* ]]; then
  gen_resume $1
fi

echo "Error: invalid argument!"
echo "Usage: ./$0 init|Firstname_Lastname"
exit 1
