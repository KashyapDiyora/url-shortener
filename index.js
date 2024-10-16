import express from "express"
import {dbConnect} from "./connection.js"
import {router} from "./routes/url.router.js"

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/url',router);


dbConnect("mongodb://127.0.0.1:27017/url-short").then(() => {
    app.listen(PORT,() => {
        console.log(`Server is Running on ${PORT}`);
    })
});