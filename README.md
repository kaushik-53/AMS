# AMS - Modern Attendance Management

This is a Next.js starter project for AMS, a modern attendance management system built with Firebase Studio.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (which is included when you install Node.js)

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Install Dependencies

To install all the required packages for the project, navigate to the root directory of the project in your terminal and run the following command. This will download all the dependencies listed in the `package.json` file into a `node_modules` folder.

```bash
npm install
```

### 2. Set Up Environment Variables

The project uses Genkit with the Google AI plugin for its AI features, which requires an API key.

1.  Create a new file named `.env` in the root of the project.
2.  Add your Google AI (Gemini) API key to the `.env` file:

    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

    You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Run the Development Servers

This project requires two separate development servers to be running concurrently. You will need to open two separate terminal windows (or tabs) for these commands.

**In your first terminal, run the Next.js app:**

```bash
npm run dev
```
Wait for the command to output `✓ Ready in...`. The application will then be available at `http://localhost:9002`. This server will continue to run.

**In a second, separate terminal, run the Genkit server:**

```bash
npm run genkit:watch
```
This will start the Genkit development server, which handles the application's AI features. Using the `watch` command is recommended, as it will automatically restart the server when you make changes to files in the `src/ai` directory.

With both terminals running, your local development environment is now fully set up!

## Deploying to Firebase App Hosting

You can deploy this application to the internet using [Firebase App Hosting](https://firebase.google.com/docs/hosting/app-hosting).

### 1. Install the Firebase CLI

If you haven't already, install the Firebase Command Line Interface (CLI) globally on your machine:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

Authenticate with your Google account by running the following command. This will open a browser window for you to log in.

```bash
firebase login
```

### 3. Select your Firebase Project

Associate this local project directory with your Firebase project by running:

```bash
firebase use --add
```

Select your Firebase project from the list when prompted.

### 4. Deploy the Application

Once you are ready to deploy, run the following command in your project's root directory:

```bash
firebase deploy --only apphosting
```

This command builds your Next.js application and deploys it to Firebase App Hosting. When the deployment is complete, the Firebase CLI will output the URL where your live application can be accessed.
