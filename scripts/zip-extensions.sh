#!/bin/bash

set -eo pipefail

cd ./SenseExtensions

for dir in ./*/
do
  dir=${dir%*/}
  name=${dir##*/}
  echo Zipping ${dir##*/}
  zip -r "$name.zip" "$dir"
done
