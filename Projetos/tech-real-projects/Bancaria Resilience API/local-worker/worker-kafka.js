const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// --- CONFIGURAÇÃO DO MONGODB ---
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUri);
const dbName = 'bank_resilience';

// --- CONFIGURAÇÃO DO KAFKA (AIVEN) ---
const kafka = new Kafka({
  clientId: 'bank-resilience-worker',
  brokers: ['kafka-bank-resilience-banking-resilience-lab.f.aivencloud.com:27515'],
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(__dirname, '../infra/ca.pem'), 'utf8')],
    key: fs.readFileSync(path.join(__dirname, '../infra/service.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '../infra/service.cert'), 'utf8')
  },
});

const consumer = kafka.consumer({ groupId: 'grupo-bancario-resilience' });

const rodarSistemas = async () => {
  // 1. Conectar ao MongoDB
  await client.connect();
  const db = client.db(dbName);
  const colecao = db.collection('transacoes');
  console.log("🍃 Conectado ao MongoDB com sucesso!");

  // 2. Conectar ao Kafka
  await consumer.connect();
  console.log("✅ Worker Kafka pronto e aguardando...");

  await consumer.subscribe({ topic: 'transacoes-pendentes', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transacao = JSON.parse(message.value.toString());
      
      console.log(`📥 Processando: ${transacao.id} | R$ ${transacao.valor}`);

      try {
        // 3. Persistir no Banco de Dados (Resiliência de Dados)
        const resultado = await colecao.insertOne({
          ...transacao,
          processado_em: new Date(),
          origem: 'KAFKA_AIVEN'
        });
        
        console.log(`💾 Transação salva no MongoDB! ID: ${resultado.insertedId}`);
      } catch (err) {
        console.error("❌ Erro ao salvar no MongoDB:", err);
        // No Kafka, se não dermos "commit", a mensagem volta para a fila para reprocessamento
      }
    },
  });
};

rodarSistemas().catch(console.error);