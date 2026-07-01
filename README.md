# TP Integración de Aplicaciones - Comunicación por Eventos con RabbitMQ

La aplicación recibe solicitudes de soporte mediante una API REST y publica eventos en RabbitMQ. Los distintos servicios consumen esos eventos para realizar tareas independientes.

## Tecnologías utilizadas
Node.js
Express
RabbitMQ
Docker Desktop
amqplib
UUID
Nodemon

## Arquitectura

 **API Service:** recibe solicitudes mediante `POST /tickets` y publica el evento `ticket.created`.
 **Assignment Worker:** consume el evento, asigna un responsable y publica `ticket.assigned`.
 **Audit Worker:** registra todos los eventos del dominio en `logs/audit.log`.

## Prueba

Realizar un POST:
http://localhost:3000/tickets

Body:
{
    "title":"No puedo ingresar",
    "description":"Error 403",
    "priority":"high"
}

## Funcionamiento 
El usuario realiza una petición POST /tickets.
La API crea el evento ticket.created.
RabbitMQ recibe el evento en el exchange helpdesk.events.
El Assignment Worker consume el evento y asigna un responsable.
El Assignment Worker publica el evento ticket.assigned.
El Audit Worker registra todos los eventos en logs/audit.log.
