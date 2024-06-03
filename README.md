# Personal Finance Tracker

A web application designed to empower users to efficiently manage their personal finances. The application is based on the React framework and helps you to manage personal finance exchanges and save all your records.

## Description

Personal Finance Manager is a React-based application designed to help users manage their personal finance records. It uses Firebase for backend services and provides a user-friendly interface to track expenses and incomes efficiently.


## Features
* User login and signup (Firebase Auth)
* Track income and expenses
* View data with charts
* Set expense limits for each category
* Download recorded data as a CSV
* Currency converter
* Simple and easy-to-use interface

## Installation

To install and run the project on your local computer, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/duelHunter/personal_finance_tracker.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd personal_finance_tracker
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

## Usage

To start the development server, run:
```sh
npm start
```

This will open the app in your web browser.

## Firebase Configuration
You need to set up Firebase for this app. Follow these steps:

1. **Create a Firebase project**:

    * Go to Firebase [Console](https://console.firebase.google.com/).
    * Click on "Add Project" and follow the steps to create a new project.
2. **Add a web app to your Firebase project**:

    * In your Firebase project dashboard, click on the web icon (**</>**).
    * Register your app and copy the Firebase configuration details.
3. **Replace Firebase configuration data**:

    * Open the `firebase.js` file in the `src` folder.
4. **Replace the existing Firebase configuration data with your own**:
```jsx
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
```


### Contact me
[99xdilshan@gmail.com](mailto:99xdilshan@gmail.com)

Project Link: https://github.com/duelHunter/personal_finance_tracker
