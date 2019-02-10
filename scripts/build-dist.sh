#!/bin/bash

# 1. Build the files (using Zero)
rm -rf ./lib
npm run build:lib

# 2. Minor clean up for the final dist directory
rm -rf ./dist
mkdir -p dist

# 3. Copy over the files into dist
cp -R ./lib/lib/* ./dist/