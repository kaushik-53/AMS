# EduTrack - Modern Attendance Management

This is a Next.js starter project for EduTrack, a modern attendance management system built with Firebase Studio.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Install Dependencies

First, install the necessary project dependencies using npm:

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

This project requires two separate development servers to be running at the same time:

1.  **Next.js Development Server:** This runs the main web application.
2.  **Genkit Development Server:** This runs the backend AI flows.

Open two separate terminal windows or tabs and run the following commands:

**In the first terminal, run the Next.js app:**

```bash
npm run dev
```
The application will be available at `http://localhost:9002`.

**In the second terminal, run the Genkit server:**

```bash
npm run genkit:dev
```
This will start the Genkit development server, allowing the AI features of the application to function correctly.

You are now all set up to run and develop the EduTrack application locally!
