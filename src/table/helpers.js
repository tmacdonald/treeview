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

export function formatBytes(bytes) {
  if (bytes / Math.pow(1024, 2) >= 1.0) {
    return Math.floor(bytes / Math.pow(1024, 2)) + " MB";
  } else if (bytes / 1024 >= 1.0) {
    return Math.floor(bytes / 1024) + " KB";
  }
  return bytes + " bytes";
}
