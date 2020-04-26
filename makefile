.PHONY: clean-dist clean-build clean-node clean
	
make run:
	@yarn run-dev
	
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