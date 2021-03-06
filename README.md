# Random Users Reanimated app

An app that has a single screen that fetches and displays a random list of users. The data is taken from https://randomuser.me.

The list shows basic info like name, phone and avatar. Long press on an item in the list shows the details of the user in an overlay. The overlay is similar to what is seen in iOS contacts app.

The list loads more results as the user scrolls down to the bottom edge (pagination). The app also supports light or dark mode as per the system setting. The overlay view reveals through a pop-out animation.

## Install dependencies

```
npm i
npx pod-install
```

## Run the app

### on iOS

```
npm run ios
```

### on Android

```
npm run android
```

## Run End-to-End (UI) tests

### Build and test on iOS

```
npm run e2e:ios:build
npm run e2e:ios:test
```

### Build and test on Android

**Note**: check if your system has the same avd as specified in `.detoxrc.json`. If not, either create the same AVD or edit the `avdName` property to the one you wish to use.

```
npm run e2e:android:build
npm run e2e:android:test
```
