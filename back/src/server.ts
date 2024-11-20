import express from "express";
import indexRouter from "./routes/indexRouter";
import cors from "cors";
import path from "path";
import morgan from "morgan";

const server = express();

server.use(express.static(path.join(__dirname, "../../front", "dist")));

server.use(cors());

server.use(express.json());

server.use(morgan("dev"));

server.use("/api", indexRouter);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../front/dist", "index.html"));
});

export default server;
