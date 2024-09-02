# CLIENT BUILD STAGE
#-------------------------------------------------------------------------
FROM node:20-alpine as BUILD-WEB-CLIENT-STAGE
WORKDIR /app

# Custom cache invalidation
COPY ./src/clients/web .

# Remove the .env file if it was copied, 
# and create a new one to allow automatic url setting.
# Install dependencies
RUN rm -rf .env && \
    cp .env.example .env && \
    yarn && yarn build 


# SERVER BUILD STAGE
#-------------------------------------------------------------------------
FROM node:20-alpine AS BUILD-SERVER-STAGE
WORKDIR /api

# Install node-prune (https://github.com/tj/node-prune)
RUN apk update && \
    apk add curl bash && \
    rm -rf /var/cache/apk/* && \
    curl -sf https://gobinaries.com/tj/node-prune | sh && \
    rm -rf /var/cache/apk/*

# Copy all in the build stage
COPY ./src/server/ .

# Tests and build the project.
RUN rm -rf .env && \
    cp .env.example .env && \
    yarn && yarn build


# PRODUCTION BUILD STAGE
#-------------------------------------------------------------------------
FROM node:20-alpine AS PRODUCTION
WORKDIR /usr/api

# Copy build artifacts from previous stages
COPY --from=BUILD-SERVER-STAGE /api/dist .
COPY --from=BUILD-SERVER-STAGE /api/public /usr/api/public
COPY --from=BUILD-WEB-CLIENT-STAGE /app/build /usr/api/public/ui

# Remove development dependencies & Clean the image using node prune
RUN yarn --production --frozen-lockfile && \
    yarn cache clean

EXPOSE 3000
CMD ["node","./src/startup.js"]