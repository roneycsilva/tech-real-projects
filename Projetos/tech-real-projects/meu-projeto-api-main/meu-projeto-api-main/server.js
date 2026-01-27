const express = require('express');
const amqp = require('amqplib');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Configuração de Porta Dinâmica para o Railway
// O Railway define a porta automaticamente na variável process.env.PORT
const PORT = process.env.PORT || 3000;

// 2. URL do RabbitMQ (Protocolo AMQP para evitar erros de SSL alert 80)
const URL_RABBIT = process.env.URL_RABBIT || 'amqp://espaqmzb:RG-bpdwrxC3nazUv0P4qcDYitLH0JmW5@jackal.rmq.cloudamqp.com/espaqmzb';

app.post('/novo-pedido', async (req, res) => {
    try {
        const pedido = req.body;
        console.log(" [📩] Recebido do Postman:", pedido);

        // Conecta ao RabbitMQ
        const conexao = await amqp.connect(URL_RABBIT);
        const canal = await conexao.createChannel();
        const fila = 'vendas_cloud';

        await canal.assertQueue(fila, { durable: true });
        canal.sendToQueue(fila, Buffer.from(JSON.stringify(pedido)));

        console.log(" [🚀] Pedido enviado para a fila!");

        // Fecha a conexão após o envio
        setTimeout(() => conexao.close(), 500);
        
        res.status(201).json({ 
            mensagem: "Pedido enviado para a fila!",
            pedido: pedido 
        });
    } catch (erro) {
        console.error(" [❌] Erro no Servidor:", erro);
        res.status(500).json({ 
            erro: "Erro interno no servidor",
            detalhes: erro.message 
        });
    }
});

// 3. Ajuste Crítico: Bind em '0.0.0.0' para o Railway não desligar o container
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 API PROFISSIONAL! Rodando na porta ${PORT}`);
});