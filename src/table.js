export function createTable() {
  const table = document.createElement("table");
  return table;
}

export function renderTable(table, children) {
  console.log(table, children);

  while (table.hasChildNodes()) {
    table.removeChild(table.lastChild);
  }

  const thead = renderTableHeader();
  const tbody = renderTableBody(children);

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

function renderTableBody(folderContents) {
  const tbody = document.createElement("tbody");

  folderContents
    .map((node) => renderTableRow(node))
    .forEach((tableRow) => tbody.appendChild(tableRow));

  return tbody;
}

function renderTableRow(node) {
  const tr = document.createElement("tr");

  const modified = new Date(node.modified);

  tr.innerHTML = `
    <td>${node.name}</td>
    <td>${modified}</td>
    <td>${node.size}</td>
  `;
  return tr;
}
