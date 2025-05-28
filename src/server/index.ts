import express from "express";

const app = express();
//const PORT = process.env.PORT || 3000;
app.listen(3002, () => {
  console.log("Server is running on port 3002 ok?");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

