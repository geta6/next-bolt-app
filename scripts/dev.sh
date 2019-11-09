#!/bin/bash

set -eu
export NODE_ENV=development

if [ ! -f './.env' ]; then
  echo 'Plase exec command:'
  echo '  cp .env{.example,}'
  exit 1
fi

eval "$(cat .env <(echo) <(declare -x))"

pm2 --no-daemon start package.json &
PID=$!

while ! nc -z localhost $PORT; do sleep 1; done

[[ -x "`which open`" ]] && open "http://localhost:$PORT"

wait $PID
