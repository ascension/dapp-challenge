# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM node:16-alpine3.17 AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git
RUN apk update

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ascension/hardhat --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:16-alpine3.17 AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app .
RUN yarn turbo run build --filter=@ascension/hardhat

FROM node:16-alpine3.17 AS runner
WORKDIR /app

COPY --from=installer /app .
RUN ls -la && echo sdfljsdfljksdfljk
COPY apps/hardhat/docker/entrypoint.sh /usr/local/bin

WORKDIR /app/apps/hardhat

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]