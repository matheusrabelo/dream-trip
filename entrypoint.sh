#!/bin/bash

if [ ! -d node_modules ]; then
    NODE_ENV=development yarn
fi

yarn serve-static &
yarn start
