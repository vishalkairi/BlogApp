require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./db/connectDb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./router/authRoutes");
const postRouter = require("./router/postRouter");
const app = express();
console.log(__dirname + "/uploads");
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
// app.use("/", (req, res) => {
//   res.send("Hello");
// });
app.use("/auth", authRouter);
app.use("/profile", async (req, res) => {
  console.log(`request received`);
  const { token } = req.cookies;
  try {
    const istTokenValid = await jwt.verify(token, process.env.SECRET_KEY);
    res.json(istTokenValid);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.use("/post", postRouter);

async function start() {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(4000, () => console.log(`Server started at 4000`));
  } catch (error) {
    console.log(error);
  }
}

start();
