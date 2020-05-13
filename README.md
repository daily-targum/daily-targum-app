![The Daily Targum App - Banner](https://i.ibb.co/L5TtWGR/github-banner.png)

<p align="center">
  <a href='https://github.com/daily-targum/daily-targum-app/actions'>
    <img src='https://github.com/daily-targum/daily-targum-app/workflows/Default/badge.svg'>
  </a>

  <a href='https://coveralls.io/github/daily-targum/daily-targum-app?branch=master'>
    <img src='https://coveralls.io/repos/github/daily-targum/daily-targum-app/badge.svg?branch=master' alt='Coverage Status' />
  </a>

  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/daily-targum/daily-targum-app">

  <img alt="GitHub" src="https://img.shields.io/github/license/daily-targum/daily-targum-app">
</p>

---

* 🚀 [Getting Started](#-getting-started)
* 📦 [Download and Setup](#-download-and-setup)
* ✍️ [Contributing](#%EF%B8%8F-contributing)
* ✅ [Testing](#-testing)
* 📱 [Setup Detox](#-setup-detox-mac-only-for-now)
* 💻 [Environment Variables](#-environment-variables)
* 📚 [Helpful References](#-helpful-references)

The Daily Targum is a student-written and student-managed, non-profit incorporated newspaper published by the Targum Publishing Company, with a circulation of 5,000.

Founded in 1869, The Daily Targum is the second oldest and among the largest college newspapers in the nation. The Daily Targum has been a repeat recipient of the Columbia Scholastic Press Association Gold Crown Award, the highest recognition a college newspaper can be awarded in the United States.

**IMPORTANT NOTE: This app is open source, but it requires API keys to run. For now, these keys are only for internal use within the company.**

## 🚀 Getting started

  1. Download and setup repo ([directions](#-download-and-setup))

  2. Start bundler
  
      ```bash
      yarn start
      ```

  3. Running the app

      #### Physical device

      Download the Expo Client app on your phone. Launch the app and scan the QR code generated from `yarn start`.

      #### Simulator

      * iOS
        * Install Expo Client by running `yarn expo client:ios:install`
        * Copy url from above QR Code _(should look something like `exp://127.0.0.0:19000`)_
      * Android
        * Install Expo Client by running `yarn expo client:ios:install`
        * _Alternativly, you can install the Expo Client from the Play Store on Android Simulator if the previous step fails (not recommended)_
        * Copy url from above QR Code _(should look something like `exp://127.0.0.0:19000`)_

  4. (optional but recommended)

      Make sure your IDE/text editor supports TypeScript to catch errors as you go. Type check will be run locally using pre-commit hook and again remotely using GitHub Actions.
      


## 📦 Download and Setup

1. Clone repo with submodules

    ```bash
    git clone --recurse-submodules

    # or if you already cloned the repo
    # you can sync the submodules by running
    git submodule sync --recursive
    git submodule update --init --recursive
    ```

2. Install dependencies

    ```bash
    # this command will automatically
    # install dependencies for submodules
    yarn
    ```

3. Add environment variables ([more info below](#-environment-variables))

    ```bash
    # This file must be called .env NOT .env.local
    cp .env.example .env

    # Open .env and set varabiles
    ```

    Set the correct values for all variables in `.env`.

4. Install detox (optional & mac only)

    ```bash
    brew tap wix/brew
    brew install applesimutils --HEAD
    ```

## ✍ Contributing

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

## ✅ Testing

  * Lint code (checks if [rules of hooks](https://reactjs.org/docs/hooks-rules.html) have been broken)

      ```bash
      yarn lint
      ```

  * Check for TypeScript errors

      ```bash
      yarn typescript
      ```

  * Jest tests

      ```bash
      yarn test
      ```
  * End to end tests ([requires detox](#-setup-detox-mac-only-for-now))

      ```
      yarn e2e
      ```

## 📱 Setup Detox (mac only for now)

Install detox
```bash
brew tap wix/brew
brew install applesimutils --HEAD
```

You may need to rebuild the cache
```bash
yarn expotox clean-framework-cache
yarn expotox build-framework-cache
```

## 💻 Environment Variables

Setup

```bash
# This file must be called .env NOT .env.local
cp .env.example .env

# Open .env and set varabiles
```

The following environment variables are required.

```bash
# .env.example

# Sentry Config
SENTRY_AUTH_TOKEN=
SENTRY_DSN=

# Amplitude Config
AMPLITUDE_KEY=

# AWS AppSync Config 
AWS_APPSYNC_URL=
AWS_APPSYNC_REGION=
AWS_APPSYNC_API_KEY=

# Contentful
CONTENTFUL_SPACE=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ACCESS_TOKEN_DRAFTS=
```

Adding environment variables requires changing the following files:

* This repo
  * `app.config.ts`
  * `__mocks__/expo-constants.ts`
  * `.env.local`
  * `.github/workflows/*`
* Submodule
  * `src/shared/__mocks__/expo-constants.ts`
  * `src/shared/.github/workflows/*`
* Local
  * `.env` (on your local machine)

_Files responsible for configuring environment variables are commented `ENVIRONMENT VARIABLES` so you can easily be found._

## 📚 Helpful References

* [Expo API Reference](https://docs.expo.io/versions/latest/)
* [Redux Ducks Pattern](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)