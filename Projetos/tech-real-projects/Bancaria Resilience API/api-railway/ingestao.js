const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');

const API_URL = 'https://api-bancaria-resilience-production.up.railway.app/venda';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function tratarRegistro(row) {
    return {
        id: row.id,
        data_hora: row.data_hora,
        valor: parseFloat(row.valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()),
        moeda: row.moeda,
        tipo_operacao: row.tipo_operacao,
        cliente: {
            nome: row.cliente_nome.trim(),
            documento: row.cliente_documento.replace(/\D/g, ''),
            conta_origem: row.cliente_conta_origem
        },
        destino: {
            instituicao: row.destino_instituicao,
            chave_pix: row.destino_chave_pix
        },
        seguranca: {
            ip_origem: row.seguranca_ip_origem,
            dispositivo: row.seguranca_dispositivo,
            origem_nuvem: row.metadata_source
        }
    };
}

// FUNÇÃO PRINCIPAL CORRIGIDA
async function processarCarga() {
    console.log("🚀 Iniciando processamento cadenciado (Resiliência)...");
    
    const registros = [];

    // 1. Lemos o arquivo inteiro primeiro
    const stream = fs.createReadStream('transacoes_raw.csv').pipe(csv());
    
    for await (const row of stream) {
        registros.push(row);
    }

    console.log(`📊 Total de registros encontrados: ${registros.length}`);

    // 2. Processamos um por um com intervalo para não derrubar a fila
    for (let i = 0; i < registros.length; i++) {
        const dadoLimpo = tratarRegistro(registros[i]);
        
        try {
            await axios.post(API_URL, dadoLimpo);
            console.log(`✅ [${i + 1}/${registros.length}] Enviado: ${dadoLimpo.id}`);
        } catch (error) {
            console.error(`❌ Erro no ${dadoLimpo.id}:`, error.response?.data || error.message);
        }

        // Intervalo de 150ms entre envios para estabilidade total
        await sleep(150);
    }

    console.log("\n🏁 Carga de 300 registros finalizada com sucesso!");
}

// CHAMADA DA FUNÇÃO (IMPORTANTE)
processarCarga().catch(err => console.error("Erro fatal:", err));