#!/usr/bin/env sh

set -e

npm run build

cd dist

echo > .nojekyll 

git init

git checkout -b master

git add -A 

commit -m "deploy"


git push -f git@github.com:frint-in/Frint-company-portal.git master:gh-pages

cd -