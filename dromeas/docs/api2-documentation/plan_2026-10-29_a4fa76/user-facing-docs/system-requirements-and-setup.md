# System requirements and setup

This guide walks you through getting a working copy of the application running on your own computer. After completing these steps, you will have a local development environment where you can explore, modify, and test the app.

## What you need before you start

Before you install the application, make sure your computer has the following tools available:

| Requirement | What you need | Why it matters |
|---|---|---|
| Node.js | A current Long-Term Support (LTS) release | Runs the development server and the build process |
| npm | Installed with Node.js | Installs dependencies and runs project commands |
| Git | Any recent version | Copies the project from its repository |
| Web browser | A recent version of Chrome, Firefox, Edge, or Safari | Opens and runs the app |
| Terminal | Any terminal application | Lets you enter the setup commands |

The project's setup instructions require Node.js and npm but do not specify exact minimum versions. If you do not have Node.js installed, you can install it with nvm, a tool that manages Node.js versions on your computer.

To check whether Node.js and npm are already available, open a terminal and run:

```sh
node -v
npm -v
```

Each command should display a version number. If either command is not recognized, install Node.js and npm first.

## Useful commands

After the initial setup, the following commands are available from the project folder:

| Command | What it does |
|---|---|
|`npm run dev` | Starts the local development server |
|`npm run build` | Creates a production-ready build of the app |
|`npm run build:dev` | Creates a development-mode build |
|`npm run preview` | Lets you preview the production build locally |
|`npm run lint` | Checks the project for potential code quality issues |
|`npm run format` | Formats the project files according to style rules |
|`npm run test` | Runs the automated test suite |
|`npm run test:watch` | Runs the automated test suite and watches for changes |

To create a production build, stop the development server if it is still running, then run:

```sh
npm run build
```

To preview that build locally, run:

```sh
npm run preview
```

## Browser compatibility

The project instructions do not list an explicit set of supported browsers. The app is built with modern web technologies, so use a current version of a major browser such as Chrome, Firefox, Edge, or Safari for the best experience.

## Common setup issues

If a command fails during setup, try these checks:

1. Confirm that Node.js and npm are installed by running`node -v` and`npm -v`.
2. Confirm that you are in the project folder you cloned. The folder name should match the repository name you used with`cd`.
3. If the development server does not start, close the terminal, open a new one, and run`npm run dev` again.

Now that the app is running, see the [Quick Start Guide](doc:27bdcaf5-0df9-412f-9cd1-5eaf702b8d97) for a fast tour of the main screens. You can also explore the [Product Overview and Key Concepts](doc:3a2f38ea-1eb7-45d0-91ef-d101d4eb349c) to understand the core ideas, or review [Navigation and Layout Modes](doc:971aeb74-0ca3-46ee-9e46-5b25c15adc24) to learn how to move around the application.
