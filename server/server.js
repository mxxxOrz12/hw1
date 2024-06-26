const validator = require("./validator");
validator.checkSetup();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const session = require("express-session");

const api = require("./api.js");
const auth = require("./auth.js");

const mongoConnectionURL =
  "mongodb+srv://402674230ma:maxiao666%40@cluster0.ob7ex29.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const databaseName = "Chat";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
};

mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const app = express();
app.use(validator.checkRoutes);

const corsOptions = {
  origin: "http://localhost:5050",
  credentials: true, // 允许携带cookie
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
  session({
    name: "sid", // 设置cookie的name，默认为 connect.sid
    secret: "zhangsan", // 加密的字符串
    saveUninitialized: false, // 是否每次请求都设置一个cookie用来存储session的id
    resave: false, // 是否在每次请求的时候重新保存session
    cookie: {
      httpOnly: true, // 开启后 前端无法通过js操作，可以有效解决xxs攻击（跨站脚本攻击）
      maxAge: 100000 * 10, // 控制session的过期时间，单位为毫秒
    },
  })
);

app.use("/api", api);
app.use("/auth", auth);

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
