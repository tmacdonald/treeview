import { generateFileSystemDictionary, formatBytes } from "./helpers";

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
  const tr = document.createElement("tr");

  const name =
    node.type === "folder"
      ? `<a href="#/${hash}/${node.name}">${node.name}</a>`
      : node.name;
  const modified = new Date(node.modified).toLocaleDateString();
  const size = formatBytes(node.size);

  tr.innerHTML = `
    <td>${name}</td>
    <td>${modified}</td>
    <td>${size}</td>
  `;
  return tr;
}
