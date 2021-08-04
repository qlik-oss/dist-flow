#!/bin/bash

set -eo pipefail

for dir in ./charts/*/sn-*-ext
do
  dir=${dir%*/}
  name=${dir##*/}
  echo Zipping ${dir##*/}
  zip -r "./SenseExtensions/$name.zip" "$dir"
done
