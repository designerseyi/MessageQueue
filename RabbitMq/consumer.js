const amqp = require("amqplib");

connect();

async function connect(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

         await channel.assertQueue("Jobs");

        channel.consume("Jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`you recieved a  job -  ${input.number}`);
            
            //  for ack
            if(input.number == 7)
             channel.ack(message)
        })

        console.log("waiting for job");

    } catch (error) {
        console.error(error)
    }
}