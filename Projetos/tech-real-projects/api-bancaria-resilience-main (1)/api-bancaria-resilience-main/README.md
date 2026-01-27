# 🏦 Bank Resilience 2026: Ecossistema de Processamento Bancário Multi-Cloud

---

## 1️⃣ Introdução

O **Bank Resilience 2026** é um projeto de estudo avançado que simula a arquitetura de um sistema bancário resiliente, projetado para suportar **altos volumes de transações financeiras distribuídas entre múltiplos provedores de nuvem (AWS e Azure)** sem risco de perda de dados.

A proposta reproduz desafios reais do setor financeiro, onde **disponibilidade contínua, integridade transacional, rastreabilidade e governança de dados** são requisitos obrigatórios. A arquitetura foi concebida com base em boas práticas observadas no ecossistema de adquirência, processamento de pagamentos e sistemas bancários, aproximando o projeto de cenários corporativos encontrados em instituições financeiras e empresas de meios de pagamento.

Este projeto não foca apenas na construção de uma API, mas na simulação de um **ecossistema de processamento transacional**, onde diferentes componentes desempenham papéis bem definidos dentro de um fluxo crítico de dados financeiros.

---

### 🎯 Objetivos Técnicos do Projeto

- Garantir que **nenhuma transação financeira seja perdida**, mesmo diante de falhas temporárias de rede ou indisponibilidade de serviços  
- Implementar **desacoplamento entre recepção e processamento**, utilizando mensageria assíncrona  
- Construir um pipeline de dados **escalável, auditável e tolerante a falhas**  
- Aplicar conceitos de **consistência eventual**, comuns em arquiteturas distribuídas  
- Simular um processo de **conciliação financeira**, prática essencial em ambientes bancários e de adquirência  

---

### 🧩 Problema Arquitetural Abordado

Em sistemas financeiros, o processamento síncrono representa um alto risco: qualquer falha pode gerar perda de dados ou inconsistências contábeis. Para mitigar esse risco, a arquitetura deste projeto utiliza um **modelo orientado a mensageria**, onde o broker atua como camada de segurança entre a entrada e o processamento dos dados.

O fluxo principal segue o padrão:

Recebimento (API) → Fila de Mensagens → Processamento Assíncrono (Worker) → Persistência → Auditoria


Esse modelo garante:

- **Resiliência a falhas**
- **Retry automático**
- **Isolamento de responsabilidades**
- **Consistência dos dados**
- **Observabilidade do fluxo transacional**

---

### 🏛️ Visão de Arquitetura Bancária Aplicada

A estrutura do projeto foi pensada com base em conceitos utilizados em sistemas bancários modernos:

- Separação entre **camada de entrada (API)** e **camada de processamento**
- Uso de **mensageria durável** como buffer transacional
- Persistência orientada a documentos para alta flexibilidade de dados
- Registro de informações para **auditoria e reconciliação financeira**
- Simulação de integração entre diferentes origens de nuvem (multi-cloud)

Essa abordagem aproxima o projeto de cenários reais de processamento de pagamentos, onde é essencial garantir:

✔ Integridade dos valores financeiros  
✔ Não duplicidade de transações  
✔ Capacidade de rastrear cada operação  
✔ Possibilidade de auditoria posterior  

---

### 📚 Contexto Educacional e Profissional

Embora seja um projeto educacional, sua modelagem foi guiada por uma **visão profissional de arquitetura bancária**, conectando práticas de engenharia de software, mensageria, tratamento de dados e governança ao contexto de sistemas financeiros distribuídos.

O projeto serve como um estudo aplicado de:

- Arquiteturas resilientes  
- Processamento assíncrono  
- ETL financeiro  
- Conciliação de dados  
- Boas práticas do setor bancário e de adquirência  

---

### 🎯 Objetivos do Projeto

Este projeto foi concebido com foco em boas práticas de engenharia aplicadas a sistemas financeiros distribuídos. Os objetivos vão além da construção de uma API, abrangendo conceitos de arquitetura resiliente, governança de dados e processamento transacional.

