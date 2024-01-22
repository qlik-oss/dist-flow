#!/bin/bash
set -e;

COMMIT="HEAD"

TAGS=$(git tag -l --points-at $COMMIT)

NUM_N=$(echo "$TAGS" | grep "@nebula.js" | wc -l)

set -o pipefail;

PUBLISH_CMD="pnpm publish";

# add dist tag if prerelease
if [[ "$DIST_FLOW_RELEASE" == "prerelease" || "$TAGS" == *"next"* ]]; then
  PUBLISH_CMD="$PUBLISH_CMD --tag next"
fi

if [[ "$NUM_N" -gt 0 ]]; then
  echo "Publishing @nebula packages"
  npx lerna exec --concurrency 1 $(git tag -l --points-at $COMMIT | grep "@nebula.js" | cut -d '@' -f2 | awk '{print "--scope @"$1}' ORS=' ') -- $PUBLISH_CMD
else
  echo "Did not find any @nebula.js packages to publish";
fi
