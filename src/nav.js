function isExpanded(folder) {
  return folder.classList.contains("expanded");
}

function delegateEvent(el, type, target, callback) {
  el.addEventListener(type, (e) => {
    if (e.target.matches(target)) {
      callback(e);
    }
  });
}

function onFolderExpandCollapse(e) {
  const folder = e.target.closest(".folder");

  if (isExpanded(folder)) {
    folder.classList.remove("expanded");
  } else {
    folder.classList.add("expanded");
  }
}

export default function createNav(folderStructure) {
  const nav = document.createElement("ul");
  nav.classList.add("nav");

  const childrenElements = renderTreeNodes(folderStructure);
  childrenElements.forEach((childElement) => nav.appendChild(childElement));

  delegateEvent(nav, "click", "span", onFolderExpandCollapse);

  return nav;
}

function renderTreeNodes(treeNodes, rootPath = []) {
  return treeNodes
    .filter((child) => child.type === "folder")
    .map((folder) => renderFolder(folder, rootPath));
}

function renderFolder(folder, rootPath) {
  const path = [...rootPath, folder.name];

  const li = document.createElement("li");
  li.classList.add("folder");

  li.innerHTML = `
  <span class="folder_closed material-symbols-outlined">folder</span>  
  <span class="folder_open material-symbols-outlined">folder_open</span><a href="#/${path.join(
    "/"
  )}">${folder.name}</a>
  `;

  if (folder.children && folder.children.length !== 0) {
    const ul = document.createElement("ul");
    ul.classList.add("children");

    const childrenElements = renderTreeNodes(folder.children, path);

    childrenElements.forEach((childElement) => {
      ul.appendChild(childElement);
    });
    li.appendChild(ul);
  }
  return li;
}
