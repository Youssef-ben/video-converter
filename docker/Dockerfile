# CLIENT BUILD STAGE
#-------------------------------------------------------------------------
FROM node:16-alpine as BUILD-WEB-CLIENT-STAGE
WORKDIR /app

# Custom cache invalidation
COPY ./src/clients/web .

## Remove the .env if was copied, and create the new one
## to allow automatic url setting.
RUN rm -rf .env
RUN cp .env.example .env 

# Install dependencies
RUN yarn
RUN yarn build

# SERVER BUILD STAGE
#-------------------------------------------------------------------------
FROM node:16-alpine AS BUILD-SERVER-STAGE
WORKDIR /api

RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

# Copy all in the build stage
COPY ./src/server/ .
RUN rm -rf .env
RUN cp .env.example .env 

# Tests and build the project.
RUN yarn
RUN yarn build

# Remove development dependencies
RUN npm prune --production

# Clean the image using node prune
RUN /usr/local/bin/node-prune


# PRODUCTION BUILD STAGE
#-------------------------------------------------------------------------
FROM node:16-alpine AS PRODUCTION
WORKDIR /usr/api

# Copy from build image
COPY --from=BUILD-SERVER-STAGE /api/dist .
COPY --from=BUILD-SERVER-STAGE /api/node_modules ./node_modules
COPY --from=BUILD-SERVER-STAGE /api/public /usr/api/public

COPY --from=BUILD-WEB-CLIENT-STAGE /app/build /usr/api/public/ui

EXPOSE 3000
CMD ["node","./src/startup.js"]