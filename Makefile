.PHONEY: build-image start-server stop-server remove-server clean open-server open-client generate-env help

# Must include the environment file to be able to use the docker-compose.
include .env

SERVER_VERSION	=	$(shell cat ./src/server/package.json | grep -oP '(?<="version": ").*(?=",)')

SERVER_IMAGE_PATH = ${SERVER_IMAGE_NAME}:${SERVER_VERSION}

# 1 - Message
# 2 - Action
define run_compose
	@echo "[INF] - $(1)"

	@SERVER_IMAGE_NAME=${SERVER_IMAGE_PATH} \
	CLIENT_IMAGE_NAME=${CLIENT_IMAGE_PATH} \
	docker-compose -f docker/docker-compose.yml --env-file ./.env  $(2)
endef

define show_container_url
	@echo "[INF] - The container {$(1)} is up and running and listening on {$(2)}!"
endef

define remove-image
	@echo "[INF] - Removing the image {$(1)}..."

	@if [ $(shell docker image ls -q --filter 'reference=$(1)' | wc -l | sed -e 's/^[ \t]*//') -eq 1 ]; then \
		docker rmi $(1) > /dev/null; \
	fi
endef

build-image: ## Build the api server docker image.
	$(call run_compose,Building the {API server} docker image..., build --no-cache --force-rm --compress --progress=plain $(SERVER_CONTAINER_NAME))

start-server: ## Starts the API Server container.
	$(call run_compose,Starting the {Api server} container..., up -d $(SERVER_CONTAINER_NAME)) > /dev/null
	$(call show_container_url,API server,http://localhost:$(SERVER_PORT))
	
stop-server: ## Stops the API server container.
	$(call run_compose,Stopping the {API server} container..., stop $(SERVER_CONTAINER_NAME)) > /dev/null

remove-server: stop-server ## Removes the API server container and its volumes.
	$(call run_compose,Removing the {API server} container..., rm -v -s -f $(SERVER_CONTAINER_NAME)) > /dev/null

clean: remove-server ## Removes the API server and web client containers and images.
	$(call remove-image,$(SERVER_IMAGE_PATH)) > /dev/null
	$(call remove-image,$(CLIENT_IMAGE_PATH)) > /dev/null
	$(call run_compose,Cleaning any leftover..., down --rmi "all" --remove-orphans -v) > /dev/null

	@echo "[INF] - Done."

open-server: ## Opens vsCode editor on the {Server} folder.
	$(shell code ./src/server/)

open-client: ## Opens vsCode editor on the {Client} folder.
	$(shell code ./src/client/)

generate-env: ## Generate a (.env) file based on the (.env.example) file..
	@echo "[INF] - Generating (.env) file for each project..."
	@cp ./.env.example ./.env
	@cp ./src/server/.env.example ./src/server/.env
	@cp ./src/client/.env.example ./src/client/.env
	@echo "[INF] - Done."

help: ## Shows the Current Makefile Commands.
	@echo ''
	@echo '========================================= [COMMANDS] ==========================================='
	@grep -E '^[a-zA-Z_-]+:.*$$' ./Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo '================================================================================================'