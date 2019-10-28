#!/bin/bash

set -eu
export NODE_ENV=development
export PORT=3000

nodemon &
PID=$!

while ! nc -z localhost $PORT; do sleep 1; done

[[ -x "`which open`" ]] && open "http://localhost:$PORT"

wait $PID
