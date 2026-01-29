const mongoose = require('mongoose');
require('dotenv').config();

async function realizarAuditoria() {
    try {
        console.log("--------------------------------------------------");
        console.log("📊 INICIANDO AUDITORIA NO MONGODB LOCAL");
        console.log("--------------------------------------------------");

        await mongoose.connect(process.env.MONGO_LOCAL_URI);
        
        // Definimos o modelo para acessar a coleção 'transacaos'
        const Transacao = mongoose.model('Transacao', new mongoose.Schema({}, { strict: false }));

        // 1. Contagem Total de Documentos
        const totalRegistros = await Transacao.countDocuments();

        // 2. Agregação para soma de valores e média
        const estatisticas = await Transacao.aggregate([
            {
                $group: {
                    _id: null,
                    volumeTotal: { $sum: "$valor" },
                    ticketMedio: { $avg: "$valor" },
                    maiorVenda: { $max: "$valor" }
                }
            }
        ]);

        if (totalRegistros === 0) {
            console.log("⚠️ Nenhuma transação encontrada no banco de dados.");
        } else {
            const dados = estatisticas[0];
            console.log(`✅ Total de Transações: ${totalRegistros}`);
            console.log(`💰 Volume Financeiro Total: R$ ${dados.volumeTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
            console.log(`📈 Ticket Médio: R$ ${dados.ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
            console.log(`🏆 Maior Transação: R$ ${dados.maiorVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
        }

        console.log("--------------------------------------------------");
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("❌ Erro durante a auditoria:", error.message);
        process.exit(1);
    }
}

realizarAuditoria();