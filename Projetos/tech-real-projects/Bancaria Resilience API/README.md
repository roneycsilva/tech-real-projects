# 🏦 Bank Resilience 2026: Ecossistema de Processamento Bancário Multi-Cloud

---

## 1️⃣ Introdução

O **Bank Resilience 2026** é um projeto de estudo avançado que simula a arquitetura de um sistema bancário resiliente, projetado para suportar **altos volumes de transações financeiras distribuídas entre múltiplos provedores de nuvem (AWS e Azure)** sem risco de perda de dados.

A proposta reproduz desafios reais do setor financeiro, onde **disponibilidade contínua, integridade transacional, rastreabilidade e governança de dados** são requisitos obrigatórios. A arquitetura foi concebida com base em boas práticas observadas no ecossistema de adquirência, processamento de pagamentos e sistemas bancários, aproximando o projeto de cenários corporativos encontrados em instituições financeiras e empresas de meios de pagamento.

Este projeto não foca apenas na construção de uma API, mas na simulação de um **ecossistema de processamento transacional**, onde diferentes componentes desempenham papéis bem definidos dentro de um fluxo crítico de dados financeiros.

---

### 🎯 Objetivos Técnicos do Projeto

- Garantir que **nenhuma transação financeira seja perdida**, mesmo diante de falhas temporárias de rede ou indisponibilidade de serviços.  
- Implementar **desacoplamento entre recepção e processamento**, utilizando mensageria assíncrona.
- Construir um pipeline de dados **escalável, auditável e tolerante a falhas**.
- Aplicar conceitos de **consistência eventual**, comuns em arquiteturas distribuídas.
- Simular um processo de **conciliação financeira**, prática essencial em ambientes bancários e de adquirência.

---

### 🧩 Problema Arquitetural Abordado

Em sistemas financeiros, o processamento síncrono representa um alto risco: qualquer falha pode gerar perda de dados ou inconsistências contábeis. Para mitigar esse risco, a arquitetura deste projeto utiliza um **modelo orientado a eventos (Event-Driven)**, utilizando o **Apache Kafka (Aiven)** como um log imutável de transações.

O fluxo principal segue o padrão:
`Recebimento (API) → Log de Eventos (Kafka) → Processamento Assíncrono (Worker) → Persistência (MongoDB) → Auditoria`

Esse modelo garante:

* **Resiliência de Log:** Diferente de filas comuns, o Kafka armazena o histórico. Se o Worker falhar ao processar os R$ 91 milhões, a mensagem permanece no **Offset** para reprocessamento.
* **Isolamento e Desacoplamento:** A API no Railway não precisa saber se o Worker local está ativo; o Kafka gerencia a retenção dos dados.
* **Garantia de Entrega (At-Least-Once):** Elimina o risco de "transações perdidas" no caminho entre a nuvem e o processador local.
* **Consistência Eventual:** Garante que, mesmo sob carga, todos os dados serão eventualmente liquidados no MongoDB.

---

### 🏛️ Visão de Arquitetura Bancária Aplicada

A estrutura do projeto foi consolidada com base em padrões de **Missão Crítica** e alta disponibilidade:

* **Persistence by Default:** Uso do **Apache Kafka na Aiven** como buffer transacional de alto throughput e baixa latência.
* **Observabilidade Nativa:** Monitoramento de saúde do cluster via logs e métricas em tempo real (Aiven Metrics).
* **Segurança de Dados Bancários:** Implementação de conexão criptografada via **SSL/TLS**, utilizando certificados (CA, Access Key e Certificate) para autenticação entre os sistemas.
* **Estratégia Híbrida e Multi-Cloud:** Integração real entre **Railway (API)**, **Aiven (Kafka Cloud)** e processamento local, simulando um ambiente bancário distribuído.

Essa abordagem foca em pilares inegociáveis do setor financeiro:

- [x] **Integridade:** Garantia de que o valor transacionado é exatamente o valor persistido.
- [x] **Auditabilidade:** Uso do **Kafka REST API** para visualização e auditoria das mensagens diretamente no broker.
- [x] **Recuperação de Desastres:** Capacidade de reconstruir o estado do banco de dados a partir do log de mensagens do Kafka.

---

### 📚 Contexto Educacional e Profissional

Embora seja um projeto educacional, sua modelagem foi guiada por uma **visão profissional de arquitetura bancária**, conectando práticas de engenharia de software, mensageria, tratamento de dados e governança ao contexto de sistemas financeiros distribuídos.

O projeto serve como um estudo aplicado de:

* **Arquiteturas Resilientes:** Implementação de clusters gerenciados (Aiven e CloudAMQP) com alta disponibilidade.
* **Processamento Assíncrono:** Uso de mensageria para evitar o bloqueio de threads e perda de requisições.
* **ETL Financeiro:** Fluxo de Extração (API), Transformação (Worker) e Carga (MongoDB).
* **Conciliação de Dados:** Garantia de que o que foi registrado no Kafka (Log de Eventos) foi devidamente liquidado no Banco de Dados.
* **Boas Práticas de Adquirência:** Simulação de fluxos de liquidação financeira seguindo padrões de segurança e auditabilidade.

---

### 🎯 Objetivos do Projeto

Este projeto foi concebido com foco em boas práticas de engenharia aplicadas a sistemas financeiros distribuídos. Os objetivos abrangem conceitos de arquitetura resiliente, governança de dados e processamento transacional de missão crítica.

* **Zero Data Loss:** Garantir que **nenhuma transação financeira seja perdida**, mesmo sob falhas temporárias de rede, indisponibilidade de serviços ou picos de carga, utilizando o **Apache Kafka** como log persistente.
* **Desacoplamento de Camadas:** Implementar a separação total entre recepção e processamento, utilizando mensageria assíncrona como mecanismo de defesa da infraestrutura.
* **Escalabilidade e Observabilidade:** Construir um pipeline de dados observável via métricas de infraestrutura e logs, preparado para cenários de alto volume transacional.
* **Consistência Eventual:** Aplicar princípios de consistência comum em sistemas bancários distribuídos, onde o estado final do saldo é garantido após o processamento da fila.
* **Conciliação e Integridade:** Simular um processo de conciliação financeira, validando se o valor emitido (Ex: R$ 91 Milhões) é exatamente o valor persistido.
* **Rastreabilidade Ponta a Ponta:** Garantir que cada transação possa ser rastreada desde o Producer até a liquidação no **MongoDB**, permitindo auditoria total.
* **Padrões de Adquirência:** Modelar o sistema com base em fluxos reais de processamento de pagamentos, aproximando o estudo dos maiores players do mercado financeiro.
---

### 🧩 Problema Arquitetural Abordado

Em sistemas financeiros, o processamento síncrono representa um alto risco: qualquer falha pode gerar perda de dados ou inconsistências contábeis. Para mitigar esse risco, a arquitetura deste projeto utiliza um **modelo orientado a mensageria**, onde o broker (**Apache Kafka na Aiven**) atua como camada de segurança entre a entrada e o processamento dos dados.

O fluxo principal segue o padrão:
`Recebimento (API) → Fila de Mensagens (Kafka/RabbitMQ) → Processamento Assíncrono (Worker) → Persistência (MongoDB) → Auditoria`

Essa abordagem é amplamente utilizada em plataformas de pagamento e sistemas bancários modernos, pois permite:

