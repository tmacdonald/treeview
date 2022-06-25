import "reset-css";
import "./style.css";
import fileSystem from "./tree.json";

import createNav from "./nav";
import { renderTable } from "./table/table";

const folderTree = createNav(fileSystem);

const nav = document.querySelector("#nav");
const table = document.querySelector("#content .table");

nav.appendChild(folderTree);

function getURLHash() {
  return document.location.hash.replace(/^#\//, "");
}

window.addEventListener("hashchange", (event) => {
  renderTable(table, fileSystem, getURLHash());
});
renderTable(table, fileSystem, getURLHash());
