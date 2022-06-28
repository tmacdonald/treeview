/**
 * Given a file system represented as JSON, return a dictionary of those nodes
 * keyed off the path to that node
 *
 * Used to do quick lookups using the location hash
 *
 * @param {Object} fileSystem
 * @param {*} rootPath
 * @returns
 */
export default function generateFileSystemDictionary(fileSystem) {
  return {
    "": fileSystem,
    ...recursiveGenerator(fileSystem, []),
  };
}

function recursiveGenerator(fileSystem, rootPath = []) {
  return fileSystem
    .filter(
      (node) =>
        node.type === "folder" && node.children && node.children.length > 0
    )
    .reduce((acc, curr) => {
      const path = [...rootPath, curr.name];
      const pathKey = path.join("/");

      return {
        ...acc,
        [pathKey]: curr.children,
        ...recursiveGenerator(curr.children, path),
      };
    }, {});
}
