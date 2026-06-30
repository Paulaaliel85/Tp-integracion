require("dotenv").config();

const fs = require("fs");

const connectRabbitMQ = require("./rabbitmq");

async function iniciarAuditWorker() {

    const { channel, queue } = await connectRabbitMQ();

    console.log("📝 Audit Worker iniciado...");

    channel.consume(queue, (msg) => {

        if (!msg) return;

        const evento = JSON.parse(msg.content.toString());

        console.log("📝 Evento registrado:", evento.type);

        fs.appendFileSync(
            "./logs/audit.log",
            JSON.stringify(evento) + "\n"
        );

        channel.ack(msg);

    });

}

iniciarAuditWorker();