const express = require("express");
const app = express();
const port = 3001;
const mainRouter = require("./routes/index.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
