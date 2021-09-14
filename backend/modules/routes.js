const express = require("express");
const app = express.Router();
const Controller = require("./controller");
const HandleErrors = require("../middlewares/error");

app.post("/initializeWallet", HandleErrors(Controller.initializeWallet));
app.post("/transact/:id", HandleErrors(Controller.transaction));
app.get("/transactions", HandleErrors(Controller.getAllTransactions))
app.get("/wallet/:id", HandleErrors(Controller.getWalletData))


module.exports = app;
