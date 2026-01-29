const amqp = require('amqplib');
const mongoose = require('mongoose');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = 'transacoes-pendentes'; // NOME CORRIGIDO CONFORME DASHBOARD

// Conexão com MongoDB Local
mongoose.connect(process.env.MONGO_LOCAL_URI)
    .then(() => console.log("🍃 MongoDB Local: Conectado com sucesso!"))
    .catch(err => console.error("❌ Erro ao conectar no MongoDB:", err));

// Schema simples para salvar a transação
const Transacao = mongoose.model('Transacao', new mongoose.Schema({
    id: String,
    cliente: Object,
    valor: Number,
    moeda: String,
    seguranca: Object,
    data_processamento: { type: Date, default: Date.now }
}));

async function iniciarWorker() {
    try {
        console.log("--------------------------------------------------");
        console.log("👷 WORKER BANCÁRIO ATIVADO");
        console.log("--------------------------------------------------");
        
        const conexao = await amqp.connect(RABBITMQ_URL);
        const canal = await conexao.createChannel();

        await canal.assertQueue(QUEUE_NAME, { durable: true });
        
        console.log(`📡 RabbitMQ: Conectado`);
        console.log(`🔍 Lendo a fila: [${QUEUE_NAME}]`);

        canal.prefetch(1);

        canal.consume(QUEUE_NAME, async (msg) => {
            if (msg !== null) {
                try {
                    const dados = JSON.parse(msg.content.toString());
                    
                    // Salvando no MongoDB
                    await Transacao.create(dados);

                    console.log(`✅ Processado e Salvo: ${dados.id} | R$ ${dados.valor}`);
                    
                    canal.ack(msg);
                } catch (err) {
                    console.error("❌ Erro no processamento:", err.message);
                    canal.nack(msg, false, false);
                }
            }
        });

    } catch (erro) {
        console.error("❌ Erro fatal:", erro.message);
    }
}

iniciarWorker();