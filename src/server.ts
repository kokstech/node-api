import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

// const customLoger = (message) => (req, res, next) => {
//     console.log(`Hello ${message}`);
//     next();
// };

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(customLoger("kita"));

// app.use((req, res, next) => {
//     req.kita = "kiturina";
//     next();
// });

app.get("/", (req, res) => {
    res.status(200);
    res.json({ message: "hello you" });
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
