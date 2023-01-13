import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  //res.json({ message: "hello" });
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("/db", (req, res) => {
  res.status(200);
  res.json([{ title: "predator" }, { title: "konan" }, { title: "avatar" }]);
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") res.status(401).json({ message: "unauthorized" });
  else if (err.type === "input")
    res.status(400).json({ message: "invalid input" });
  else res.status(500).json({ message: "ooops, that on us" });
});

export default app;
