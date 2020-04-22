#!/bin/bash

set -ex

if ! docker info &> /dev/null; then
  echo "Error: docker engine is not running"
  exit 1
fi

template_resume=resume_template.md
output_resume=resume.md
output_resume_pdf=resume.pdf
sed '/^>/d' $template_resume > $output_resume

top_bot_margin=1.75cm
left_right_margin=1.5cm

docker run --rm --volume "`pwd`:/data" --user `id -u`:`id -g` pandoc/latex:2.9.2.1 \
    ${output_resume} -f markdown -t pdf -s \
    --pdf-engine=xelatex -V pagestyle=empty -V geometry:"top=${top_bot_margin}, bottom=${top_bot_margin}, left=${left_right_margin}, right=${left_right_margin}" -o ${output_resume_pdf}

cp $output_resume ../README.md
exit 0