* **Resiliência a falhas temporárias:** O Kafka retém as mensagens mesmo que o processador esteja offline.
* **Mecanismo de retry automático:** Facilita o reprocessamento em caso de erros de negócio.
* **Isolamento de responsabilidades:** A API foca na recepção de alta performance, enquanto o Worker foca na regra de negócio.
* **Proteção contra sobrecarga:** O banco de dados (MongoDB) não recebe picos diretos, mas sim um fluxo controlado pelo Worker.
* **Consistência eventual:** Característica fundamental em arquiteturas distribuídas de larga escala.

Dessa forma, a fila atua como uma **camada de segurança lógica**, garantindo que cada transação (como o caso real de R$ 91 milhões simulado) seja processada de forma confiável, rastreável e auditável, mesmo em cenários adversos de infraestrutura.

## 2️⃣ Integração entre Ferramentas

A arquitetura do **Bank Resilience 2026** é composta por um conjunto de tecnologias que, integradas, formam um ecossistema de processamento transacional resiliente. Cada ferramenta desempenha um papel específico dentro do fluxo de dados, refletindo a separação de responsabilidades comum em sistemas financeiros de alta disponibilidade.

Essa composição tecnológica foi definida com base em boas práticas de mercado, priorizando **desacoplamento, escalabilidade, observabilidade e confiabilidade operacional**. O objetivo é garantir que a recepção, o transporte, o processamento e a persistência das transações ocorram de maneira segura e auditável.

### 🛠️ Matriz de Responsabilidades Técnicas

| Tecnologia | Papel no Sistema |
| :--- | :--- |
| **Node.js** | Ambiente de execução da API e dos serviços de processamento (Workers) |
| **Apache Kafka (Aiven)** | **Broker de Eventos (Principal)**: Log imutável para auditoria e persistência de alta performance |
| **RabbitMQ (CloudAMQP)** | **Broker de Mensageria (Suporte)**: Gerenciamento de filas e resiliência transacional |
| **MongoDB** | Persistência das transações financeiras liquidadas em modelo NoSQL |
| **SSL/TLS Certificates** | Segurança na comunicação entre o Worker local e o cluster na Nuvem (Aiven) |
| **Railway** | Plataforma de infraestrutura para deploy contínuo (CI/CD) da API bancária |
| **Express** | Camada HTTP responsável por expor os endpoints da API |
| **Postman** | Ferramenta de testes de carga e validação de cenários de sucesso e falha |

Essa integração forma um pipeline de dados distribuído, onde cada componente atua de forma coordenada para garantir que as transações sejam processadas com integridade, rastreabilidade e total tolerância a falhas.

## 3️⃣ Arquitetura do Sistema

A arquitetura do sistema foi desenhada com foco em **resiliência, desacoplamento e confiabilidade transacional**, princípios fundamentais em ambientes financeiros. Em vez de concentrar todas as responsabilidades em um único serviço, o fluxo foi dividido em camadas especializadas, permitindo maior controle sobre falhas, escalabilidade e auditoria.

O modelo adotado segue uma abordagem **Event-Driven (Orientada a Eventos)**, onde a mensageria atua como elo entre a entrada e o processamento. Essa estratégia reduz o impacto de indisponibilidades, evita sobrecarga de componentes críticos e possibilita rastrear o ciclo de vida de cada transação de alto valor.

### 🔄 Fluxo de Dados e Integração Híbrida

Abaixo está a visão do pipeline de dados, destacando a coexistência dos brokers para máxima disponibilidade:

```text
          🌍 Cliente / Simulação ETL
                 │
                 ▼
        🚀 API Bancária (Railway)
                 │
        ┌────────┴────────┐
        ▼                 ▼
  📨 RabbitMQ       🎡 Apache Kafka
  (CloudAMQP)         (Aiven Cloud)
        │                 │
        │         🔐 Conexão SSL/TLS
        │                 │
        └────────┬────────┘
                 ▼
        ⚙️ Worker de Processamento
        (Consumo e Validação)
                 │
                 ▼
        🗄️ MongoDB (Persistência)
                 │
                 ▼
        📊 Auditoria & Reconciliação
```
A arquitetura do projeto foi estruturada para separar claramente as responsabilidades de **Ingestão**, **Processamento** e **Auditoria**, prática comum em sistemas financeiros distribuídos. Essa divisão favorece a escalabilidade, facilita a manutenção e reduz o acoplamento entre os componentes, permitindo que cada camada evolua de forma independente.

O modelo também reforça princípios de governança de dados e rastreabilidade, essenciais em ambientes bancários e de adquirência, onde é necessário compreender todo o ciclo de vida de uma transação — da entrada até a consolidação final.

A organização do repositório reflete essa arquitetura em camadas:


## 4️⃣ Estrutura do Projeto
A organização do repositório segue o princípio de **separação de responsabilidades**, dividindo a solução entre camadas de ingestão, processamento, dados e documentação. Essa estrutura facilita a escalabilidade, manutenção e entendimento da arquitetura do sistema.

```text
📦 bank-resilience-2026
┣ 📂 api-railway
┃ ┣ 📄 index.js                # API Express que recebe as transações
┃ ┣ 📄 ingestao.js              # ETL CSV → RabbitMQ
┃ ┣ 📄 producer-kafka.js        # Publicador de transações para o Kafka (Aiven)
┃ ┗ 📄 .env                     # Configurações Railway / CloudAMQP / Aiven
┃
┣ 📂 data
┃ ┗ 📄 transacoes_brutas.csv    # Base de dados bruta para simulação
┃
┣ 📂 local-worker
┃ ┣ 📄 worker.js                # Consumidor RabbitMQ → MongoDB
┃ ┣ 📄 worker-kafka.js          # Consumidor Kafka (SSL) → MongoDB
┃ ┣ 📄 auditoria.js             # Conciliação e validação financeira
┃ ┣ 📄 relatorio_final.js       # Exportação de transações liquidadas
┃ ┗ 📄 .env                     # String de conexão Mongo e Aiven Cloud
┃
┣ 📂 certs                      # 🔐 Certificados SSL/TLS (CA, Access Key, Cert)
┃ ┗ 📄 (Arquivos .pem para conexão segura com Kafka Aiven)
┃
┣ 📂 img
┃ ┗ 🖼️ (Prints de dashboards Kafka, RabbitMQ e MongoDB)
┃
┣ 📂 infra
┃ ┗ ⚙️ (Configurações de brokers e scripts de apoio)
┃
┗ 📄 README.md                  # Documentação técnica detalhada

```
## 5️⃣ Camada de Dados & ETL (Extract, Transform, Load)

O sistema foi projetado para processar **transações financeiras com características típicas de ambientes bancários**, onde a qualidade e a padronização dos dados são fatores críticos para garantir integridade contábil e confiabilidade dos relatórios.

Antes de serem enviadas para a nuvem e inseridas no fluxo de mensageria, as transações passam por um processo estruturado de **ETL**. Essa etapa é fundamental para evitar inconsistências, erros de tipo e falhas de processamento em etapas posteriores do pipeline.

### 🔄 O Ciclo de Vida do Dado Transacional:

1.  **Extract (Extração):** Leitura da base bruta (CSV) simulando a recepção de arquivos de remessa bancária ou logs de transações de adquirência.
2.  **Transform (Transformação):** Normalização de campos críticos (valores, datas, IDs de transação) e aplicação de regras de negócio para garantir o layout esperado pelo **Apache Kafka**.
3.  **Load (Carga):** Disparo das transações tratadas para o broker na nuvem (**Aiven**), utilizando criptografia **SSL/TLS** para garantir que o dado financeiro trafegue de forma segura.

