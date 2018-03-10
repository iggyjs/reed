#!/bin/bash
set -e

### Configuration ###
SERVER=ec2-user@35.153.250.216
APP_DIR=/home/ec2-user/reed
KEYFILE=~/.ssh/reed.pem
REMOTE_SCRIPT_PATH=/tmp/deploy-reed.sh

### Library ###
function run()
{
	echo "Running: $@"
	"$@"
}

### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
	KEYARG="-i $KEYFILE"
else
	KEYARG=
fi

run scp $KEYARG ./work.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH
