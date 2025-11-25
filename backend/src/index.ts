import express, { Response } from "express";
import router from "./routes";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use("/api/v1", router);

app.get("/", (_, res: Response) => {
  res.send("Server is up");
});

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch(console.error);

app.listen(port, () => {
  console.log("Server is listening on port: ", port);
});
