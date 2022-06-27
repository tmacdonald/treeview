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
export default function generateFileSystemDictionary(
  fileSystem,
  rootPath = []
) {
  return fileSystem
    .filter((node) => node.type === "folder")
    .reduce((acc, curr) => {
      const path = [...rootPath, curr.name];
      const pathKey = path.join("/");

      if (curr.children) {
        return {
          ...acc,
          [pathKey]: curr,
          ...generateFileSystemDictionary(curr.children, path),
        };
      } else {
        return {
          ...acc,
          [pathKey]: curr,
        };
      }
    }, {});
}
