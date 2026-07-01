const amqp = require("amqplib");
require("dotenv").config();

async function connectRabbitMQ() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    const channel = await connection.createChannel();

    await channel.assertExchange(
        process.env.EXCHANGE_NAME,
        "topic",
        { durable: true }
    );

    const queue = "helpdesk.assignment";

    await channel.assertQueue(queue, {
        durable: true
    });

    await channel.bindQueue(
        queue,
        process.env.EXCHANGE_NAME,
        "ticket.created.#"
    );

    return { channel, queue };

}
module.exports = connectRabbitMQ;