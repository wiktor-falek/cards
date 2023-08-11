# Getting Started

## Installation

```bash
# clone the project
git clone git@github.com:wiktor-falek/cards.git

# run install command
npm install

```

**Folders structure**

This project uses npm workspaces to set up a monorepo. Inside the package file in the root folder, there are some scripts that can be used to _run_ or _manage dependencies_.

```
├── frontend                 // Workspace for the client
│   ├── public
│   ├── src                  // React app folder
│   ├── index.html
│   ├── package.json
├── socket-server            // Workspace for the backend
│   ├── src
│   ├── package.json
├── node_modules             // One single modules folder for the monorepo
├── package.json
└── .gitignore
```

From the **root folder** you can:

1. Run both workspaces, the _frontend_ and the _backend_, concurrently by using one command:

```
npm run dev
```

2. Run the _frontend_ or the _backend_ separately:

```
npm run dev:client

npm run dev:backend
```

You can also _install_ or _uninstall_ dependencies by:

1. Using the following commands for the frontend workspace:

```
npm run i-client _package_name_  // To install
npm run uni-client _package_name_ // To uninstall
```

2. Using the following commands for the backend workspace:

```
npm run i-backend _package_name_  // To install
npm run uni-backend _package_name_ // To uninstall
```

Alternatively, you can navigate to the "frontend" and "socket-server" directories and use regular npm commands to manage dependencies and perform other tasks related to each workspace.

## Tech stack

**frontend**

- Vite
- React
- TypeScript
- CSS
- Socket.io

**Backend**

- ExpressJs
- Socket.io
- TypeScript
