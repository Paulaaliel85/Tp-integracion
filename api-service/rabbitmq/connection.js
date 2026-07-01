const amqp = require("amqplib");
require("dotenv").config();

let channel;

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);

        channel = await connection.createChannel();

        await channel.assertExchange(
            process.env.EXCHANGE_NAME,
            "topic",
            {
                durable: true
            }
        );

        console.log("🐰 Conectado a RabbitMQ");

    } catch (error) {
        console.error("Error al conectar RabbitMQ:", error);
    }
}
function getChannel() {
    return channel;
}
module.exports = {
    connectRabbitMQ,
    getChannel
};