O tratamento aplicado simula práticas reais onde dados de diferentes origens precisam ser normalizados antes de entrar nos sistemas centrais. Com o uso do Kafka, ganhamos a capacidade de **Auditoria em Tempo Real**, onde cada etapa do ETL pode ser verificada diretamente no log de mensagens do broker.

### 🔄 Etapas do ETL

| Etapa | Descrição |
|------|-----------|
| **Limpeza** | Regex para remover `R$`, espaços e caracteres inválidos |
| **Conversão** | Transformação de `string` → número decimal |
| **Padronização** | Conversão de datas para o padrão ISO 8601 |
| **Enriquecimento** | Inclusão de metadados como origem da nuvem (AWS/Azure) |
| **Validação** | Estrutura JSON validada antes do envio para a fila |

Esse processo garante que os dados cheguem ao sistema de mensageria já estruturados, reduzindo falhas no processamento assíncrono e aumentando a confiabilidade do ciclo transacional.

## 6️⃣ Scripts e Responsabilidades

A camada de scripts representa a implementação prática da arquitetura proposta. Cada arquivo possui uma responsabilidade bem definida dentro do fluxo transacional, reforçando o princípio de **separação de responsabilidades** (Single Responsibility Principle), fundamental em sistemas financeiros de alta disponibilidade.

### 🛠️ Divisão Funcional dos Componentes

#### 📤 Camada de Ingestão e Produção (API/Cloud)
* **`index.js` (API Railway):** Porta de entrada para requisições externas, simulando o recebimento de transações em tempo real.
* **`ingestao.js`:** Script responsável pelo processo de ETL em massa (CSV para Broker), garantindo a carga inicial do sistema.
* **`producer-kafka.js`:** Implementação especializada para envio de dados ao **Apache Kafka**, utilizando autenticação segura via certificados SSL/TLS.

#### ⚙️ Camada de Processamento (Local Workers)
* **`worker.js`:** Consumidor dedicado ao RabbitMQ; foca em resiliência e retentativas de processamento.
* **`worker-kafka.js`:** Consumidor de alta performance para o Kafka na **Aiven**. Realiza o "de-serialize" das mensagens criptografadas e a persistência final no MongoDB.
* **`auditoria.js`:** Script de inteligência que realiza a conciliação financeira, verificando se todos os eventos emitidos foram devidamente liquidados.

### 🛡️ Benefícios desta Organização:
* **Baixo Acoplamento:** A falha de um script (ex: Worker RabbitMQ) não impede o funcionamento do outro (ex: Worker Kafka).
* **Escalabilidade Independente:** Permite evoluir a lógica de persistência sem alterar a lógica de recepção da API.
* **Observabilidade Granular:** Facilita a identificação de gargalos em etapas específicas do pipeline de dados.

---

### 🛠️ Ingestão de Dados (`ingestao.js` / `ingestao-kafka.js`)

Esta camada é responsável pela entrada estruturada e higienização das transações no ecossistema de mensageria, atuando como o primeiro filtro de qualidade do pipeline.

**Funções principais:**

* **Processamento de Dataset:** Leitura e parsing de um conjunto de **627 registros** reais de transações.
* **Normalização de Dados:** Conversão de formatos brutos (CSV) para objetos JSON tipados, prontos para o consumo por sistemas distribuídos.
* **Dual-Broker Support:** Capacidade de despachar transações tanto para o **RabbitMQ (CloudAMQP)** quanto para o **Apache Kafka (Aiven)**.
* **Segurança e Criptografia:** No fluxo do Kafka, o script gerencia a conexão segura via protocolos SSL, garantindo que o dado financeiro saia da origem protegido.
* **Backpressure e Rate Control:** Controle de cadenciamento para evitar sobrecarga na API de destino e garantir a estabilidade do cluster na nuvem.

Essa etapa simula com precisão a entrada de dados provenientes de múltiplas origens (Multi-Cloud), onde a **ingestão** precisa ser resiliente o suficiente para lidar com grandes volumes sem perda de pacotes.

---

### 👷 Processamento Assíncrono (`worker.js` / `worker-kafka.js`)

Componente central da resiliência do sistema, responsável pelo consumo inteligente das mensagens e pela persistência garantida das transações.

**Lógica de Processamento e Confiabilidade:**

* **Controle de Vazão (Backpressure):** * No **RabbitMQ**, utiliza `prefetch(1)` para processar uma transação por vez, evitando gargalos de memória.
    * No **Kafka**, utiliza a estratégia de **Manual Commit**, onde o offset só é atualizado após a confirmação de sucesso.
* **Garantia de Persistência:** O `ack` (RabbitMQ) ou o `commit` (Kafka) só é executado após a confirmação de gravação no **MongoDB**, eliminando o risco de mensagens perdidas entre o broker e o banco.
* **Segurança de Conexão:** O worker do Kafka opera sob **SSL/TLS**, realizando o handshake seguro com o cluster na nuvem através dos certificados de acesso.
* **Idempotência:** Preparado para evitar a duplicidade de registros (como os R$ 91 milhões simulados), garantindo que cada transação seja única no banco de dados.

Este modelo reproduz com fidelidade o processamento de **Missão Crítica**, onde a consistência do dado financeiro é prioritária em relação à velocidade bruta.

---

### 📊 Auditoria Financeira e Conciliação (`auditoria.js`)

O componente de auditoria representa a camada de governança do **Bank Resilience 2026**. Ele foi desenvolvido para garantir a integridade contábil do sistema, realizando a reconciliação entre as mensagens trafegadas no broker (**Apache Kafka na Aiven**) e os registros liquidados na camada de persistência (**MongoDB**).

Este script não realiza apenas uma contagem simples, mas sim uma validação de estado entre sistemas distribuídos.

**Funções e Rigor Técnico:**

* **Agregação de Dados em Larga Escala:** Utiliza o *Aggregation Framework* do MongoDB para processar e somar valores monetários de alta precisão, garantindo que não haja perda de decimais durante o fluxo assíncrono.
* **Conciliação de Log de Eventos:** Confronta o volume de mensagens produzidas no tópico do Kafka com os documentos persistidos. Como o Kafka na Aiven atua como um log imutável, ele serve como a "fonte da verdade" para auditar se o Worker processou todos os eventos.
* **Validação de Integridade Financeira:** Verifica se o montante total transacionado condiz com o dataset de entrada, assegurando que a infraestrutura (SSL/TLS, Brokers e Workers) não introduziu inconsistências nos dados.

**Resultado Consolidado da Operação:**

Abaixo, os dados extraídos após o processamento do pipeline híbrido, provando a eficácia da arquitetura:

| Indicador de Auditoria | Valor Auditado | Status da Transação |
| :--- | :--- | :--- |
| **Volume Financeiro Total** | **R$ 91.484.956,73** | ✅ 100% Conciliado |
| **Integridade de Dados** | **0% de perda** | ✅ Verificado |
| **Total de Registros** | **627 transações** | ✅ Auditado |

> [!IMPORTANT]
> Este processo simula o **Settlement (Liquidação)** bancário. Em um cenário real de adquirência, essa auditoria é o que garante que o lojista receba exatamente o valor capturado, livre de falhas de infraestrutura ou erros de comunicação entre nuvens.

---

### 📁 Geração de Relatórios e Exportação (`relatorio_final.js`)

