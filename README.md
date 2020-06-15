# NKN explorer - A neat explorer for the NKN blockchain
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5530e891d37e4c259e7ffa64d548b452)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CrackDavid/nkn-explorer&amp;utm_campaign=Badge_Grade)

## About
This is the code of [the official NKN mainnet explorer](https://nscan.io). It utilizes the [NKN open API](https://github.com/rule110-io/nkn-open-api) to get its data. 

## Create .env-file
Create an ``.env``-file in the project root containing the following (if you're using the official NKN open API just copy/paste)
```
PUSHER_SECRET = "a2b7c363f4b1e5139e6e"
PUSHER_CLUSTER = "mt1"
PUSHER_HOST = "openapi.nkn.org"
PUSHER_PORT = 8443
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Checking for missing translations

``yarn vue-i18n-extract report -v "./{components,layouts,pages}/**/*.?(js|vue)" -l "./lang/*.?(js|json)"``
