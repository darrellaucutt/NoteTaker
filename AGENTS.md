This is a React Native CLI app. Android and iOS projects in `android/` and `ios/` are source and should stay in git.

## Commands

```bash
npm install
npm start
npm run android
npm run ios
npm test
npx tsc --noEmit
```

iOS also needs CocoaPods once: `bundle install` and `bundle exec pod install` from `ios/`.

## Navigation

Use React Navigation. Screens live in `src/screens/`. The tab navigator is `App.tsx`.

## Native projects

Change native behavior in `android/` and `ios/`. Do not add the Expo package or Expo Router.
