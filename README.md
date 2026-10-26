# NoteTaker

A React Native app for writing a note.

## Run

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

In another terminal, install the app on a device or emulator:

```bash
npm run android
npm run ios
```

Android needs Android Studio. iOS needs Xcode, then CocoaPods:

```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

The Write tab holds one note. Save stores it on the phone.
