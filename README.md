# ⚡️

Bolt with next.js app template.

## Getting started

```sh
# install packages (homebrew for macOS, see more: https://brew.sh/)
brew install yarn nodenv node-build

# activate nodenv, see more: https://github.com/nodenv/nodenv#installation
eval "$(nodenv init -)"

# install node version of `.node-version`
nodenv install

# install packages
yarn

# start server
yarn dev    # start server in development mode
yarn start  # start server in production mode
```

## Use ngrok

```sh
brew cask install ngrok
yarn ngrok
```

## Create slack app

- Access to `https://api.slack.com/apps`
  - Create app
- Add `Bots` from `Add features and functionality`
  - Turn on `Always Show My Bot as Online`
- `Install your app to your workspace`
- Add `Event Subscriptions` from `Add features and functionality`
  - URL required, input like a `https://******.ngrok.io/slack/events`
  - Subscribe events `message.{im,mpim,groups,channels}` from `Subscribe to bot events`
    - `im`: Bot can read DM for Bot
    - `mpim`: Bot can read multi DM for Bot
    - `groups`: Bot can read PrivateChannel messages with Bot
    - `channels`: Bot can read PublicChannel messages with Bot
- Add `Interactive Components` from `Add features and functionality`
  - URL required, input like a `https://******.ngrok.io/slack/events`
- Done
