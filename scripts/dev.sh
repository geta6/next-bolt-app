#!/bin/bash

set -eu
export NODE_ENV=development

if [ ! -f './app/.env.local' ]; then
  echo '⚠️ `.env.local` not found, copy it.'
  echo "CP"
  cp -fv ./.env.example ./app/.env.local
fi

eval "$(cat ./app/.env.local <(echo) <(declare -x))"

[[ -z "$SLACK_BOT_TOKEN" ]] && echo '⚠️ $SLACK_BOT_TOKEN not configured.'
[[ -z "$SLACK_SIGNING_SECRET" ]] && echo '⚠️ $SLACK_SIGNING_SECRET not configured.'

pm2 --no-daemon start package.json
