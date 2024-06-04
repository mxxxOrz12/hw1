const validator = require("./validator");
validator.checkSetup();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const api = require("./api.js");

const mongoConnectionURL =
  "mongodb+srv://402674230ma:maxiao666%40@cluster0.ob7ex29.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const databaseName = "Blog";
const options = { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName };

mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const app = express();
app.use(validator.checkRoutes);

app.use(express.json());

app.use("/api", api);

const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