- Garantir que **nenhuma transação financeira seja perdida**, mesmo sob falhas temporárias de rede, indisponibilidade de serviços ou picos de carga  
- Implementar **desacoplamento entre recepção e processamento**, utilizando mensageria assíncrona como mecanismo de resiliência  
- Construir um pipeline de dados **escalável, observável e auditável**, adequado para cenários de alto volume transacional  
- Aplicar princípios de **consistência eventual**, comuns em arquiteturas distribuídas do setor bancário  
- Simular um processo de **conciliação financeira**, validando a integridade dos valores processados  
- Garantir **rastreabilidade ponta a ponta**, permitindo identificar a origem, o status e o destino de cada transação  
- Modelar o sistema com base em práticas utilizadas em ambientes de **adquirência e processamento de pagamentos**, aproximando o estudo de cenários reais do mercado financeiro
---

### 🧩 Problema Arquitetural Abordado

Em sistemas financeiros, o processamento síncrono representa um alto risco: qualquer falha pode gerar perda de dados ou inconsistências contábeis. Para mitigar esse risco, a arquitetura deste projeto utiliza um **modelo orientado a mensageria**, onde o broker atua como camada de segurança entre a entrada e o processamento dos dados.

O fluxo principal segue o padrão:

Recebimento (API) → Fila de Mensagens → Processamento Assíncrono (Worker) → Persistência → Auditoria
Essa abordagem é amplamente utilizada em plataformas de pagamento e sistemas bancários modernos, pois permite:

- **Resiliência a falhas temporárias**
- **Mecanismo de retry automático**
- **Isolamento de responsabilidades entre serviços**
- **Proteção contra sobrecarga do banco de dados**
- **Consistência eventual**, característica comum em arquiteturas distribuídas

Dessa forma, a fila atua como uma camada de segurança lógica, garantindo que cada transação seja processada de forma confiável, rastreável e auditável, mesmo em cenários adversos de infraestrutura.

## 2️⃣ Integração entre Ferramentas

A arquitetura do **Bank Resilience 2026** é composta por um conjunto de tecnologias que, integradas, formam um ecossistema de processamento transacional resiliente. Cada ferramenta desempenha um papel específico dentro do fluxo de dados, refletindo a separação de responsabilidades comum em sistemas financeiros de alta disponibilidade.

Essa composição tecnológica foi definida com base em boas práticas de mercado, priorizando **desacoplamento, escalabilidade, observabilidade e confiabilidade operacional**. O objetivo é garantir que a recepção, o transporte, o processamento e a persistência das transações ocorram de maneira segura e auditável.

A seguir, estão as principais tecnologias utilizadas e suas respectivas funções no sistema:

| Tecnologia | Papel no Sistema |
|-----------|------------------|
| **Node.js** | Ambiente de execução da API e dos serviços de processamento (Workers) |
| **Express** | Camada HTTP responsável por expor os endpoints da API |
| **MongoDB Atlas / Local** | Persistência das transações financeiras em modelo NoSQL |
| **CloudAMQP (RabbitMQ)** | Broker de mensageria responsável pelo buffer transacional e resiliência |
| **Railway** | Plataforma de deploy contínuo (CI/CD) da API |
| **Upstash (QStash)** | Apoio à auditoria, logs assíncronos e agendamentos |
| **Postman** | Ferramenta de testes de carga e validação de endpoints |

Essa integração forma um pipeline de dados distribuído, onde cada componente atua de forma coordenada para garantir que as transações sejam processadas com integridade, rastreabilidade e tolerância a falhas.

## 3️⃣ Arquitetura do Sistema

A arquitetura do sistema foi desenhada com foco em **resiliência, desacoplamento e confiabilidade transacional**, princípios fundamentais em ambientes financeiros e plataformas de processamento de pagamentos. Em vez de concentrar todas as responsabilidades em um único serviço, o fluxo foi dividido em camadas especializadas, permitindo maior controle sobre falhas, escalabilidade e auditoria.

O modelo adotado segue uma abordagem orientada a eventos, onde a mensageria atua como elo entre a camada de entrada e o processamento efetivo dos dados. Essa estratégia reduz o impacto de indisponibilidades momentâneas, evita sobrecarga de componentes críticos e possibilita rastrear o ciclo de vida de cada transação.

Abaixo está a visão simplificada do fluxo principal do sistema:

