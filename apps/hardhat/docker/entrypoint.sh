#!/bin/sh

# Start hardhat node as a background process
yarn start:prod
# Wait for hardhat node to initialize and then deploy contracts
# npx wait-on http://127.0.0.1:8545 && yarn deploy:local;

# The hardhat node process never completes
# Waiting prevents the container from pausing
# wait $!