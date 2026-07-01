require("dotenv").config();

const express = require("express");
const ticketRoutes = require("./routes/ticketRoutes");
const { connectRabbitMQ } = require("./rabbitmq/connection");
const app = express();

app.use(express.json());

app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;

connectRabbitMQ().then(() => {

    app.listen(PORT, () => {
        console.log(` API iniciada en http://localhost:${PORT}`);
    });

});