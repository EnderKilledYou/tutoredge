## usage

npm run build

run.bat 

*visit in browser*

cntrl-c to stop webserver. it is now served from cache in browser forever.

# Tutor Edge

Tutor edge is a no backend web app (PWA) that scans reddit subreddits. I wrote it in about 10 minutes. It features
the ability to block users, terms, message templates, and filters. It doesn't directly
message users for your but utilizes reddit's query parameters to auto fill a message for you
to the user. This is extremely useful on job boards as you can reply not only quickly but
customize each message before it goes out.

## Installation

`yarn install`

## Usage

There is a run.bat that creates a php server for the initial host. Once created and opened the app is cached in your
browser and you no longer need to run the webserver. It will sit in your browser cache until you clear your cache. Very useful.

## Monitored subreddits

You only need to put the part AFTER https://reddit.com


`/r/forhire/` for example 

for multis you need to include the `/new/`

`/user/creativesummoner/m/homework/new/`

## Message templates

You can use full reddit markdown

## License
[MIT](https://choosealicense.com/licenses/mit/)


 
