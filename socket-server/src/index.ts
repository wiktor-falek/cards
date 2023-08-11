import express from "express";

const app = express();
const port = process.env.SERVER_PORT;

app.get("/", ({ res }) => {
  if (res) res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
