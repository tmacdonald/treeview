import "./style.css";
import folderStructure from "./tree.json";

import createNav from "./nav";
import { createTable, renderTable } from "./table";

export const getURLHash = () => document.location.hash.replace(/^#\//, "");

function generateFolderDictionary(folderStructure, rootPath = []) {
  return folderStructure
    .filter((node) => node.type === "folder")
    .reduce((acc, curr) => {
      const path = [...rootPath, curr.name];
      const pathKey = path.join("/");

      if (curr.children) {
        return {
          ...acc,
          [pathKey]: curr,
          ...generateFolderDictionary(curr.children, path),
        };
      } else {
        return {
          ...acc,
          [pathKey]: curr,
        };
      }
    }, {});
}

const folderDictionary = generateFolderDictionary(folderStructure);

const nav = createNav(folderStructure);
const table = createTable();

window.addEventListener("hashchange", (event) => {
  renderTable(table, folderDictionary[getURLHash()].children);
});

document.body.appendChild(nav);
document.body.appendChild(table);
