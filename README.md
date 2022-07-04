![Logo](./public/README.png)

# ReactStartupKit Dashboard

Sample Next.js dashboard app with 🛂 auth. Allows you to view latest activity, un-publish posts, activate or deactivate users, moderate comments or even take down unsuitable photos

## Setup

ReactStartupKit dashboard requires access to the following freely available services:

- [Google Firebase](https://firebase.google.com)
- [MongoDB](https://www.mongodb.com/)
- Read our [online setup docs](https://reactstartupkit.gitbook.io/api-docs/) for information on how to signup to these services and get the necessary variables

## Quick Start

- Run `npm install` or `yarn add` to install the project dependancies
- Rename `.env.local.example` to `.env.local`
- Add your environment variables. See Environment Variables section below.
- Go to Firebase Console and click on Storage. Copy the folder path, which follows this format: gs://your-app-id.appspot.com
- Open `libs/initFirebase` and paste the folder path where shown
- Run `npm run dev` to start your app
- See 'Add Search Indexes', 'Image Paths' and 'Storage Bucket' sections below to complete your setup

### Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file. 

If you are using the ReactStartupKit Desktop app, this file will be the same .env.local file as used in that project, with the same variables apart from your two cookie secrets.

If you are using the ReactStartupKit Phone app, use the same Firebase configuration variables as used there.

If you're unsure how to get these variables, view our [setup docs](https://reactstartupkit.gitbook.io/api-docs/).

```
FIREBASE_CLIENT_EMAIL=
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PRIVATE_KEY='"-----BEGIN PRIVATE KEY-----\ \n-----END PRIVATE KEY-----\n"'

# Secrets used to sign cookies
# To generate a secret, run the following command twice in a terminal and paste the output for each cookie:
# openssl rand -hex 32

COOKIE_SECRET_CURRENT=
COOKIE_SECRET_PREVIOUS=

NEXT_PUBLIC_COOKIE_SECURE=false # set to true in HTTPS environment

MONGODB_URI=
```
### Absolute Imports
To improve developer experience we use absolue imports, so instead of `import Component from '../../../components/folder/component'` we can write `import Component from 'components/folder/component'`. This is implemented in the `jsconfig.json` file.

## Project Structure

The project file structure follows the normal conventions of a Next.js app. More information about Next.js can be found [here.](https://nextjs.org/)

The default app page is Overview.js. This is configured in `initAuth.js`. There are pages for each area of information, e.g. Users.js, Posts.js, Comments.js etc. 

Data is displayed in traditional Table elements. Each page contains the `THEAD`/ `TR`. Actual data is colleted using swr. We map through entries and display an imported table row component for each record. For example, the Posts page imports a 'table-row-posts.js' component. Each table-row component fetches its own count data. For example, the 'table-row-posts.js' component fetches the number of likes, comments and bookmarks for the displayed post. 

Switches used in table-row components to hide comments, disable users etc. are their own components, and handle the database calls needed to affect the data.

### Code Commenting

All files are fully documented. To get the best out of the commenting, we recommend installing the [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) VS Code plugin.

### Moderating Comments

Moderated comments are given a 'published' status of `false` in thw database. The demo app APIs are configured to deliver the comment whether it is published or not. This allows us to hide or show the comment on the client-side. For example:

```javascript
<p>{published===true ? comment : 'This comment has been moderated'}</p>
```
### HIDING PHOTOS
Toggling a photos published status simply sets the `published' value in photo's database record to true or false. Queries fetching posts in the Desktop app or Phone app check for this status, with photos where the published value is false are not fetched, their url is not passed. For example, a post with four photos, which has one photo flagged as published = false, will show as a post with three photos.

### Authorisation

Desktop authorisation is provided by the next-firebase-auth library. Full documentation can be found [here](https://github.com/gladly-team/next-firebase-auth).

#### Config

Example config:

```javascript
// ./initAuth.js
import { init } from "next-firebase-auth";

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;

const initAuth = () => {
  init({
    debug: false,
    authPageURL: "/enter", //? URL OF AUTH PAGE
    appPageURL: "/", //? URL OF APP PAGE
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    onLoginRequestError: (err) => {
      console.error("initAuth login error: ", err);
    },
    onLogoutRequestError: (err) => {
      console.error("initAuth logout error: ", err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Using JSON to handle newline problems when storing the
        // key as a secret in Vercel. See:
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        // THIS MAY NOT BE THE CASE
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    },
    cookies: {
      name: "YOURCOOKIENAME", //? NAME YOUR COOKIE
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: TWELVE_DAYS_IN_MS,
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "true",
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error("onVerifyTokenError: ", err);
    },
    onTokenRefreshError: (err) => {
      console.error("onTokenRefreshError: ", err);
    },
  });
};

export default initAuth;
```

#### Client-side Authorisation

The library provides a useAuthUser hook with returns the current user. Any components with use client-side authorisation must be wrapped in withAuthUser. If the user is not authenticated, useAuthUser will return an AuthUser instance with a null id.

```javascript
import { useAuthUser, withAuthUser } from "next-firebase-auth";

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
    </div>
  );
};

export default withAuthUser()(Demo);
```

#### Server-side Authorisation

This page will redirect to the login page specified in initAuth.js if the user is not authenticated

```javascript
import { withAuthUser, AuthAction } from "next-firebase-auth";

const DemoPage = () => <div>My demo page</div>;

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DemoPage);
```


## License

[MIT](https://reactstartupkit.com/End_User_License_Agreement.pdf)
