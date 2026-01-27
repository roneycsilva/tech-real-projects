const amqp = require('amqplib');
const { Redis } = require("@upstash/redis");
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Configurações de Conexão
const redis = new Redis({
  url: 'https://becoming-beagle-55507.upstash.io',
  token: 'AdjTAAIncDFkNjdjOGVlNGRiOGY0ZTI5OGMwMjQwYTBhYjAxYmVjNnAxNTU1MDc',
});

const mongoUri = process.env.MONGO_URI; 
const mongoClient = new MongoClient(mongoUri);

async function iniciarProcessador() {
    try {
        // Conecta ao MongoDB e RabbitMQ
        await mongoClient.connect();
        const db = mongoClient.db('Lab_Vendas');
        const col = db.collection('pedidos');

        const conexao = await amqp.connect('amqp://espaqmzb:RG-bpdwrxC3nazUv0P4qcDYitLH0JmW5@jackal.rmq.cloudamqp.com/espaqmzb');
        const canal = await conexao.createChannel();
        const fila = 'vendas_cloud';

        await canal.assertQueue(fila, { durable: true });
        console.log(" [🟢] Processador ON! Aguardando vendas vindo do Railway...");

        // Fica "escutando" a fila
        canal.consume(fila, async (msg) => {
            const venda = JSON.parse(msg.content.toString());
            const chaveIdempotencia = `venda_processada:${venda.id_venda}`;

            // 1. Checa no Upstash se a venda é repetida
            const jaExiste = await redis.get(chaveIdempotencia);

            if (jaExiste) {
                console.log(` [⚠️] Venda ${venda.id_venda} ignorada: Já processada anteriormente.`);
                canal.ack(msg);
                return;
            }

            // 2. Se for nova, salva no MongoDB
            await col.insertOne(venda);
            
            // 3. Marca no Upstash para não repetir
            await redis.set(chaveIdempotencia, "true", { ex: 86400 }); 

            console.log(` [✅] SUCESSO: Venda ${venda.id_venda} enviada pelo Postman e salva no MongoDB!`);
            canal.ack(msg);
        });

    } catch (error) {
        console.error("Erro no processador:", error);
    }
}

iniciarProcessador();