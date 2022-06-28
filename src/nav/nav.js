import { createElement } from "../dom";
import FolderIcon from "../images/folder-svgrepo-com.svg";

function isExpanded(folder) {
  return folder.getAttribute("aria-expanded") === "true";
}

function expandFolder(folder) {
  folder.setAttribute("aria-expanded", true);
}

function collapseFolder(folder) {
  folder.setAttribute("aria-expanded", false);
}

function toggleFolder(folder) {
  if (isExpanded(folder)) {
    collapseFolder(folder);
  } else {
    expandFolder(folder);
  }
}

function onToggleFolder(e) {
  const folder = e.target.closest("a[role=treeitem]");

  toggleFolder(folder);
  e.preventDefault();
  e.stopPropagation();
}

function onKeyDown(e) {
  switch (e.key) {
    case "Left":
    case "ArrowLeft":
      collapseFolder(e.target);
      break;

    case "Right":
    case "ArrowRight":
      expandFolder(e.target);
      break;
  }
}

export default function createNav(folderStructure, hash) {
  const navigationList = createElement(
    "ul",
    { role: "tree" },
    ["treeview-navigation"],
    renderTreeNodes(folderStructure, hash)
  );

  return createElement(
    "nav",
    {
      "aria-label": "File System",
    },
    [],
    [navigationList]
  );
}

function renderTreeNodes(treeNodes, hash, rootPath = []) {
  return treeNodes
    .filter((child) => child.type === "folder")
    .map((folder) => renderFolder(folder, hash, rootPath));
}

function renderFolder(folder, hash, rootPath) {
  const path = [...rootPath, folder.name];
  const pathKey = path.join("/");
  const pathId = path.join("-");
  const expanded = hash.startsWith(pathKey);
  const hasChildren =
    folder.children && folder.children.some((child) => child.type === "folder");

  const ul = createElement(
    "ul",
    {
      id: `id-${pathId}`,
      role: "group",
    },
    ["children"],
    renderTreeNodes(folder.children, hash, path)
  );

  const folderIcon = createElement(
    "img",
    { src: FolderIcon, alt: "Folder Icon" },
    ["folder-icon"]
  );

  const folderName = createElement(
    "span",
    undefined,
    ["folder-name"],
    [folder.name]
  );

  const icon = createElement("span", undefined, ["icon"]);
  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10">
  <polygon points="2 1, 12 1, 7 9"></polygon>
 </svg>`;
  icon.addEventListener("click", onToggleFolder);

  const a = createElement(
    "a",
    () => {
      let attributes = { href: "#/" + pathKey, role: "treeitem" };
      if (hasChildren) {
        attributes = {
          ...attributes,
          "aria-expanded": expanded,
          "aria-owns": "id-" + pathId,
        };
      }
      return attributes;
    },
    undefined,
    [
      createElement("span", undefined, ["label"], () => {
        if (hasChildren) {
          return [icon, folderIcon, folderName];
        }
        return [folderIcon, folderName];
      }),
    ]
  );

  a.addEventListener("keydown", onKeyDown);

  const li = createElement(
    "li",
    { role: "none" },
    () => {
      if (expanded) {
        return ["folder", "expanded"];
      }
      return ["folder"];
    },
    [a, ul]
  );

  return li;
}