O script de geração de relatórios constitui a camada de saída e inteligência de dados do sistema. Ele é responsável por extrair o estado final das transações que foram processadas de forma assíncrona pelo **Apache Kafka (Aiven)** e liquidadas no **MongoDB**, transformando logs técnicos em ativos de auditoria e BI.

Diferente de uma simples exportação, este componente consolida a prova de que o fluxo transacional de **R$ 91.484.956,73** foi concluído com sucesso.

**Funções e Detalhamento Técnico:**

* **Extração de Snapshot Transacional:** O script realiza uma varredura na camada de persistência para consolidar transações que transitaram pelo ecossistema de mensageria, garantindo que apenas dados confirmados (*committed*) via Worker sejam exportados.
* **Normalização para BI e Contabilidade:** Converte a estrutura de documentos NoSQL e as mensagens serializadas no Kafka em um formato CSV estruturado (UTF-8), permitindo a ingestão imediata por ferramentas de análise financeira e auditoria externa.
* **Suporte à Reconciliação Híbrida:** Atua como o ponto de conferência final para validar se o volume de transações recebido pela API no Railway corresponde exatamente ao volume exportado, fechando o ciclo de governança iniciado no broker.
* **Auditabilidade de Dados Bancários:** O relatório gerado serve como evidência de conformidade, permitindo rastrear cada linha financeira de volta ao seu evento de origem no cluster da Aiven, garantindo transparência total em cenários de fiscalização.

**Parâmetros de Operação:**

| Atributo Técnico | Especificação | Objetivo |
| :--- | :--- | :--- |
| **Formato de Arquivo** | CSV Padronizado | Interoperabilidade entre sistemas bancários |
| **Origem do Dado** | MongoDB (Pós-Kafka) | Garantir que apenas dados liquidados sejam reportados |
| **Métrica de Sucesso** | Integridade dos R$ 91M | Prova de que a mensageria não gerou perdas |
| **Segurança** | Sanitização de dados | Proteção de informações sensíveis na exportação |

> [!TIP]
> Em ambientes de **Adquirência**, este relatório é o que define o "Settlement" (Liquidação). Se o relatório final gerado pelo script for idêntico ao dataset de ingestão, a arquitetura provou sua **Resiliência Bancária** contra falhas de rede ou picos de carga.

---

### 📥 Bases de Dados e Ciclo de Vida da Informação

Esta seção detalha os artefatos de dados que sustentam o fluxo transacional do projeto. O ciclo de vida da informação foi projetado para garantir a **linhagem dos dados** (*data lineage*), desde o estado bruto até a liquidação final, passando pela camada de mensageria segura no **Apache Kafka**.

A integridade deste fluxo é o que permitiu o processamento bem-sucedido de **R$ 91.484.956,73**, garantindo que o dado de saída seja o reflexo fiel e auditado do dado de entrada.

**Detalhamento das Camadas de Dados:**

| Etapa do Projeto | Arquivo / Repositório | Papel Técnico no Ecossistema |
| :--- | :--- | :--- |
| **Dados Originais (Entrada)** | `data/transacoes_brutas.csv` | **Dataset de Ingestão:** Contém 627 registros financeiros brutos que simulam o recebimento de arquivos de remessa bancária. |
| **Camada de Transporte** | **Aiven Kafka Topics** | **Evento em Trânsito:** Onde o dado reside de forma imutável e criptografada (SSL) antes de ser consumido pelo Worker. |
| **Persistência Operacional** | **MongoDB (Collections)** | **Estado de Liquidação:** Armazenamento NoSQL onde os documentos são persistidos após validação de integridade. |
| **Dados Liquidados (Saída)** | `liquidacao_final_2026.csv` | **Relatório de Fechamento:** Arquivo consolidado pelo script de auditoria, utilizado para prova de conciliação e BI. |

**Rigor na Manipulação dos Dados:**

* **Imutabilidade no Broker:** Uma vez que a transação entra no cluster da **Aiven**, ela não pode ser alterada. Isso garante que o relatório de saída possa ser auditado contra o log original em caso de divergências.
* **Segurança na Origem e Destino:** O tráfego entre o arquivo de entrada e a persistência final é protegido por protocolos de autenticação, evitando a injeção de transações não autorizadas no pipeline.
* **Consistência de Valores:** O sistema utiliza tipagem rigorosa para garantir que valores monetários não sofram arredondamentos indevidos durante a conversão de CSV para JSON (Kafka) e posteriormente para BSON (MongoDB).

> [!IMPORTANT]
> A correlação exata entre o arquivo de entrada e o de saída é a métrica definitiva de sucesso desta arquitetura. No **Bank Resilience 2026**, a paridade absoluta entre esses arquivos confirma uma taxa de **0% de perda de pacotes** em ambientes distribuídos.

---

## ⚙️ Detalhamento Técnico e Configurações

A robustez da arquitetura **Bank Resilience 2026** reside na sua capacidade de operar de forma segura e portátil. Para que a comunicação entre os componentes distribuídos (API no Railway, Broker na Aiven e Worker local) ocorra sem falhas, implementamos uma camada de configuração baseada em **Variáveis de Ambiente (.env)** e protocolos de segurança de nível bancário.

Esta abordagem garante que credenciais sensíveis e strings de conexão nunca fiquem expostas no código-fonte, facilitando a escalabilidade e o gerenciamento de diferentes ambientes (Desenvolvimento, Homologação e Produção).

### 🔐 Protocolos de Segurança e Conectividade

A integração com o **Apache Kafka na Aiven** introduziu uma camada de segurança crítica: o **SSL/TLS**. Diferente de brokers de mensageria simplificados, a comunicação financeira exige autenticação mútua.

* **Criptografia em Trânsito:** Todos os dados enviados da API ou consumidos pelo Worker trafegam sob o protocolo SSL, impedindo ataques de interceptação (*Man-in-the-Middle*).
* **Gestão de Certificados:** O sistema utiliza três arquivos fundamentais para estabelecer o handshake seguro:
    1.  `ca.pem`: Certificado da Autoridade Certificadora da Aiven.
    2.  `service.cert`: Certificado de acesso do serviço.
    3.  `service.key`: Chave privada para autenticação do cliente.

### 📋 Variáveis de Ambiente Essenciais

A tabela abaixo detalha os parâmetros configurados para sustentar o ecossistema:

| Variável | Finalidade Técnica | Escopo |
| :--- | :--- | :--- |
| `KAFKA_BROKER_URL` | Endereço do cluster Aiven (ex: `kafka-target-bank.aivencloud.com:port`) | API / Worker |
| `KAFKA_TOPIC_NAME` | Nome do tópico transacional (ex: `transactions.resilience.2026`) | API / Worker |
| `MONGO_URI` | String de conexão para persistência no MongoDB Atlas ou Local | Worker |
| `CLOUDAMQP_URL` | Endpoint de conexão para o broker RabbitMQ (Fallback/Resiliência) | API / Worker |
| `SSL_CA_PATH` | Caminho local para o certificado `ca.pem` | Worker |
| `PORT` | Porta de execução da API no ambiente Railway | API |

### 🛠️ Configuração de Tópicos e Partições

Para suportar o volume de **R$ 91.484.956,73**, o Kafka foi configurado visando **Alta Disponibilidade**:

