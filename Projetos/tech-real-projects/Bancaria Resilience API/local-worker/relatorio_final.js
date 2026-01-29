const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

async function gerarRelatorioCSV() {
    try {
        console.log("--------------------------------------------------");
        console.log("📊 INICIANDO EXPORTAÇÃO DE DADOS BANCÁRIOS");
        console.log("--------------------------------------------------");

        // 1. Conecta ao Banco de Dados onde o Worker salvou as mensagens
        await mongoose.connect(process.env.MONGO_LOCAL_URI);
        
        // Definimos o Schema para garantir que pegamos os campos corretos
        const Transacao = mongoose.model('Transacao', new mongoose.Schema({}, { strict: false }));

        // 2. Busca todas as 627 transações
        const transacoes = await Transacao.find({}).lean();

        if (transacoes.length === 0) {
            console.log("⚠️ Nenhuma transação encontrada para exportar.");
            return;
        }

        // 3. Cabeçalho do Relatório (Definindo as colunas do BI)
        // Incluímos 'Status de Liquidação' e 'Nuvem de Origem'
        let csvContent = "ID_TRANSACAO;NOME_CLIENTE;VALOR_BRL;MOEDA;ORIGEM_NUVEM;STATUS_LIQUIDACAO;DATA_PROCESSAMENTO\n";

        // 4. Loop de construção das linhas
        transacoes.forEach(t => {
            const id = t.id || "N/A";
            const cliente = t.cliente ? t.cliente.nome : "Desconhecido";
            const valor = t.valor ? t.valor.toFixed(2) : "0.00";
            const moeda = t.moeda || "BRL";
            const nuvem = t.seguranca ? t.seguranca.origem_nuvem : "N/A";
            const status = "LIQUIDADO"; // Status fixo pois já passou pelo Worker e caiu no banco
            const data = t.data_processamento || new Date().toISOString();

            // Monta a linha separada por ponto e vírgula (padrão Excel Brasil)
            csvContent += `${id};${cliente};${valor};${moeda};${nuvem};${status};${data}\n`;
        });

        // 5. Gravação física do arquivo na pasta 'local-worker'
        const nomeArquivo = 'liquidacao_final_2026.csv';
        fs.writeFileSync(nomeArquivo, csvContent, 'utf-8');
        
        console.log(`✅ SUCESSO: ${transacoes.length} registros exportados.`);
        console.log(`📂 LOCALIZAÇÃO: ./local-worker/${nomeArquivo}`);
        console.log("--------------------------------------------------");

        await mongoose.connection.close();
        process.exit(0);

    } catch (err) {
        console.error("❌ ERRO NA GERAÇÃO DO RELATÓRIO:", err.message);
        process.exit(1);
    }
}

gerarRelatorioCSV();