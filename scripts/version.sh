#!/bin/bash

set -e;

NUM=$(npx lerna changed --loglevel silent | wc -l)

set -o pipefail;

LERNA_CMD="npx lerna version --yes --no-push --exact --no-private"

if [[ "$DIST_FLOW_TAG_TRIGGER" == "trigger-release-minor" ]]; then
  LERNA_CMD="$LERNA_CMD minor"
fi

if [[ "$DIST_FLOW_RELEASE" == "prerelease" ]]; then
  LERNA_CMD="$LERNA_CMD --conventional-prerelease --preid next"
else
  LERNA_CMD="$LERNA_CMD --conventional-commits"
fi

if [[ "$NUM" -gt 0 ]]; then
  $LERNA_CMD  
  # remove current tags on private packages
  git tag -l --points-at HEAD $(npx lerna list -la | grep "(PRIVATE)" | awk '{print $1"@"substr($2,2)}') | xargs git tag -d
else
  echo "No changes - exiting"
  exit 1 # exit to avoid running rest of pipeline (in circle)
fi