```text
          🌍 Cliente / ETL
                │
                ▼
        🚀 API (Railway - Node.js)
                │
                ▼
      📨 RabbitMQ (CloudAMQP)
                │
                ▼
        ⚙️ Worker Assíncrono
                │
                ▼
        🗄 MongoDB Atlas
                │
                ▼
        📊 Auditoria & Relatórios
```

A arquitetura do projeto foi estruturada para separar claramente as responsabilidades de **Ingestão**, **Processamento** e **Auditoria**, prática comum em sistemas financeiros distribuídos. Essa divisão favorece a escalabilidade, facilita a manutenção e reduz o acoplamento entre os componentes, permitindo que cada camada evolua de forma independente.

O modelo também reforça princípios de governança de dados e rastreabilidade, essenciais em ambientes bancários e de adquirência, onde é necessário compreender todo o ciclo de vida de uma transação — da entrada até a consolidação final.

A organização do repositório reflete essa arquitetura em camadas:


## 4️⃣ Estrutura do Projeto
A organização do repositório segue o princípio de **separação de responsabilidades**, dividindo a solução entre camadas de ingestão, processamento, dados e documentação. Essa estrutura facilita a escalabilidade, manutenção e entendimento da arquitetura do sistema.
```text

📦 bank-resilience-2026
┣ 📂 api-railway
┃ ┣ 📄 index.js              # API Express que recebe as transações
┃ ┣ 📄 ingestao.js           # ETL CSV → RabbitMQ
┃ ┗ 📄 .env                  # Configurações Railway / CloudAMQP
┃
┣ 📂 data
┃ ┗ 📄 transacoes_brutas.csv # Base de dados bruta para ingestão
┃
┣ 📂 local-worker
┃ ┣ 📄 worker.js             # Consome fila e salva no MongoDB
┃ ┣ 📄 auditoria.js          # Conciliação e validação financeira
┃ ┣ 📄 relatorio_final.js    # Exportação CSV consolidado
┃ ┣ 📄 extrair_base.js       # Recuperação de base do MongoDB
┃ ┗ 📄 .env                  # Configuração Broker + Banco Local
┃S
┣ 📂 img
┃ ┗ 🖼️ (prints dos dashboards, monitoramento e testes)
┃
┣ 📂 infra
┃ ┗ ⚙️ (arquivos de apoio e configurações de infraestrutura)
┃
┗ 📄 README.md               # Documentação técnica do projeto


```
## 5️⃣ Camada de Dados & ETL

O sistema foi projetado para processar **transações financeiras com características típicas de ambientes bancários**, onde a qualidade e a padronização dos dados são fatores críticos para garantir integridade contábil e confiabilidade dos relatórios.

Antes de serem enviadas para a nuvem e inseridas no fluxo de mensageria, as transações passam por um processo estruturado de **ETL (Extract, Transform, Load)**. Essa etapa é fundamental para evitar inconsistências, erros de tipo e falhas de processamento em etapas posteriores do pipeline.

O tratamento aplicado simula práticas comuns em plataformas de pagamento e sistemas de adquirência, onde dados de diferentes origens precisam ser normalizados antes de entrar nos sistemas centrais.

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

A camada de scripts representa a implementação prática da arquitetura proposta. Cada arquivo possui uma responsabilidade bem definida dentro do fluxo transacional, reforçando o princípio de **separação de responsabilidades**, amplamente adotado em sistemas financeiros distribuídos.

Essa organização:

- Reduz acoplamento entre componentes  
- Facilita manutenção e evolução do sistema  
- Melhora a observabilidade do fluxo transacional  
- Aproxima o projeto de padrões utilizados em ambientes bancários e de adquirência  

---

### 🛠️ Ingestão de Dados (`ingestao.js`)

Responsável pela entrada estruturada das transações no ecossistema de mensageria.

**Funções principais:**

- Leitura do dataset com **627 registros**
- Conversão de dados CSV para objetos JSON estruturados
- Envio das transações para o RabbitMQ (CloudAMQP)
- Controle de cadenciamento (rate control) para evitar sobrecarga na API e no broker

Essa etapa simula a entrada de dados provenientes de múltiplas origens, como diferentes provedores de nuvem ou sistemas externos.

---

### 👷 Processamento Assíncrono (`worker.js`)

