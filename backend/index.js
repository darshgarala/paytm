const express = require("express");
const app = express();
const port = 3001;
const mainRouter = require("./routes/index.js");

app.use("/api/v1", mainRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
