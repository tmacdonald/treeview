import formatBytes from "./formatBytes";
import generateFileSystemDictionary from "./generateFileSystemDictionary";

function clearElement(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

export function renderTable(table, fileSystem, hash) {
  clearElement(table);

  const fileSystemDictionary = generateFileSystemDictionary(fileSystem);
  const children = fileSystemDictionary[hash]?.children || [];

  const thead = renderTableHeader();
  const tbody = renderTableBody(children, hash);

  table.appendChild(thead);
  table.appendChild(tbody);
}

function renderTableHeader() {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  tr.appendChild(renderTableHeading(""));
  tr.appendChild(renderTableHeading("Name"));
  tr.appendChild(renderTableHeading("Date Modified"));
  tr.appendChild(renderTableHeading("Fize Size"));

  thead.appendChild(tr);
  return thead;
}

function renderTableHeading(name) {
  const th = document.createElement("th");
  th.innerText = name;
  return th;
}

function renderTableBody(folderContents, hash) {
  const tbody = document.createElement("tbody");

  folderContents
    .map((node) => renderTableRow(node, hash))
    .forEach((tableRow) => tbody.appendChild(tableRow));

  return tbody;
}

function renderTableRow(node, hash) {
  return node.type === "folder"
    ? renderTableRowFolder(node, hash)
    : renderTableRowFile(node);
}

function renderTableRowFile(node) {
  const tr = document.createElement("tr");

  const name = node.name;
  const modified = new Date(node.modified).toLocaleDateString();
  const size = formatBytes(node.size);

  tr.innerHTML = `
    <td><span class="material-symbols-outlined">description</span></td>
    <td>${name}</td>
    <td>${modified}</td>
    <td>${size}</td>
  `;
  return tr;
}

function renderTableRowFolder(node, hash) {
  const tr = document.createElement("tr");

  const name = `<a class="folder-name" href="#/${hash}/${node.name}">${node.name}</a>`;
  const modified = new Date(node.modified).toLocaleDateString();

  tr.innerHTML = `
    <td><span class="inline-icon material-symbols-outlined">folder_open</span></td>
    <td>${name}</td>
    <td>${modified}</td>
    <td></td>
  `;
  return tr;
}
