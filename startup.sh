#!/bin/sh
set -euo pipefail

INSTALL="npm install"
START="npm start"

log_info() {
  echo "$(date '+%Y-%m-%dT%H:%M:%S%z') [INFO] $1"
}

log_error() {
  echo "$(date '+%Y-%m-%dT%H:%M:%S%z') [ERROR] $1" >&2
}

cleanup() {
  log_info "Performing cleanup..."
  rm -f "$PID_FILE"
  exit "$1"
}

trap cleanup EXIT ERR

if [ ! -d "node_modules" ]; then
  log_info "Installing server dependencies..."
  $INSTALL
else
  log_info "Server dependencies already installed, skipping installation."
fi

if [ -f ".env" ]; then
  log_info "Sourcing .env file."
  export $(grep -v '^#' .env | xargs)
else
  log_error ".env file not found, using environment variables or defaults."
fi

if [ -d "client" ]; then
  log_info "Client directory exists, installing client dependencies and building..."
  if [ ! -d "client/node_modules" ]; then
    log_info "Installing client dependencies..."
    $INSTALL --prefix client
  else
    log_info "Client dependencies already installed, skipping installation."
  fi
  log_info "Building client application..."
  npm run build --prefix client
fi

if [ -n "$HEROKU_APP_NAME" ]; then
  log_info "Heroku environment detected, running heroku-postbuild script..."
  if [ -d "client" ]; then
    NPM_CONFIG_PRODUCTION=false $INSTALL --prefix client && npm run build --prefix client
  fi
fi

log_info "Starting the application..."
$START