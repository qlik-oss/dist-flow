#!/bin/bash

c="\033[36m\033[1m"
y="\033[33m\033[1m"
r="\033[0m"

echo ""
echo -e "Branch:       $c$DIST_FLOW_BRANCH$r"
echo -e "Release type: $c$DIST_FLOW_RELEASE$r"

echo ""
echo "New releases:"

TAGS=$(git tag -l --points-at HEAD)

for tag in $TAGS
do
  echo -e "  $y$tag$r"
done
