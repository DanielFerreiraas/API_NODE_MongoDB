const express = require("express");
const AuthController = require("./controllers/AuthController");

const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json());

app.use("/auth", AuthController);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({'Erro': err.message});
});

app.listen(3000, () =>{
    console.log("Server is Running")
});