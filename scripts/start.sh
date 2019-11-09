#!/bin/bash

set -eu
export NODE_ENV=production

node tmp/build
