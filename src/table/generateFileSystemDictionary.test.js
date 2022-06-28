import generateFileSystemDictionary from "./generateFileSystemDictionary";

it("should return an empty dictionary if given an empty list", () => {
  expect(generateFileSystemDictionary([])).toEqual({ "": [] });
});

it("should return the path to the first node if there is only a simple node present", () => {
  const tree = [
    {
      type: "folder",
      name: "SimpleTree",
      modified: 1556122995117,
      size: 0,
    },
  ];

  const dictionary = generateFileSystemDictionary(tree);
  expect(Object.keys(dictionary)).toEqual([""]);
});

it("should handle nested nodes", () => {
  const tree = [
    {
      type: "folder",
      name: "RootNode",
      modified: 1556122995117,
      size: 0,
      children: [
        {
          type: "folder",
          name: "ChildNode",
          modified: 1556122995117,
          size: 0,
          children: [
            {
              type: "folder",
              name: "GrabdChildNode",
              modified: 1556122995117,
              size: 0,
            },
          ],
        },
      ],
    },
  ];

  const dictionary = generateFileSystemDictionary(tree);
  expect(Object.keys(dictionary)).toEqual([
    "",
    "RootNode",
    "RootNode/ChildNode",
  ]);
});

it("should not generate a key for files", () => {
  const tree = [
    {
      type: "folder",
      name: "RootNode",
      modified: 1556122995117,
      size: 0,
      children: [
        {
          type: "file",
          name: "ChildNode",
          modified: 1556122995117,
          size: 0,
        },
      ],
    },
  ];

  const dictionary = generateFileSystemDictionary(tree);
  expect(Object.keys(dictionary)).toEqual(["", "RootNode"]);
});
