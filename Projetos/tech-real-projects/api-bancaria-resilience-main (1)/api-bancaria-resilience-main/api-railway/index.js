// 1. IMPORTAÇÃO DAS BIBLIOTECAS
const express = require('express');
const amqp = require('amqplib');
const axios = require('axios');
require('dotenv').config();

// 2. INICIALIZAÇÃO DO SERVIDOR
const app = express();
app.use(express.json());

// 3. ROTA DE VENDA (Com 'async' para permitir o 'await')
app.post('/venda', async (req, res) => {
    const venda = req.body;
    console.log("==> Nova transação recebida:", venda.id || "Sem ID");

    // PASSO 1: LOG DE AUDITORIA (UPSTASH QSTASH)
    try {
        const destinoLog = "https://example.com";
        const urlFinalQStash = `${process.env.QSTASH_URL}${destinoLog}`;

        await axios.post(urlFinalQStash, venda, {
            headers: { 
                'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(" [LOG] Auditoria registrada com sucesso no Upstash (USA)");
    } catch (logError) {
        console.warn(` [AVISO] QStash indisponível (Status ${logError.response?.status || 'OFFLINE'}).`);
    }

    // PASSO 2: ENVIO PARA A FILA (CLOUDAMQP)
    try {
        // Agora o await está dentro de uma função async, o erro vai sumir
        const conn = await amqp.connect(process.env.RABBITMQ_URL, { timeout: 10000 });
        const channel = await conn.createChannel();
        const fila = 'transacoes-pendentes';

        await channel.assertQueue(fila, { durable: true });
        
        channel.sendToQueue(fila, Buffer.from(JSON.stringify(venda)), { 
            persistent: true 
        });

        console.log(" [QUEUE] Enviado para CloudAMQP com sucesso!");
        
        // Pequeno atraso para garantir a entrega antes de fechar a conexão
        setTimeout(async () => {
            await channel.close();
            await conn.close();
        }, 1000);
        
        return res.status(202).json({ 
            mensagem: "Venda aceita e em processamento!", 
            id: venda.id 
        });

    } catch (queueError) {
        console.error(" !!! ERRO CRÍTICO NO RABBITMQ:", queueError.message);
        return res.status(500).json({ erro: "Falha ao registrar venda na fila" });
    }
});

// 4. INÍCIO DA API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API ONLINE NA PORTA ${PORT}`);
    console.log("Aguardando conexões do Postman...");
});