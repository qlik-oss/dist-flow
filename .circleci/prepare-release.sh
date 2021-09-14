#!/bin/bash

set -eo pipefail

TARGET_FILE="ENV.tmp"

BRANCH=$(git branch -r --contains "$CIRCLE_TAG" | grep -e master -e release | head -n 2 | tail -n -1 | sed -e "s: *origin/::")

echo "export DIST_FLOW_TAG_TRIGGER=$CIRCLE_TAG" >> $TARGET_FILE;
echo "export DIST_FLOW_BRANCH=$BRANCH" >> $TARGET_FILE;

if [[ "$CIRCLE_TAG" == "trigger-prerelease" ]]; then
  echo "Preparing prerelase";
  echo "export DIST_FLOW_RELEASE=prerelease" >> $TARGET_FILE;
elif [[ "$CIRCLE_TAG" == "trigger-release" ]]; then
  echo "Preparing release";
  echo "export DIST_FLOW_RELEASE=release" >> $TARGET_FILE;
elif [[ "$CIRCLE_TAG" == "trigger-release-minor" ]]; then
  echo "Preparing forced minor release";
  echo "export DIST_FLOW_RELEASE=release" >> $TARGET_FILE;
else
  echo "Unknown release tag";
  exit 1;
fi
