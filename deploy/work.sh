#!/bin/bash
set -e

### Configuration ###
APP_DIR=/home/ec2-user/reed
GIT_URL=git://github.com/iggyjoaquin/reed
RESTART_ARGS=

### Automation steps ###
set -x

# Pull the latest code from the repo
if [[ -e $APP_DIR ]]; then
	cd $APP_DIR
	git pull origin master
else
	git clone $GIT_URL $APP_DIR
fi

# Install dependencies for client
npm install

# Rebuild client
gulp build

# Install dependencies and restart server
cd server
npm install

forever restart server.js

### Test to make sure we were in there ###
echo 'Hey thereeee' > hey_iggy.txt

