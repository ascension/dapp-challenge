#!/bin/sh

# Start hardhat node as a background process
npx pm2 start './node_modules/.bin/hardhat --config hardhat.config.local.js node'

npx pm2 monitor
# Wait for hardhat node to initialize and then deploy contracts
# npx wait-on http://127.0.0.1:8545 && yarn deploy:local;

# The hardhat node process never completes
# Waiting prevents the container from pausing
wait $!