Componente central da resiliência do sistema, responsável pelo consumo das mensagens e persistência das transações.

**Lógica de processamento:**

- Monitora a fila `transacoes-pendentes`
- Utiliza `prefetch(1)` para processar **uma transação por vez**
- Executa o `ack` somente após a confirmação de gravação no MongoDB
- Evita perda de mensagens em caso de falha no banco ou na aplicação

Esse modelo reproduz práticas utilizadas em sistemas financeiros que exigem confiabilidade transacional e controle rigoroso do processamento.

---

### 📊 Auditoria Financeira (`auditoria.js`)

Script responsável pela validação do volume financeiro processado, simulando um processo de conciliação.

**Funções:**

- Execução de agregações no MongoDB
- Validação do total de registros processados
- Conferência da integridade dos valores financeiros

**Resultado obtido no projeto:**

> 💰 **R$ 91.484.956,73 processados com 0% de perda de dados**

Essa etapa representa um processo essencial em ambientes de pagamento: a verificação pós-processamento.

---

### 📁 Geração de Relatórios (`relatorio_final.js`)

Responsável pela consolidação final dos dados.

**Funções:**

- Exportação de CSV consolidado
- Disponibilização de dados para análise financeira, BI ou contabilidade
- Suporte ao processo de reconciliação

---

### 📥 Bases de Dados do Projeto

Esta seção conecta o código ao ciclo completo de dados (entrada → processamento → saída), sendo relevante para entendimento do fluxo.

| Etapa do Projeto | Arquivo |
| :--- | :--- |
| **Dados Originais (Entrada)** | `data/transacoes_brutas.csv` |
| **Dados Liquidados (Saída)** | `local-worker/liquidacao_final_2026.csv` |

---

## ⚙️ Detalhamento Técnico e Configurações

Após compreender os papéis dos scripts, é importante documentar as configurações que permitem a comunicação entre os componentes. Em arquiteturas distribuídas e orientadas a mensageria, o uso de variáveis de ambiente é essencial para segurança e portabilidade.

---

### 🔑 Variáveis de Ambiente (`.env`)

Credenciais e conexões sensíveis não são versionadas no repositório. Utiliza-se `.env` para separar configuração de código.

> ⚠️ No GitHub, os valores reais devem ser substituídos por placeholders.

#### Exemplo — Worker (`local-worker/.env`)

env
RABBITMQ_URL=amqps://usuario:senha@host/vhost
MONGO_LOCAL_URI=mongodb://localhost:27017/bank_db

## 7️⃣ Etapas do Projeto

O desenvolvimento do **Bank Resilience 2026** foi organizado em fases estruturadas, refletindo a jornada típica de construção de um sistema transacional resiliente. Essa divisão permite visualizar a evolução da arquitetura desde a base de dados até a validação final, seguindo um fluxo alinhado às boas práticas de engenharia de software aplicadas ao setor financeiro.

Cada etapa representa um bloco funcional do ecossistema, demonstrando como dados brutos são transformados em informações confiáveis, auditáveis e prontas para análise.

| Fase | Descrição |
|------|-----------|
| 🟢 **MongoDB** | Configuração do cluster, criação de Collections e modelagem de Schemas flexíveis para transações financeiras |
| 🟡 **ETL & Mensageria** | Tratamento dos dados brutos, padronização das informações e envio para filas duráveis no RabbitMQ |
| 🔵 **Deploy** | Publicação da API no Railway com integração via GitHub e configuração de variáveis de ambiente |
| 🟣 **Validação** | Execução do Worker consumindo 627 mensagens e geração do relatório final de liquidação |

Essa organização em fases evidencia a transição de um conjunto de dados não estruturados para um fluxo transacional completo, reforçando a confiabilidade do processamento e a capacidade de auditoria financeira do sistema.

## 8️⃣ Endpoints da API

A API representa a **camada de entrada do sistema**, responsável por receber transações, validar a comunicação com os serviços críticos e garantir que os dados sejam encaminhados de forma segura para o pipeline assíncrono.  

Ela atua como a “porta de entrada” da arquitetura resiliente, isolando o cliente da complexidade interna de filas, workers e banco de dados. Dessa forma, mesmo que o processamento esteja temporariamente indisponível, a API continua recebendo requisições e encaminhando-as para a fila, preservando a integridade das transações.

