import express from "express";

const app = express();
const PORT_NUM = 3000;

app.get("/", (req, res) => {
    res.send("hello");
});

console.log("listening at 127.0.0.1:" + PORT_NUM);
app.listen(PORT_NUM);
