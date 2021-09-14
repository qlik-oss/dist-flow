#!/bin/bash

set -eov pipefail

TARGET_FILE="ENV.tmp"

TAG=$(git tag -l --points-at HEAD)
BRANCH=$(git branch -r --contains "$TAG" | grep -e master -e release | head -n 2 | tail -n -1 | sed -e "s: *origin/::")

echo "export DIST_FLOW_TAG_TRIGGER=$TAG" >> $TARGET_FILE;
echo "export DIST_FLOW_BRANCH=$BRANCH" >> $TARGET_FILE;

if [[ "$TAG" == "trigger-prerelease" ]]; then
  echo "Preparing prerelase";
  echo "export DIST_FLOW_RELEASE=prerelease" >> $TARGET_FILE;
elif [[ "$TAG" == "trigger-release" ]]; then
  echo "Preparing release";
  echo "export DIST_FLOW_RELEASE=release" >> $TARGET_FILE;
elif [[ "$TAG" == "trigger-release-minor" ]]; then
  echo "Preparing forced minor release";
  echo "export DIST_FLOW_RELEASE=release" >> $TARGET_FILE;
else
  echo "Unknown release tag";
  exit 1;
fi
