const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

async function restaurarBaseOriginal() {
    try {
        await mongoose.connect(process.env.MONGO_LOCAL_URI);
        const Transacao = mongoose.model('Transacao', new mongoose.Schema({}, { strict: false }));

        const dados = await Transacao.find({}).lean();
        
        // Cabeçalho igual ao que você recebeu no início
        let csvContent = "id;cliente_nome;valor;moeda;data_hora\n";

        dados.forEach(t => {
            // Aqui "sujamos" o dado de volta para o formato de teste (Ex: R$ 1.500,00)
            const valorSujo = `R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
            csvContent += `${t.id};${t.cliente.nome};${valorSujo};${t.moeda};${t.data_hora || new Date().toISOString()}\n`;
        });

        // Salvamos na nova pasta 'data' que você criou na raiz
        fs.writeFileSync('../data/transacoes_brutas.csv', csvContent);
        
        console.log("--------------------------------------------------");
        console.log("📦 BASE BRUTA RESTAURADA COM SUCESSO!");
        console.log(`📂 Arquivo criado em: /data/transacoes_brutas.csv`);
        console.log(`📊 Total de registros recuperados: ${dados.length}`);
        console.log("--------------------------------------------------");

        await mongoose.connection.close();
    } catch (err) {
        console.error("Erro na extração:", err);
    }
}

restaurarBaseOriginal();