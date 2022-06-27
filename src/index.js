import "reset-css";
import "./style.css";

import { getURLHash } from "./dom";
import createNav from "./nav/nav";
import { renderTable } from "./table/table";

import backupFileSystem from "./tree.json";

fetch("http://localhost:4629/tree.json")
  .then((response) => response.json())
  .catch(() => backupFileSystem)
  .then((fileSystem) => {
    const folderTree = createNav(fileSystem, getURLHash());

    const nav = document.querySelector("#nav");
    const table = document.querySelector("#content .table");

    nav.appendChild(folderTree);

    window.addEventListener("hashchange", () => {
      renderTable(table, fileSystem, getURLHash());
    });
    renderTable(table, fileSystem, getURLHash());
  });
