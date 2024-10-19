const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const MONGODB_URI_PROD = 'mongodb://localhost:27017/todo-demo';
console.log("mongoouri", MONGODB_URI_PROD);

app.use(cors()); // 모든 출처 허용
app.use(bodyParser.json());
app.use("/api", indexRouter); // api 주소를 명확하게 구분하는 것이 좋음. 주소 앞에 api가 붙음

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

// Heroku가 제공하는 PORT 환경 변수를 사용해야 함 // 없을땐 http://localhost:9999주소 사용가능
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});