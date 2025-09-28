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
