import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
 
import mobileRoutes from "./routes/mobileRoute.js";
import utilRoutes from "./routes/utilRoute.js";
import webRoutes from "./routes/webRoute.js";

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 8081;

mongoose.connect(CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(PORT, () => {
  console.log("Server Started on port " + PORT);
});

app.use("/mapi", mobileRoutes);
app.use("/util", utilRoutes);
app.use("/wapi", webRoutes);

app.get("/", (_, res) => {
  res.send("Hello from the profile backend!");
});

app.get("/:any", (_, res) => {
  res.status(404).json({ message: "404 Page not found" });
});