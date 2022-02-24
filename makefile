.PHONY: run lint pack-win clean-dist clean-build clean-node clean

define print_inf
	@echo "[INFO] - $(1)"
endef

run: ## Run the web app in the electron container.
	$(call print_inf,'Running the web app and electron container...')
	@yarn run-dev

lint: ## Lint the project and automaticlly fix the problems.
	$(call print_inf,'Linting and fixing all the issues...')
	@yarn lint-fix	

pack-win: clean-dist clean-build ## Build and pack the electron app.
	$(call print_inf,'Installing the Reatct-Electron app dependencies...')
	@yarn

	$(call print_inf,'Building the Reatct-Electron app...')
	@yarn build

	$(call print_inf,'Packing the React-Electron app...')
	@yarn pack-win-electron

	$(call print_inf,'Persisting data...')
	@yarn postinstall-electron

	$(call print_inf,'Done.')

clean-dist: ## Delete the dist folder.
	$(call print_inf,'Cleaning the {dist} folder...')
	@rm -rf dist
	
clean-build: ## Delete the Build folder.
	$(call print_inf,'Cleaning the {build} folder...')
	@rm -rf build

clean-node: ## Delete the node module folder.
	$(call print_inf,'Cleaning the {distnode-modules} folder...')
	@rm -rf node_modules
	
clean: clean-dist clean-build clean-node ## Delete all the folders [build, dist, node_modules].
	$(call print_inf,'Cleaning other files and folders...')
	@rm -rf yarn-error.log

	$(call print_inf,'Done.')