.PHONEY: build-image run clean-dist clean-node clean help

clean-dist: ## Delete the dist folder.
	@echo "Cleaning the {dist} folder..."
	@rm -rf dist

clean-node: ## Delete the node module folder.
	@echo "Cleaning the {node-modules} folder..."
	@rm -rf node_modules

clean-api: clean-dist clean-node ## Delete all the folders [build, dist, node_modules]
	@echo "Cleaning other files and folders..."
	@rm -rf yarn-error.log
	@rm -rf logs/*
	@rm -rf coverage

	@echo "done."

help: ## Shows the Current Makefile Commands.
	@echo ''
	@echo '======================================= [BASE COMMANDS] ========================================'
	@grep -E '^[a-zA-Z_-]+:.*$$' ./Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo '================================================================================================'