| Método | Rota       | Descrição |
|--------|-----------|-----------|
| **POST** | `/ingestao` | Recebe dados brutos de transações e os envia para a fila de processamento no RabbitMQ |
| **GET**  | `/status`   | Verifica a saúde da API e a conectividade com o RabbitMQ e o MongoDB |

## 9️⃣ Deploy & Infraestrutura

A estratégia de deploy foi planejada para refletir um cenário bancário real, onde diferentes componentes operam em camadas distintas de infraestrutura. A API fica exposta na nuvem para receber requisições externas, enquanto o processamento crítico ocorre de forma isolada, simulando um serviço interno protegido.

Essa separação reforça conceitos de **segurança, resiliência e desacoplamento**, além de demonstrar como sistemas financeiros distribuem responsabilidades entre borda (edge), mensageria e core de processamento.

- **API hospedada no Railway**  
  Ambiente em nuvem responsável pela camada de ingestão, recebendo transações e publicando mensagens na fila.

- **Worker rodando localmente**  
  Simula um serviço interno do core bancário, responsável pelo processamento das transações e persistência no MongoDB.

- **Variáveis de ambiente via `.env`**  
  Configurações sensíveis (credenciais, URIs e chaves) são externalizadas, seguindo boas práticas de segurança.

- **Fila configurada como `durable`**  
  Garante que as mensagens não sejam perdidas mesmo em reinicializações do broker, mantendo a integridade do fluxo financeiro.

## 🔟 Stack Tecnológica

A escolha da stack prioriza **desempenho, escalabilidade e confiabilidade**, características essenciais em sistemas financeiros. As tecnologias utilizadas são amplamente adotadas no mercado, permitindo integração com ambientes corporativos, serviços em nuvem e pipelines de dados resilientes.

Cada ferramenta cumpre um papel específico dentro da arquitetura, compondo um ecossistema que sustenta ingestão segura, processamento assíncrono e persistência consistente.

- **Backend:** Node.js, Express  
  Plataforma leve e orientada a eventos, ideal para APIs de alta concorrência e integração com mensageria.

- **Banco de Dados:** MongoDB (Mongoose)  
  Persistência NoSQL com modelagem flexível e suporte a grandes volumes de dados transacionais.

- **Mensageria:** RabbitMQ (amqplib)  
  Broker responsável pelo desacoplamento entre ingestão e processamento, garantindo filas duráveis e controle de entrega.

- **Infraestrutura:** Railway, CloudAMQP  
  Serviços em nuvem utilizados para hospedagem da API e gerenciamento do broker de mensagens.

- **Ferramentas de Apoio:** Postman, Git, Dotenv  
  Utilizados para testes de endpoints, versionamento de código e gestão segura de variáveis de ambiente.

## 1️⃣1️⃣ Programas e Serviços Utilizados

A construção do projeto envolveu a utilização de ferramentas profissionais amplamente adotadas em ambientes corporativos, principalmente em contextos de dados, backend e arquitetura em nuvem.

| Categoria | Ferramenta | Finalidade no Projeto |
|----------|------------|-----------------------|
| **Runtime** | Node.js | Execução da API e dos scripts de processamento |
| **Framework Web** | Express | Criação da camada HTTP da API |
| **Banco de Dados** | MongoDB Atlas / Local | Armazenamento das transações processadas |
| **ODM** | Mongoose | Modelagem e validação de dados no MongoDB |
| **Mensageria** | RabbitMQ (CloudAMQP) | Fila resiliente para desacoplar ingestão e processamento |
| **Cloud / Deploy** | Railway | Hospedagem da API em ambiente de nuvem |
| **Mensageria Auxiliar** | Upstash (QStash) | Auditoria, logs e agendamentos assíncronos |
| **Testes de API** | Postman | Validação de endpoints e testes de requisições |
| **Versionamento** | Git + GitHub | Controle de versão e CI/CD |
| **Ambiente** | Dotenv | Gerenciamento de variáveis de ambiente |
| **Editor** | VS Code | Desenvolvimento e organização do projeto |

---

## 🖼️ 1️⃣2️⃣ Evidências Visuais

