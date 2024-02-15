#!/bin/bash

# Define colors using ANSI escape codes
RED='\033[0;31m'
GREEN='\033[0;32m'
MAGENTA='\033[0;35m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

update_version_fields() {
    local file="$1"
    local version="$2"
    local release_date="$(date +"%Y-%m-%d")"

    echo "-------------------------------------------------------------"
    echo -e "${GREEN}[INF] - Starting the script for ($file)!${NC}"

    # Get the original content of the JSON file
    original_content=$(<"$file")

    # Update the fields in the JSON file
    echo -e "${GREEN}[INF] - Updating the version in the file ...${NC}"
    sed -i "s/\"version\": \".*\"/\"version\": \"$version\"/" "$file"
    sed -i "s/\"releaseDate\": \".*\"/\"releaseDate\": \"$release_date\"/" "$file"

    # Get the updated content of the JSON file
    updated_content=$(<"$file")
    
    # Display only the differences between the original and updated content
    if [ "$original_content" != "$updated_content" ]
    then
        echo -e "${GREEN}[INF] - The following are the changes made to the file:${NC}"
        diff --color --palette=':ad=\033[0;35:de=\033[0;31:ln=\033[0' <(echo "$original_content") <(echo "$updated_content")
    else
        echo -e "${YELLOW}[WRN] - Nothing to do, the file is up to date!${NC}"
    fi

    echo -e "${GREEN}[INF] - Done.${NC}"
    echo -e "-------------------------------------------------------------\n"
}

# BEGINING
#----------------------------------
if [ $# -ne 1 ]
then
    echo -e "${RED}[ERR] - Usage: $0 <version>${NC}"
    exit 1
fi

VERSION="$1"
BASE_FOLDER=.

if find "$PWD" -maxdepth 1 -type f -name "*.sh" | read; then
    echo -e "${YELLOW}[WRN] - Adjusting the files path!${NC}"
    BASE_FOLDER=..
fi

SERVER_FILE_PATH=$BASE_FOLDER/src/server/package.json
WEB_FILE_PATH=$BASE_FOLDER/src/clients/web/package.json
MOBILE_FILE_PATH=$BASE_FOLDER/src/clients/mobile/package.json

# Check if JSON file exists
if [[ ! -f "$SERVER_FILE_PATH" || ! -f "$WEB_FILE_PATH" || ! -f "$MOBILE_FILE_PATH" ]]
then
    echo -e "${RED}[ERR] - All of the following files are required \n[\n  "$SERVER_FILE_PATH",\n  "$WEB_FILE_PATH",\n  "$MOBILE_FILE_PATH"\n]${NC}"
    exit 1
fi
 
update_version_fields $SERVER_FILE_PATH $VERSION
update_version_fields $WEB_FILE_PATH $VERSION
update_version_fields $MOBILE_FILE_PATH $VERSION
