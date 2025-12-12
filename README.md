# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Turso Cloud Sync (Optional)

This app supports offline-first sync with [Turso](https://turso.tech) using libsql embedded replicas via [op-sqlite](https://github.com/OP-Engineering/op-sqlite). Data is stored locally and synced to the cloud when you tap the "Sync with Cloud" button in the History tab.

**Note:** This feature requires a [development build](https://docs.expo.dev/develop/development-builds/introduction/) - it will not work with Expo Go because op-sqlite is a native module.

### Setup

1. Create a Turso database at https://turso.tech/app
2. Get your database URL and auth token
3. Create a `.env.local` file in the project root:

   ```bash
   EXPO_PUBLIC_TURSO_DB_URL=libsql://your-database.turso.io
   EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN=your-auth-token
   ```

4. Build a development build:

   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

If these environment variables are not set, the app will work in local-only mode and the sync button will not appear.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