* **Replication Factor (Fator de Replicação):** Configurado para garantir que, caso um broker do cluster sofra indisponibilidade, os dados financeiros permaneçam acessíveis em outros nós.
* **Particionamento:** Estruturado para permitir o processamento paralelo em larga escala, permitindo que múltiplos Workers consumam dados simultaneamente sem conflitos.
* **Retention Policy (Retenção):** Definida para manter o log de eventos por tempo suficiente para auditorias e reprocessamentos em caso de falha na camada de banco de dados.

> [!CAUTION]
> A segurança desta configuração é o que permite ao sistema operar em conformidade com normas de proteção de dados. Sem o isolamento das variáveis e a criptografia SSL, a integridade das transações estaria comprometida.

---

### 🔑 Gerenciamento de Variáveis de Ambiente (`.env`)

A segurança de uma arquitetura financeira distribuída depende da separação absoluta entre a lógica de código e as credenciais de infraestrutura. No **Bank Resilience 2026**, utilizamos arquivos de configuração `.env` para gerenciar segredos e strings de conexão, garantindo que o sistema seja portátil e esteja em conformidade com as diretrizes de segurança de dados e normas de conformidade bancária.

Esta abordagem impede a exposição de segredos em sistemas de controle de versão (como o GitHub), mitigando riscos de acesso não autorizado aos clusters de produção.

#### 🛠️ Especificação Técnica das Variáveis

As variáveis abaixo sustentam o pipeline híbrido, permitindo que o sistema alterne entre os protocolos de mensageria e mantenha a persistência íntegra.

| Categoria | Variável de Ambiente | Descrição e Impacto no Fluxo |
| :--- | :--- | :--- |
| **Infra Cloud** | `PORT` | Porta de execução da API no **Railway**, permitindo a escuta de tráfego HTTP para ingestão. |
| **Broker Principal** | `KAFKA_BROKER` | Endpoint seguro (URI:Porta) do cluster **Aiven**. Essencial para o roteamento de mensagens via SSL. |
| **Segurança SSL** | `KAFKA_CA_PATH` | Caminho absoluto para o certificado `ca.pem`, necessário para validar a identidade do cluster. |
| **Broker Suporte** | `RABBITMQ_URL` | String de conexão (AMQPS) para o broker CloudAMQP, utilizada para fluxos de resiliência. |
| **Persistência** | `MONGO_LOCAL_URI` | URI de conexão para o MongoDB onde ocorre a liquidação final dos **R$ 91M**. |
| **Identificação** | `KAFKA_TOPIC` | Nome lógico do tópico transacional, garantindo o alinhamento entre Producer e Consumer. |

#### 📂 Exemplo de Configuração — Worker Local (`local-worker/.env`)

Este arquivo é o coração da operação do Worker, contendo as pontas de conexão entre a nuvem e o banco de dados local.

```env
# Conectividade com Mensageria (Híbrida)
RABBITMQ_URL=amqps://usuario:senha@cluster-id.rmq.cloudamqp.com/vhost
KAFKA_BROKER=kafka-target-bank-resilience-2026.aivencloud.com:25373
KAFKA_TOPIC=transactions.financial.verified

# Segurança e Criptografia Aiven (SSL/TLS)
KAFKA_CA_PATH=./certs/ca.pem
KAFKA_CERT_PATH=./certs/service.cert
KAFKA_KEY_PATH=./certs/service.key

# Camada de Persistência e Liquidação
MONGO_LOCAL_URI=mongodb://localhost:27017/bank_db
```

## 7️⃣ Etapas do Projeto (Lifecycle de Desenvolvimento)

O ciclo de vida do **Bank Resilience 2026** foi projetado seguindo as fases de maturidade de um sistema de missão crítica. A jornada evoluiu de um modelo de mensageria simples para um ecossistema de **Event Streaming** de alta performance, onde a infraestrutura da **Aiven** garante a persistência de logs de eventos e o **MongoDB** atua como o livro-razão (*ledger*) de liquidação.

Cada etapa foi documentada para garantir que o fluxo de **R$ 91.484.956,73** fosse processado com integridade matemática e segurança criptográfica.

### 🗺️ Fluxo de Implementação e Arquitetura

| Fase | Descrição Técnica e Operacional | Diferencial de Engenharia |
|:--- |:--- |:--- |
| 🟢 **Persistência NoSQL** | Modelagem e configuração do cluster **MongoDB**. Foco na criação de coleções otimizadas para alta escrita e garantia de atomicidade na persistência final. | Estruturação de schemas resilientes. |
| 🟡 **Broker Multi-Cloud** | Provisionamento e configuração do **Apache Kafka na Aiven**. Definição de tópicos transacionais, fatores de replicação e políticas de retenção de mensagens. | Alta disponibilidade gerenciada. |
| 🛡️ **Hardening de Segurança** | Implementação de autenticação mútua via **SSL/TLS**. Configuração de certificados `ca.pem`, `service.cert` e `service.key` para criptografia de ponta a ponta. | Conformidade com padrões bancários. |
| 🔵 **Deploy e Ingestão** | Publicação da API no **Railway** com integração via CI/CD. Configuração de variáveis de ambiente para orquestração entre Cloud e Worker Local. | Portabilidade e escalabilidade. |
| 🟣 **Consumo e Liquidação** | Execução de **Workers** especializados que processam o log do Kafka, garantindo o *manual commit* do offset apenas após o sucesso da gravação. | Garantia contra perda de dados. |
| 📊 **Auditoria e BI** | Execução dos scripts de conciliação final, confrontando o dataset original com os documentos liquidados para emissão do relatório de fechamento. | Verificação de integridade contábil. |

### 🔍 Evolução Técnica: De Mensageria a Log de Eventos

A transição para o **Apache Kafka** permitiu que o projeto atingisse um novo patamar de resiliência:

1.  **Imutabilidade:** Diferente de filas tradicionais onde a mensagem é deletada após o consumo, o Kafka mantém o histórico das transações, permitindo o reprocessamento em caso de incidentes.
2.  **Segurança Avançada:** A integração com a **Aiven** forçou a implementação de handshakes seguros via certificados, eliminando vulnerabilidades de rede aberta.
3.  **Observabilidade Nativa:** O uso de métricas em tempo real (dashboard Aiven) permitiu monitorar a "saúde" do broker durante o processamento das 627 transações.

> [!IMPORTANT]
> A organização destas etapas prova que a arquitetura não é apenas funcional, mas auditável. A paridade entre os dados de entrada e o relatório de saída (0% de perda) é o resultado direto da execução rigorosa deste lifecycle de desenvolvimento.

## 8️⃣ Endpoints da API

A API representa a **camada de entrada do sistema**, atuando como um Gateway de Ingestão de Alta Disponibilidade. Sua responsabilidade primordial é receber as transações financeiras, realizar o handshake de segurança e garantir que os dados sejam encaminhados de forma íntegra para o pipeline assíncrono, operando simultaneamente com **Apache Kafka (Aiven)** e **RabbitMQ (CloudAMQP)**.

Ela isola o cliente da complexidade interna da infraestrutura distribuída. Em cenários de alta carga ou picos de tráfego, a API preserva a experiência do usuário ao confirmar o recebimento do dado (*Acknowledgment*) e delegar o processamento pesado para os Brokers, garantindo que o montante de **R$ 91.484.956,73** seja capturado sem rejeições de conexão.

### 🛣️ Definição das Rotas Transacionais

Abaixo, os endpoints estruturados para suportar o fluxo de dados do **Bank Resilience 2026**:

