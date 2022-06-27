This is my submission for Cribl's front-end take home coding test.

[x] ]The component should be divided into two panes and display a folder tree in the left
pane and a file/folder list in the right pane (see mockup below).
[x] It should be possible to expand/collapse folders in the folder tree.
[x] It should be possible to select a folder in the left or right pane and display the contents of
the folder in the right pane.
[x] Provide getters/setters for nodes in this format

Writing the application without a library like React was an interesting challenge. I ended up writing a `createElement` function that was meant to clean up the rendering a bit.

There are tests for file size formatting as well as for a function that generates a path lookup for folders to make it easier for the table to present the correct folder and for the tree to expand automatically based on the location hash.

I've added a small amount of keyboard navigation. You can tab to the various tree items and expand/collapse using the right/left arrows.
