#!/bin/bash

set -eu
export NODE_ENV=development

if [ ! -f './.env' ]; then
  echo '⚠️ `.env` file missing:'
  echo '  cp .env{.example,}'
  exit 1
fi

eval "$(cat .env <(echo) <(declare -x))"

EMPTY=0
if [ -z "$SLACK_BOT_TOKEN" ]; then
  echo '⚠️ $SLACK_BOT_TOKEN missing'
  EMPTY=1
fi
if [ -z "$SLACK_SIGNING_SECRET" ]; then
  echo '⚠️ $SLACK_SIGNING_SECRET missing'
  EMPTY=1
fi
if [ "$EMPTY" != 0 ]; then
  exit 1
fi

pm2 --no-daemon start package.json &
PID=$!

while ! nc -z localhost $PORT; do sleep 1; done

[[ -x "`which open`" ]] && open "http://localhost:$PORT"

wait $PID
