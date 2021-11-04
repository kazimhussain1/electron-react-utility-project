# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## For Development

In the project directory, you can run:

### `npm run dev` or `yarn run dev`

Launches the electron main and react concurrently

## For Build and Packaging

### 1. `npm run build` or `yarn run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### 2. `npm run build-electron-win` or `yarn run build-electron-win`

Copies the electron folder into the build folder where built react app resides, so that the electron main and react renderer processes can be package into one file in the next step

### 3. `npm run package-win` or `yarn run package-win`

Packages the react and electron application into a single windows executable file