O registro visual do ambiente de execução complementa a documentação arquitetural do projeto, fornecendo evidências da implementação prática da solução, da integração entre os componentes do ecossistema e da validação operacional das camadas que compõem o sistema.

Abaixo, apresento as evidências técnicas de cada camada do pipeline, extraídas diretamente dos painéis de monitoramento e ferramentas de desenvolvimento.

---

### ☁️ Infraestrutura e Cloud (Railway & VS Code)

Validação do deploy em nuvem e da organização do ambiente de desenvolvimento.

<table>
<tr>
<td align="center"><b>Arquitetura no VS Code</b></td>
<td align="center"><b>Deploy API Railway</b></td>
<td align="center"><b>Métricas de Performance</b></td>
</tr>
<tr>
<td align="center"><img src="./img/01%20-vscode_projeto.png" width="260"/></td>
<td align="center"><img src="./img/01-railway_api_bancario_resilience.png" width="260"/></td>
<td align="center"><img src="./img/03-railway_api_bancario_resilience-metrics.png" width="260"/></td>
</tr>
</table>

---

### 📨 Mensageria em Tempo Real (CloudAMQP / RabbitMQ)

Monitoramento do tráfego de mensagens, conexões ativas e saúde das filas.

<table>
<tr>
<td align="center"><b>Overview do Broker</b></td>
<td align="center"><b>Conexões Ativas</b></td>
<td align="center"><b>Filas e Streams</b></td>
</tr>
<tr>
<td align="center"><img src="./img/05-cloudamqp-bank-resilience-overview.png" width="260"/></td>
<td align="center"><img src="./img/02-cloudamqp-bank-resilience-connections.png" width="260"/></td>
<td align="center"><img src="./img/06-cloudamqp-bank-resilience-queues_and_streams.png" width="260"/></td>
</tr>
</table>

---

### 🗄️ Persistência e Auditoria (MongoDB)

Validação da gravação dos dados, agregações e índices de performance.

<table>
<tr>
<td align="center"><b>Documentos Inseridos</b></td>
<td align="center"><b>Agregações (Auditoria)</b></td>
<td align="center"><b>Índices de Segurança</b></td>
</tr>
<tr>
<td align="center"><img src="./img/01-mongodb-campass-documents.png" width="260"/></td>
<td align="center"><img src="./img/02-mongodb-campass-aggregations.png" width="260"/></td>
<td align="center"><img src="./img/04-mongodb-campass-indexes.png" width="260"/></td>
</tr>
</table>

---

### 🔄 Testes de Integração (Postman & Reprocessamento)

Simulação de transações reais enviadas para a nuvem e consumidas localmente.

<table>
<tr>
<td align="center"><b>Envio via Postman</b></td>
<td align="center"><b>Postman vs CloudAMQP</b></td>
<td align="center"><b>Fluxo de Reprocessamento</b></td>
</tr>
<tr>
<td align="center"><img src="./img/01-postman_send.png" width="260"/></td>
<td align="center"><img src="./img/02-postman_send-cloudamqp.png" width="260"/></td>
<td align="center"><img src="./img/01-enviando_reprocessamento.png" width="260"/></td>
</tr>
</table>

---

## 👤 1️⃣3️⃣ Autor

**Roney Cesar**  
Analista em Desenvolvimento de Sistemas, com foco na integração entre desenvolvimento de software e engenharia de dados.

Este projeto foi desenvolvido como estudo educacional e simulação de um cenário financeiro real, com ênfase em:

- Arquiteturas resilientes para sistemas bancários  
- Processamento assíncrono de transações  
- Engenharia de dados aplicada a APIs  
- Boas práticas de mensageria e tolerância a falhas  
- Integração entre backend, banco de dados e serviços em nuvem  

## 📚 1️⃣4️⃣ Referências e Fontes de Estudo

O desenvolvimento deste projeto foi baseado em pesquisa técnica e aprendizado contínuo por meio de:

- Documentações oficiais das tecnologias utilizadas (Node.js, MongoDB, RabbitMQ, Railway, etc.)  
- Conteúdos educacionais e tutoriais técnicos disponíveis no YouTube  
- Consultas a ferramentas de Inteligência Artificial para apoio conceitual e validação de abordagens  
- Boas práticas de arquitetura de sistemas distribuídos e ambientes financeiros  
