#!/bin/bash


echo "ready to build scripts"

# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# set nvm evn
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

echo "nvm installed"

# install node8
nvm i 8
nvm use --delete-prefix v8.9.4

# upgrade npm
npm cache clean -f
npm install npm -g

# set taobao registry
npm config set registry https://registry.npm.taobao.org

# install dependencies
npm i

echo "node_modules installed"
npm run build

echo "scripts done"

# remove node_modules
rm -rf node_modules


