const { Kafka } = require('kafkajs');
const fs = require('fs');
const path = require('path');

const kafka = new Kafka({
  clientId: 'bank-resilience-test',
  brokers: ['kafka-bank-resilience-banking-resilience-lab.f.aivencloud.com:27515'],
  ssl: {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(path.join(__dirname, '../infra/ca.pem'), 'utf8')],
    key: fs.readFileSync(path.join(__dirname, '../infra/service.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '../infra/service.cert'), 'utf8')
  },
});

const producer = kafka.producer();

const enviar = async () => {
  await producer.connect();
  const payload = { id: "TX-91-MILHOES", valor: 91000000, status: "sucesso" };
  
  await producer.send({
    topic: 'transacoes-pendentes',
    messages: [{ value: JSON.stringify(payload) }],
  });

  console.log("🚀 Transação enviada ao Kafka com sucesso!");
  await producer.disconnect();
};

enviar().catch(console.error);