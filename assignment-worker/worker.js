require("dotenv").config();

const connectRabbitMQ = require("./rabbitmq");

async function iniciarWorker() {

    const { channel, queue } = await connectRabbitMQ();

    console.log("👷 Assignment Worker iniciado...");

    channel.consume(queue, (msg) => {

        if (!msg) return;

        const evento = JSON.parse(msg.content.toString());

        console.log("\n==============================");
        console.log("📨 Evento recibido");
        console.log(evento);

        const eventoAsignado = {

            eventId: evento.eventId,

            type: "ticket.assigned",

            occurredAt: new Date().toISOString(),

            version: 1,

            payload: {

                ...evento.payload,

                assignedTo: "Soporte Nivel 1"

            }

        };

        channel.publish(

            process.env.EXCHANGE_NAME,

            "ticket.assigned",

            Buffer.from(JSON.stringify(eventoAsignado))

        );

        console.log("✅ Ticket asignado correctamente");

        channel.ack(msg);

    });

}

iniciarWorker();