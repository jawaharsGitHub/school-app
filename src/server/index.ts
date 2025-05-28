import express from "express";
import { remultApi } from 'remult/remult-express';
import { api } from "./api";


const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(api);
//const PORT = process.env.PORT || 3000;
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

app.get("/api/hi", (req, res) => {
  res.send("Hello, World!");
});

