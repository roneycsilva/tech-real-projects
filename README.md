# 🗂 Tech Real Projects - Portfólio de Estudos e Projetos

Este repositório reúne projetos de estudo e implementação prática de **APIs resilientes** e **pipelines de dados fullstack**, com foco em **alta disponibilidade**, **processamento assíncrono** e **engenharia de dados aplicada**.

---

## 1️⃣ 🏦 Bank Resilience 2026 - API Bancária de Alta Disponibilidade

> **Resumo Executivo:** O **Bank Resilience 2026** é um ecossistema de serviços financeiros projetado para garantir a **integridade transacional** e a **continuidade operacional** em ambientes de alta criticidade. O sistema sobrevive a falhas parciais de infraestrutura sem perda de informações, utilizando microserviços assíncronos e processamento orientado a eventos.

**Autor:** Roney Cesar - Analista em Desenvolvimento de Sistemas

**Destaques do Projeto:**
- Arquitetura resiliente para sistemas bancários
- Processamento assíncrono de transações com RabbitMQ e Kafka
- Fluxos de dados ponta a ponta (ETL)
- Garantia de entrega e reprocessamento
- Integração backend, banco de dados e nuvem (Railway, CloudAMQP, MongoDB Atlas)

**Estrutura do Projeto:**

```text
📦 Bancaria Resilience API
┣ 📂 api-railway
┃ ┣ 📄 index.js
┃ ┣ 📄 ingestao.js
┃ ┣ 📄 producer-kafka.js
┃ ┗ 📄 .env
┣ 📂 data
┃ ┗ 📄 transacoes_brutas.csv
┣ 📂 local-worker
┃ ┣ 📄 worker.js
┃ ┣ 📄 worker-kafka.js
┃ ┣ 📄 auditoria.js
┃ ┣ 📄 relatorio_final.js
┃ ┗ 📄 .env
┣ 📂 certs
┃ ┗ 📄 *.pem
┣ 📂 img
┃ ┗ 🖼️ 31 prints de dashboards e métricas
┣ 📂 infra
┃ ┗ ⚙️ scripts e configurações de brokers
┗ 📄 README.md
```

**Tecnologias e Ferramentas:**  
Node.js | Express | RabbitMQ (CloudAMQP) | Kafka (Aiven) | MongoDB Atlas | Postman | Railway  

---

## 2️⃣ Fullstack Data API - Lab Vendas Cloud

> **Resumo Executivo:** O **Fullstack Data API** processa fluxos de vendas de forma assíncrona e resiliente. Abrange desde o recebimento do dado via API, enfileiramento em sistemas de mensageria, até a persistência em banco de dados NoSQL e organização de dados em camadas (Raw/Curated).

**Autor:** Roney Cesar - Analista em Desenvolvimento de Sistemas

**Destaques do Projeto:**
- Pipeline completo de dados (API → ETL → MongoDB)
- Mensageria com RabbitMQ (CloudAMQP)
- Organização de dados em raw e curated
- Deploy e monitoramento via Railway

**Estrutura do Projeto:**
```text
📦 Fullstack Data API
┣ 📂 data
┃ ┣ 📂 raw
┃ ┃ ┗ vendas_raw.csv
┃ ┣ 📂 curated
┃ ┃ ┗ vendas_curated.csv
┃ ┗ 📄 README.md
┣ 📂 img
┃ ┗ 🖼️ 31 prints de evidências (MongoDB, Postman, Deploy)
┣ 📂 src
┃ ┗ etl.js
┣ 📄 server.js
┣ 📄 package.json
┗ 📄 README.md
```

**Tecnologias e Ferramentas:**  
Node.js | RabbitMQ (CloudAMQP) | MongoDB Atlas | Postman | Railway  

---

## 📚 Referências

- Documentações oficiais das ferramentas e serviços utilizados
- Tutoriais técnicos e estudos de caso sobre arquitetura de sistemas financeiros
- Aplicação de boas práticas de Engenharia de Dados e Resiliência de Sistemas Distribuídos
