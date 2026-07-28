import express from "express";
import "dotenv/config";

const app = express();

// parses json requests
app.use(express.json());

// parses post requests
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello");
});

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`App listening at http://127.0.0.1:${PORT}`);
});
