export function generateFileSystemDictionary(fileSystem, rootPath = []) {
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

/**
 * Mostly from a stackoverflow answer https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * but with a bugfix where files larger than 1024 TB would be displayed as 1024 undefined
 *
 * @param {*} bytes
 * @returns A formatted version of the bytes (up to terabytes)
 */
export function formatBytes(bytes) {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "0 bytes";
  }
  const index = Math.min(
    Math.round(Math.floor(Math.log(bytes) / Math.log(1024))),
    4
  );
  return Math.round(bytes / Math.pow(1024, index), 2) + " " + sizes[index];
}
