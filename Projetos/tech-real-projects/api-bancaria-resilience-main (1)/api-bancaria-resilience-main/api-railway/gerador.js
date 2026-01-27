const fs = require('fs');

const cabeçalho = "id,data_hora,valor,moeda,tipo_operacao,cliente_nome,cliente_documento,cliente_conta_origem,destino_instituicao,destino_chave_pix,seguranca_ip_origem,seguranca_dispositivo,metadata_source\n";
let conteudo = cabeçalho;

const nomes = ["Roney Teste", "Ana Silva", "Carlos Souza", "Maria Oliveira", "Ricardo Santos", "Bruno Lima", "Juliana Costa"];
const nuvens = ["AWS_SA_EAST_1", "AZURE_BRAZIL_SOUTH"];

for (let i = 0; i < 300; i++) {
    const id = `TXB-99887${7000 + i}-BR`;
    const data = new Date(2026, 0, 27, 10, i).toISOString();
    
    // Simula dados "sujos" (R$, vírgula, espaços)
    const valorRaw = i % 2 === 0 ? `"R$ ${(Math.random() * 5000).toFixed(2).replace('.', ',')}"` : (Math.random() * 5000).toFixed(2);
    const cpfRaw = i % 3 === 0 ? "45910120372" : "459.101.203-72"; 
    const nomeRaw = `  ${nomes[i % nomes.length]}  `; 
    
    conteudo += `${id},${data},${valorRaw},BRL,PIX_SAIDA,${nomeRaw},${cpfRaw},79616-5,Banco Central,auditoria@pix.com,189.10.25.${i},iPhone,${nuvens[i % 2]}\n`;
}

fs.writeFileSync('transacoes_raw.csv', conteudo);
console.log("✅ Arquivo transacoes_raw.csv com 300 registros gerado!");