#!/bin/bash


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

nvm i 8
nvm use --delete-prefix v8.9.4

npm config set registry https://registry.npm.taobao.org

npm i

arg1=$1
if [ ${arg1:1} = "cas" ]; then
    npm run dev
else
    npm start
fi
