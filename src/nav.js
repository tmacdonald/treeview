import { delegateEvent } from "./helpers";

function isExpanded(folder) {
  return folder.classList.contains("expanded");
}

function expandFolder(folder) {
  folder.classList.add("expanded");
  folder.setAttribute("aria-expanded", true);
}

function collapseFolder(folder) {
  folder.classList.remove("expanded");
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

function onKeyupFolder(e) {
  const folder = e.target.closest(".folder");
  if (e.key === "ArrowRight") {
    expandFolder(folder);
  } else if (e.key === "ArrowLeft") {
    collapseFolder(folder);
  }
}

export default function createNav(folderStructure, hash) {
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "File System");
  const navigationList = document.createElement("ul");
  navigationList.classList.add("treeview-navigation");
  navigationList.setAttribute("role", "tree");
  nav.appendChild(navigationList);

  const childrenElements = renderTreeNodes(folderStructure, hash);
  childrenElements.forEach((childElement) =>
    navigationList.appendChild(childElement)
  );

  delegateEvent(
    navigationList,
    "click",
    ["span.icon", "span.icon > svg", "span.icon > svg > polygon"],
    onToggleFolder
  );
  // navigationList.addEventListener("click", (e) => {
  //   console.log("click");

  //   e.preventDefault();
  //   e.stopPropagation();
  // });
  delegateEvent(navigationList, "keyup", ["a[role=treeitem]"], onKeyupFolder);

  return nav;
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

  const li = document.createElement("li");
  li.setAttribute("role", "none");
  li.classList.add("folder");

  if (expanded) {
    li.classList.add("expanded");
  }

  const a = document.createElement("a");
  a.setAttribute("href", "#/" + pathKey);
  if (hasChildren) {
    a.setAttribute("role", "treeitem");
    a.setAttribute("aria-expanded", expanded);
    a.setAttribute("aria-owns", "id-" + pathId);
  }
  a.innerHTML = `
  <span class="label">
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10">
                 <polygon points="2 1, 12 1, 7 9"></polygon>
                </svg>
              </span>
              ${folder.name}
            </span>`;
  li.appendChild(a);

  //<span class="material-symbols-outlined">folder_open</span>

  if (hasChildren) {
    const ul = document.createElement("ul");
    ul.setAttribute("id", `id-${pathId}`);
    ul.setAttribute("role", "group");
    ul.classList.add("children");

    const childrenElements = renderTreeNodes(folder.children, hash, path);

    childrenElements.forEach((childElement) => {
      ul.appendChild(childElement);
    });
    li.appendChild(ul);
  }
  return li;
}
