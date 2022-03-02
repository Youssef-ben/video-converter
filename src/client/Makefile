.PHONEY: build-image run clean

build-image:
	@echo "Starting the {web-app} image build..."
	@docker-compose build

run: ## Starts the web-app container.
	@echo "Starting the {web-app} container..."
	@docker-compose up -d --no-build

clean:
	@echo "Cleaning all including the {lock} files..."
	@rm -rf node_modules
	@rm -rf build
	@rm -rf package-lock.json yarn.lock
