import dotenv from "dotenv";

const envFile = `.${process.env.NODE_ENV || "development"}.env`;
dotenv.config({ path: envFile });

console.log("Loaded ENV:", envFile);