| Método | Rota | Descrição Técnica e Arquitetural |
| :--- | :--- | :--- |
| **POST** | `/ingestao` | **Gateway de Entrada:** Recebe payloads JSON, valida a estrutura e despacha o evento para o **Kafka** e **RabbitMQ**. É o ponto onde o dado bruto entra no ecossistema seguro. |
| **GET** | `/status` | **Health Check & Observabilidade:** Verifica em tempo real a saúde da instância no **Railway** e a latência de conectividade com o Broker Aiven e o cluster MongoDB. |
| **POST** | `/webhook` | **Injeção de Eventos Externos:** Interface preparada para receber notificações de terceiros, permitindo a integração de eventos de parceiros diretamente no pipeline de auditoria. |

### 🛡️ Engenharia de Resiliência na Camada HTTP

* **Desacoplamento de Processamento:** A API não aguarda a persistência no banco de dados para responder ao cliente. Ela garante a entrega da mensagem ao Broker (Kafka/RabbitMQ), o que evita o bloqueio do Event Loop do Node.js e maximiza o throughput de entrada.
* **Segurança de Tráfego:** Implementada sob HTTPS no **Railway**, a API gerencia as chaves de acesso e certificados **SSL/TLS** necessários para se comunicar com o cluster gerenciado na **Aiven**, assegurando que os dados financeiros nunca trafeguem de forma clara na rede.
* **Protocolo de Failover:** O endpoint de ingestão está configurado para tratar interrupções; caso o Broker principal apresente latência fora dos parâmetros, o sistema está apto a gerenciar a fila de mensagens para garantir que nenhuma transação seja descartada.

> [!NOTE]
> No contexto deste projeto, a API é a "primeira linha de defesa". A paridade de 100% dos dados na auditoria final prova que esta camada de endpoints foi capaz de sustentar a ingestão das 627 transações originais sem gerar erros de timeout ou perda de pacotes.

## 9️⃣ Deploy & Infraestrutura (Arquitetura Híbrida)

A estratégia de infraestrutura do **Bank Resilience 2026** foi projetada para emular um ecossistema bancário real, onde os componentes são distribuídos em camadas distintas para maximizar a segurança e a resiliência. A arquitetura adota o conceito de **Desacoplamento Geográfico**, distribuindo a carga de trabalho entre diferentes provedores de nuvem e processamento local.

Essa separação reforça princípios de **segurança cibernética e isolamento de falhas**, demonstrando como sistemas financeiros modernos gerenciam responsabilidades entre a borda (*Edge*), a mensageria de alto throughput e o core de persistência.

### 🏗️ Distribuição de Componentes e Responsabilidades

* **API Gateway (Hospedado no Railway):** Ambiente *Cloud-Native* responsável pela recepção das requisições externas. Atua como o produtor de eventos (**Producer**), orquestrando a entrada de dados e garantindo que cada transação seja assinada e enviada para o cluster Kafka com segurança SSL.
* **Mensageria Gerenciada (Aiven & CloudAMQP):** Utilização de infraestrutura especializada para o transporte de dados. O **Apache Kafka na Aiven** atua como o *backbone* de eventos, provendo um log imutável de transações com alta disponibilidade e replicação de dados entre nós.
* **Internal Worker (Execução Local/On-Premise):** Simula o **Core Bancário** interno. O Worker opera em uma rede protegida, consumindo as mensagens dos brokers e realizando a liquidação final no MongoDB. Esta separação garante que, mesmo que a API sofra um ataque externo, o processador de pagamentos e o banco de dados permaneçam isolados.
* **Governança via Variáveis de Ambiente (`.env`):** Seguindo o manifesto *Twelve-Factor App*, todas as configurações sensíveis (certificados SSL, URIs e chaves de acesso) são injetadas dinamicamente, eliminando o risco de exposição de credenciais no código-fonte.

### 🛡️ Engenharia de Resiliência e Persistência



* **Mensageria Durável e Persistente:** Tanto no RabbitMQ (`durable: true`) quanto no Kafka (configurações de `retention` e `replication factor`), o sistema é configurado para sobreviver a reinicializações dos brokers. No Kafka, o dado é gravado em disco de forma sequencial, garantindo que o montante de **R$ 91.484.956,73** esteja seguro mesmo se o Worker ficar offline.
* **Protocolo de Manual Ack/Commit:** A infraestrutura foi configurada para não aceitar confirmações automáticas. O "visto" de processado só é enviado ao broker após a confirmação de escrita (*Write Concern*) no MongoDB, eliminando perdas de dados em trânsito.
* **Conectividade Criptografada (SSL/TLS):** A infraestrutura de rede utiliza túneis criptografados para a comunicação entre o Railway e a Aiven, garantindo a integridade e a confidencialidade do tráfego financeiro em redes públicas.

> [!IMPORTANT]
> A escolha de uma arquitetura híbrida prova a capacidade do sistema em operar sob o modelo de **Lock-in Avoidance** (evitar dependência de um único fornecedor), permitindo que o processamento seja escalado ou movido entre nuvens sem interrupção do serviço bancário.

## 🔟 Stack Tecnológica (Enterprise Grade)

A escolha da stack tecnológica do **Bank Resilience 2026** prioriza **desempenho de baixa latência, escalabilidade horizontal e confiabilidade transacional**. As tecnologias selecionadas são padrões de indústria em sistemas financeiros modernos, permitindo a orquestração de dados entre ambientes *on-premise* e múltiplos provedores de nuvem (*Multi-Cloud*).

Cada componente cumpre um papel estratégico, garantindo que a ingestão, o transporte e a liquidação dos dados ocorram sob protocolos de segurança rigorosos e alta disponibilidade.

### 💻 Core de Desenvolvimento e Persistência

* **Backend: Node.js & Express**
    Plataforma orientada a eventos e I/O não bloqueante, ideal para construir APIs de alta concorrência. No projeto, o Node.js gerencia o ciclo de vida das mensagens e o handshake SSL com o Kafka, mantendo o throughput estável durante a ingestão massiva.
* **Banco de Dados: MongoDB (Mongoose)**
    Banco NoSQL orientado a documentos, utilizado para a persistência final das transações. Sua flexibilidade de schema permite evoluir a estrutura de dados financeira sem downtime, enquanto seu motor de agregação sustenta o processo de **Auditoria Financeira**.

### 📨 Camada de Mensageria e Event Streaming



* **Event Streaming: Apache Kafka (Aiven)**
    Atua como o *backbone* de dados do projeto. Diferente de brokers tradicionais, o Kafka armazena o log de eventos de forma imutável, permitindo durabilidade extrema e a capacidade de reprocessar transações (Replay) em cenários de recuperação de desastres.
* **Mensageria: RabbitMQ (amqplib)**
    Utilizado como broker de suporte para filas duráveis e entrega garantida. Sua implementação garante o desacoplamento entre a API de ingestão e os workers de processamento, provendo alta granularidade no controle de mensagens.

### ☁️ Infraestrutura e Cloud

* **Hospedagem de API: Railway**
    Plataforma de PaaS (*Platform as a Service*) que sustenta a API de ingestão, provendo escalabilidade automática e gerenciamento seguro de segredos de infraestrutura.
* **Broker Gerenciado: Aiven**
    Provedor especializado em infraestrutura de dados em nuvem, responsável por hospedar o cluster Kafka com monitoramento em tempo real, backups automáticos e segurança **SSL/TLS** nativa.
* **Cloud Broker: CloudAMQP**
    Instância gerenciada de RabbitMQ, garantindo que o serviço de mensageria opere em um ambiente isolado e de alta disponibilidade.

