# Cribl Take Home Exercise

This is my submission for Cribl's front-end take home coding test.

- [x] The component should be divided into two panes and display a folder tree in the left
      pane and a file/folder list in the right pane (see mockup below).
- [x] It should be possible to expand/collapse folders in the folder tree.
- [x] It should be possible to select a folder in the left or right pane and display the contents of
      the folder in the right pane.
- [x] Provide getters/setters for nodes in this format

The only external dependencies I brought in were `jest` for testing and `express` and `cors` for running the server. `reset-css`is used for baseline styling.

Writing the application without a library like React was an interesting challenge. Creating dom elements manually is very tedious, and I honestly forgot I was using SASS until I didn't have nested classes.

There are tests for file size formatting as well as for a function that generates a path lookup for folders to make it easier for the table to present the correct folder and for the tree to expand automatically based on the location hash.

I've added a small amount of keyboard navigation. You can tab to the various tree items and expand/collapse using the right/left arrows.

The exercise mentions loading the data from an API. I've set up a simple express which serves the local file. There is a fallback in case that isn't used.

## Getting Started

```
npm install
npm start
```

The application will run on port 4628 (GOAT).

You can also run the tree lookup from an express server.

`npm run start-server`

The express server isn't required; it will fall back if it isn't found.

## Testing

```
npm test
```

Note that I've only set up local development. If I were to deploy this, I would create a second webpack file without the development-specific configuration.
