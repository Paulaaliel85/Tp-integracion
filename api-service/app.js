require("dotenv").config();
const express = require("express");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(express.json());

app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` API iniciada en http://localhost:${PORT}`);
});