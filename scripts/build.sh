#!/bin/bash

set -eu
export NODE_ENV=production

next build app
tsc --project app/tsconfig.server.json
