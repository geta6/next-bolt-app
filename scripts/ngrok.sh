#!/bin/bash

set -eu
export PORT=3000

ngrok http $PORT
