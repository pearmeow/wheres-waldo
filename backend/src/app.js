import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

// parses json requests
app.use(express.json());

// parses post requests
app.use(express.urlencoded({ extended: true }));

app.use("/pictures", routes.pictures);
// app.use("/leaderboard", routes.leaderboard);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`App listening at http://127.0.0.1:${PORT}`);
});
