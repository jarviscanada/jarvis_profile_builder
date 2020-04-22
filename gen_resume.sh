#!/bin/bash

set -ex

if [ "$1" = "init" ]; then
  init
fi

init(){
  chmod +x $0
  wget https://raw.githubusercontent.com/jarviscanada/jarvis_resume_builder/master/resume_template.md -O ../README.md
  bash gen_resume.sh
  exit 1
}

if ! docker info &> /dev/null; then
  echo "Error: docker engine is not running"
  exit 1
fi

template_resume=../resume.md
no_quote_resume=.resume.md
output_resume_pdf=resume.pdf
sed '/^>/d' $template_resume > $no_quote_resume

top_bot_margin=1.75cm
left_right_margin=1.5cm

docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex:2.9.2.1 \
    ${no_quote_resume} -f markdown -t pdf -s \
    --pdf-engine=xelatex -V pagestyle=empty -V geometry:"top=${top_bot_margin}, bottom=${top_bot_margin}, left=${left_right_margin}, right=${left_right_margin}" -o ${output_resume_pdf}

exit 0