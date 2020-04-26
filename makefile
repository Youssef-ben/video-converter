.PHONY: run lint clean-dist clean-build clean-node clean
	
run: ## Run the web app in the electron container.
	@echo "running the"
	@yarn run-dev

lint: ## Lint the project and automaticlly fix the problems.
	@echo "Linting and fixing all the issues..."
	@yarn lint-fix	

clean-dist: ## Delete the dist folder.
	@echo "Cleanin the {dist} folder..."
	@rm -rf dist
	
clean-build: ## Delete the Build folder.
	@echo "Cleanin the {build} folder..."
	@rm -rf build

clean-node: ## Delete the node module folder.
	@echo "Cleanin the {node-modules} folder..."
	@rm -rf node_modules
	
clean: clean-dist clean-build clean-node ## Delete all the folders [build, dist, node_modules]
	@echo "Cleanin other files and folders..."
	@rm -rf yarn-error.log

	@echo "done."