import "reset-css";
import "./style.css";
import fileSystem from "./tree.json";

import createNav from "./nav/nav";
import { renderTable } from "./table/table";

const folderTree = createNav(fileSystem, getURLHash());

const nav = document.querySelector("#nav");
const table = document.querySelector("#content .table");

nav.appendChild(folderTree);

function getURLHash() {
  return document.location.hash.replace(/^#\//, "");
}

window.addEventListener("hashchange", () => {
  renderTable(table, fileSystem, getURLHash());
});
renderTable(table, fileSystem, getURLHash());
