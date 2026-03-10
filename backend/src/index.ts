import "./config/env.js";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/data-source.js";
import router from "./routes/index.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch(console.error);

app.get("/", (_, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
