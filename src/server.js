const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const port = 4629;

const tree = require("./tree.json");

app.get("/tree.json", (req, res) => {
  res.json(tree);
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
