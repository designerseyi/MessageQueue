const amqp = require("amqplib");

const msg = {number:process.argv[2]}
connect();

async function connect(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

         await channel.assertQueue("Jobs");

         channel.sendToQueue("Jobs",Buffer.from(JSON.stringify(msg)))

        console.log(`Job ${msg.number} pushed`)

        await channel.close()
        await connection.close()

    } catch (error) {
        console.error(error)
    }
}