# tgreoe - Android APK build

This folder contains the Expo Snack project files prepared for an Android APK build.

## Build from a terminal

1. Install Node.js (LTS) and Git in your development environment.
2. Run `npm install`.
3. Run `npm install -g eas-cli`.
4. Run `eas login` and sign in to your Expo account.
5. Run `eas build:configure` if prompted.
6. Run `eas build -p android --profile preview`.
7. Open the build URL printed by EAS and download the APK to your Android phone.

The preview profile is configured to produce an installable APK.

## Notes
- The supplied Snack files did not include an `assets/` folder, although the original app.json referred to icon and splash images. Those missing image references were removed so the project can build without those files.
- Android application ID is currently `com.sajad2007.tgreoe`. It should be treated as the app's permanent identifier once distributed.
- The app's source code was not intentionally changed.