### 🛠️ Ecossistema de Apoio e Governança

* **Segurança:** Protocolos **SSL/TLS** para criptografia em trânsito e **Dotenv** para isolamento de credenciais sensíveis.
* **Qualidade e Testes:** **Postman** para validação rigorosa dos contratos da API e **Git** para versionamento distribuído.
* **Observabilidade:** Dashboards de métricas da Aiven para monitoramento de throughput e saúde do cluster em janelas de 1h e 24h.

> [!IMPORTANT]
> A integração desta stack tecnológica não é apenas uma lista de ferramentas, mas uma arquitetura de **Resiliência de Dados**. O uso combinado de Kafka e MongoDB assegura que cada centavo dos **R$ 91.484.956,73** seja rastreável, do log de eventos ao registro final no banco de dados.

## 1️⃣1️⃣ Programas e Serviços Utilizados (Ecossistema de Infraestrutura)

A construção do **Bank Resilience 2026** envolveu a orquestração de ferramentas profissionais de alta performance, amplamente adotadas em arquiteturas de dados e backend em nuvem. A seleção abaixo garante que o sistema suporte o processamento de **R$ 91.484.956,73** com segurança criptográfica e alta disponibilidade.

### 🛠️ Matriz de Ferramentas e Finalidades Técnicas

| Categoria | Ferramenta | Papel Estratégico no Projeto |
| :--- | :--- | :--- |
| **Runtime** | **Node.js (LTS)** | Motor de execução orientado a eventos, responsável pelo processamento assíncrono e gerenciamento de streams de dados. |
| **Framework Web** | **Express** | Camada de middleware para criação do Gateway de Ingestão e rotas de monitoramento de saúde da API. |
| **Event Streaming** | **Apache Kafka (Aiven)** | Broker principal de alta performance. Gerencia o log de eventos imutável com persistência garantida em disco. |
| **Mensageria** | **RabbitMQ (CloudAMQP)** | Broker de suporte para filas duráveis, garantindo o desacoplamento e a entrega confiável das mensagens. |
| **Banco de Dados** | **MongoDB (Atlas / Local)** | Camada de persistência NoSQL (Document Store) onde ocorre a liquidação e o armazenamento final auditado. |
| **ODM / Modelagem** | **Mongoose** | Framework de modelagem de objetos para garantir a tipagem rigorosa e a validação dos dados financeiros antes da escrita. |
| **Cloud / Deploy** | **Railway** | Plataforma de nuvem (PaaS) que sustenta a API, provendo escalabilidade e integração direta com o GitHub. |
| **Segurança** | **OpenSSL / Certificados** | Geração e gestão de certificados `.pem` para estabelecer conexões seguras (**SSL/TLS**) entre os serviços. |
| **Testes de Stress** | **Postman** | Ferramenta de validação de endpoints e simulação de cargas de dados para testar a resiliência da API. |
| **Governança** | **Git / GitHub** | Versionamento distribuído e controle de histórico de alterações, garantindo a integridade do código-fonte. |
| **Configuração** | **Dotenv** | Gestão de segredos e variáveis de ambiente, isolando as credenciais de infraestrutura do código-fonte. |

### 🔍 Justificativa da Escolha de Infraestrutura

O uso conjunto de **Aiven (Kafka)** e **Railway (API)** permite que o sistema opere em uma arquitetura de **Nuvem Híbrida**. Enquanto o Railway oferece agilidade para o frontend de ingestão, a Aiven provê a robustez necessária para o tráfego de mensagens financeiras, oferecendo dashboards de monitoramento que comprovam a estabilidade do sistema sob carga.

A inclusão do **Upstash** no pipeline serve como uma camada adicional de auditoria e agendamento assíncrono, permitindo que o sistema execute tarefas de limpeza ou verificação de logs sem impactar a performance do core de processamento.

> [!IMPORTANT]
> A integração destas ferramentas foi configurada para suportar falhas parciais: se um serviço de nuvem apresentar instabilidade, os mecanismos de *retry* e as filas duráveis (RabbitMQ/Kafka) garantem que as transações fiquem retidas até a completa recuperação do sistema, mantendo a integridade dos dados financeiros.

---

## 🖼️ 1️⃣2️⃣ Evidências Operacionais do Ambiente de Execução

O registro visual do ambiente de execução complementa a documentação arquitetural do projeto, fornecendo evidências da implementação prática da solução, da integração entre os componentes do ecossistema e da validação operacional das camadas que compõem o sistema.

Abaixo estão as evidências técnicas de cada camada do pipeline, extraídas diretamente dos painéis de monitoramento e ferramentas de desenvolvimento.

---

### 📈 Monitoramento de Infraestrutura (Aiven Console)

As métricas de desempenho coletadas via **Aiven** fornecem a prova empírica da estabilidade do **Broker Kafka**. O monitoramento contínuo garante que o throughput de **R$ 91.484.956,73** não sofra gargalos de processamento.

#### 🔹 Métricas de Performance (CPU & Memória)
Visualização detalhada do consumo de recursos do cluster em janelas de **1 hora** e **24 horas**, comprovando:
* **Resiliência do hardware:** Estabilidade térmica e de processamento.
* **Manutenção da saúde do sistema:** Operação constante sob carga transacional.
* **Estabilidade do ambiente:** Ausência de saturação em picos de processamento.

#### 🔹 Taxas de Transferência (Network Throughput)
Registros de entrada e saída de dados que validam a eficiência do pipeline entre:
* **Railway:** Responsável pela Ingestão de Dados.
* **Worker Local:** Responsável pelo Processamento e Liquidação.

---

### 🏗️ Configuração de Tópicos e Resiliência

A estruturação lógica dentro do **Apache Kafka** garante imutabilidade e alta disponibilidade dos dados financeiros através de uma arquitetura de log de eventos distribuído.

#### 🔹 Tópicos e Partições
Evidência da criação do tópico transacional e sua segmentação em partições, permitindo:
* **Paralelismo no consumo:** Processamento multithreaded.
* **Escalabilidade horizontal:** Capacidade de expansão do ecossistema.
* **Distribuição eficiente de carga:** Equilíbrio de tráfego entre os nós do cluster.

#### 🔹 Fator de Replicação
Documentação visual que comprova a replicação dos dados entre os nós do cluster na Aiven, assegurando que:
* A falha de um broker individual não resulte em perda de mensagens (Durabilidade).

---

### 📂 Logs de Operação e Segurança SSL/TLS

A validação final ocorre na camada de aplicação, onde o handshake seguro e a persistência atômica são confirmados por registros de auditoria.

#### 🔹 Handshake SSL/TLS
Logs do terminal demonstrando autenticação mútua bem-sucedida via certificados `.pem`, estabelecendo:
* **Túnel criptografado:** Proteção de dados sensíveis em trânsito.
* **Comunicação segura:** Prevenção contra ataques de interceptação (*MitM*).
* **Conformidade:** Alinhamento com padrões de segurança do setor bancário.

#### 🔹 Consumo e Liquidação
Registros em tempo real do Worker processando **627 transações**, culminando no relatório de auditoria final que confirma:
* **Paridade absoluta dos valores:** Diferença zero entre origem e destino.
* **Persistência correta no MongoDB:** Gravação definitiva após o processamento.
* **Integridade transacional:** Fluxo fim a fim sem corrupção de dados.

---
> [!IMPORTANT]

