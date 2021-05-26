#!/bin/bash

# Script to update baseline images of rendering tests
# Fetches /regression/ artifacts from specified circleci build and downloads the new images into /baseline/

# Requires following env variables to run:
# CIRCLE_TOKEN - your API token, see https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token
# BUILD - The circleci build number of the job containing the artifacts
# REPO - The github repo

# Example:
# CIRCLE_TOKEN=xxx BUILD=271363 REPO=qlik-trial/la-vie .scripts/update-baseline.sh

set -eo pipefail

# https://circleci.com/docs/2.0/artifacts/#downloading-all-artifacts-for-a-build-on-circleci

artifacts=$(curl https://circleci.com/api/v1.1/project/github/$REPO/$BUILD/artifacts?circle-token=$CIRCLE_TOKEN | jq -r '.[].url' | grep '/regression/')

for artifact in $artifacts
do
  remote="$artifact?circle-token=$CIRCLE_TOKEN"
  local=${artifact#*-artifacts.com/}
  local=${local/regression/baseline}
  local=./${local#*/}

  wget -v -O $local $remote
done