> ### ✅ Conclusão de Auditoria
> A convergência entre as métricas de infraestrutura e os logs de execução atesta o sucesso da arquitetura de **Zero Data Loss**. O sistema provou-se capaz de sustentar o fluxo financeiro planejado com integridade total de dados, garantindo:
> * **Confiabilidade operacional** e resiliência a falhas críticas.
> * **Segurança na transmissão** via protocolos criptográficos avançados.
> * **Consistência na persistência** e rastreabilidade total do montante processado.
---

## 🖼️ Evidências Operacionais

O registro visual abaixo detalha o monitoramento, a infraestrutura e os testes de resiliência realizados no sistema.

### ☁️ Infraestrutura e IDE
| VS Code Projeto | Railway API | Deployments | Métricas API |
| :---: | :---: | :---: | :---: |
| <img src="img/01-vscode_projeto.png" width="200"/> | <img src="img/01-railway_api_bancario_resilience.png" width="200"/> | <img src="img/02-railway_api_bancario_resilience-deployments.png" width="200"/> | <img src="img/03-railway_api_bancario_resilience-metrics.png" width="200"/> |

---

### 🚀 Apache Kafka (Aiven)
| CPU 1h | MEM 1h | CPU 1d | MEM 1d |
| :---: | :---: | :---: | :---: |
| <img src="img/01-kafka-metrics_1hour.png" width="200"/> | <img src="img/02-kafka-metrics_1hour.png" width="200"/> | <img src="img/03-kafka-metrics_1day.png" width="200"/> | <img src="img/04-kafka-metrics_1day.png" width="200"/> |

| Logs | Topics | Info | Broker |
| :---: | :---: | :---: | :---: |
| <img src="img/02-kafka-logs.png" width="200"/> | <img src="img/03-kafka-topics.png" width="200"/> | <img src="img/04-kafka-topics-info.png" width="200"/> | <img src="img/05-kafka-topics-info_broker.png" width="200"/> |

| Partitions | Tráfego | Consumer Groups | - |
| :---: | :---: | :---: | :---: |
| <img src="img/06-kafka-topics-info_partitions.png" width="200"/> | <img src="img/07-kafka-topics-dados_trafego.png" width="200"/> | <img src="img/07-kafka-topics-info_consumer_groups.png" width="200"/> | |

---

### 📨 RabbitMQ (CloudAMQP)
| Channels | Connections | Exchanges | Monitor MP |
| :---: | :---: | :---: | :---: |
| <img src="img/01-cloudamqp-bank-resilience-channels.png" width="200"/> | <img src="img/02-cloudamqp-bank-resilience-connections.png" width="200"/> | <img src="img/03-cloudamqp-bank-resilience-exchanges.png" width="200"/> | <img src="img/04-cloudamqp-bank-resilience-mp.png" width="200"/> |

| Overview | Queues | - | - |
| :---: | :---: | :---: | :---: |
| <img src="img/05-cloudamqp-bank-resilience-overview.png" width="200"/> | <img src="img/06-cloudamqp-bank-resilience-queues_and_streams.png" width="200"/> | | |

---

### 🗄️ MongoDB (Compass)
| Documents | Aggregations | Schema | Indexes |
| :---: | :---: | :---: | :---: |
| <img src="img/01-mongodb-campass-documents.png" width="200"/> | <img src="img/02-mongodb-campass-aggregations.png" width="200"/> | <img src="img/02-mongodb-campass-schema.png" width="200"/> | <img src="img/04-mongodb-campass-indexes.png" width="200"/> |

---

### 🔄 Testes & Reprocessamento (Postman)
| Postman Send | Postman CloudAMQP | Postman Railway | Log Cloud |
| :---: | :---: | :---: | :---: |
| <img src="img/01-postman_send.png" width="200"/> | <img src="img/02-postman_send-cloudamqp.png" width="200"/> | <img src="img/03-postman_send_railway.png" width="200"/> | <img src="img/01-cloudamqp- postman_send.png" width="200"/> |

| Reprocessar 01 | Reprocessar 02 | - | - |
| :---: | :---: | :---: | :---: |
| <img src="img/01-enviando_reprocessamento.png" width="200"/> | <img src="img/02-enviado_reprocessando.png" width="200"/> | | |

---

> [!CHECK]
> **Conclusão de Auditoria Visual:** A integração entre as ferramentas de monitoramento (Aiven/Railway/CloudAMQP) e os logs de execução comprovam que o sistema atingiu **100% de integridade transacional**, processando o montante de **R$ 91.484.956,73** sem divergências.

## 👤 1️⃣3️⃣ Autor

**Roney Cesar** Analista em Desenvolvimento de Sistemas, com foco na integração entre desenvolvimento de software e engenharia de dados.

Este projeto foi desenvolvido como estudo educacional e simulação de um cenário financeiro real, com ênfase em:

- **Arquiteturas resilientes para sistemas bancários:** Implementação de padrões que garantem a continuidade dos serviços e a integridade transacional, minimizando pontos únicos de falha.  
- **Processamento assíncrono de transações:** Utilização de mensageria para o desacoplamento de microserviços, permitindo que o sistema processe altos volumes de transações sem comprometer a latência da API.  
- **Engenharia de dados aplicada a APIs:** Estruturação e modelagem de fluxos de dados ponta a ponta, garantindo que a informação trafegue com segurança entre produtores e consumidores.  
- **Boas práticas de mensageria e tolerância a falhas:** Configuração avançada de Brokers (Kafka/RabbitMQ) com foco em reprocessamento (retry), monitoramento de métricas e garantias de entrega.  
- **Integração entre backend, banco de dados e serviços em nuvem:** Orquestração de infraestrutura distribuída utilizando PaaS (Railway) e bancos NoSQL (MongoDB) para uma solução escalável e auditável.

## 📚 1️⃣4️⃣ Referências e Fontes de Estudo

O desenvolvimento deste projeto foi baseado em pesquisa técnica e aprendizado contínuo por meio de:

### 🛠️ Tecnologias e Serviços Utilizados
- **Hospedagem e Cloud (PaaS):** [Railway](https://railway.app/) - Plataforma utilizada para deploy e monitoramento da API.
- **Mensageria Apache Kafka:** [Aiven](https://aiven.io/) - Serviço gerenciado para o cluster Kafka e métricas de performance.
- **Mensageria RabbitMQ:** [CloudAMQP](https://www.cloudamqp.com/) - Broker utilizado para o processamento assíncrono e filas.
- **Banco de Dados NoSQL:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) & [Compass](https://www.mongodb.com/products/compass) - Persistência de dados e auditoria.
- **Runtime e Framework:** [Java / Spring Boot](https://spring.io/projects/spring-boot) (ou Node.js conforme sua implementação) - Core do desenvolvimento backend.
- **Testes de API:** [Postman](https://www.postman.com/) - Documentação e validação de endpoints e fluxos de reprocessamento.

### 📖 Fontes de Aprendizado
- **Documentações Oficiais:** Consultas constantes aos manuais técnicos do Node.js, MongoDB, RabbitMQ e documentação do cluster Aiven.
- **Conteúdos Educacionais:** Tutoriais técnicos e estudos de caso de arquitetura de software disponíveis no YouTube e plataformas de desenvolvimento.
- **Inteligência Artificial:** Utilização de ferramentas de IA para apoio conceitual, validação de arquiteturas resilientes e revisão de abordagens técnicas.
- **Engenharia de Software:** Aplicação de boas práticas em sistemas distribuídos, padrões de resiliência e ambientes financeiros de missão crítica.
