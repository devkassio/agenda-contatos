<div align="center">

# 📇 Agenda de Contatos

### Sistema Completo de Gerenciamento de Contatos

**Aplicação Full Stack desenvolvida com Node.js, React e SQLite**

[![Node.js](https://img.shields.io/badge/Node.js-22.16.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://www.sqlite.org/)
[![ES6 Modules](https://img.shields.io/badge/ES6-Modules-yellow.svg)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[🚀 Início Rápido](#-início-rápido) •
[📋 Funcionalidades](#-funcionalidades) •
[🏗️ Arquitetura](#️-arquitetura) •
[📚 API](#-documentação-da-api) •
[🎯 Testes](#-como-testar)

</div>

---

## 📖 Sobre o Projeto

Sistema de gerenciamento de contatos Full Stack implementando as melhores práticas de desenvolvimento web moderno. A aplicação oferece uma interface intuitiva para cadastro, edição, pesquisa e exclusão de contatos, com sistema de múltiplos telefones por contato, auditoria completa de operações e PWA (Progressive Web App).

### 🎯 Diferenciais Técnicos

- ✨ **Arquitetura ES6 Modules** - Backend totalmente modularizado com imports/exports modernos
- 🔔 **Sistema de Notificações Toast** - UX aprimorada com feedback visual animado
- 🔒 **Validação de Dados** - Números de telefone únicos com proteção de duplicatas
- 🔐 **Privacidade de Dados** - Mensagens de erro que não expõem informações de outros usuários
- 📊 **Sistema de Auditoria** - Logs detalhados de todas as exclusões realizadas
- 🎨 **Interface Responsiva** - Design moderno e adaptável a qualquer dispositivo
- ⚡ **Performance Otimizada** - SQLite síncrono para respostas instantâneas
- 📱 **PWA Completo** - Aplicativo instalável com manifest e service worker
- 🚀 **CI/CD Automatizado** - GitHub Actions para testes e deploy contínuo
- 🌐 **Deploy Automático** - GitHub Pages (frontend) + Render (backend)

---

## 🚀 Tecnologias Utilizadas

### Backend

| Tecnologia         | Versão  | Finalidade                                     |
| ------------------ | ------- | ---------------------------------------------- |
| **Node.js**        | 22.16.0 | Runtime JavaScript de alta performance         |
| **Express**        | 4.18.2  | Framework web minimalista e robusto            |
| **better-sqlite3** | 9.2.2   | Banco de dados SQLite com operações síncronas  |
| **CORS**           | 2.8.5   | Habilitação segura de requisições cross-origin |

### Frontend

| Tecnologia | Versão | Finalidade                              |
| ---------- | ------ | --------------------------------------- |
| **React**  | 18.3.1 | Biblioteca UI para interfaces dinâmicas |
| **Axios**  | 1.6.4  | Cliente HTTP com interceptors           |
| **CSS3**   | -      | Estilização moderna com animações       |

### DevOps & Deploy

| Ferramenta         | Finalidade                                  |
| ------------------ | ------------------------------------------- |
| **Git**            | Controle de versão com histórico organizado |
| **GitHub Actions** | CI/CD automatizado para testes e deploy     |
| **GitHub Pages**   | Hospedagem do frontend estático             |
| **Render**         | Plataforma para deploy do backend           |
| **nodemon**        | Hot reload durante desenvolvimento          |

---

## 📋 Funcionalidades

### 👤 Gerenciamento de Contatos

- ✅ **Cadastro Completo** - Nome, idade e múltiplos telefones
- ✅ **Listagem Paginada** - Visualização organizada de todos os contatos
- ✅ **Busca Avançada** - Pesquisa simultânea por nome e telefone
- ✅ **Edição Rápida** - Modal intuitivo para atualização de dados
- ✅ **Exclusão Segura** - Confirmação antes de remover contatos
- ✅ **Validação em Tempo Real** - Feedback imediato de campos obrigatórios

### 🔔 Sistema de Notificações

- ✨ **Toast Notifications** - Notificações animadas e não-invasivas
- 🎨 **4 Tipos de Alertas** - Sucesso, Erro, Aviso e Informação
- ⏱️ **Auto-fechamento** - Desaparecem automaticamente após 3 segundos
- 🖱️ **Fechamento Manual** - Botão de fechar disponível

### 🔒 Segurança e Validação

- 🔐 **Telefones Únicos** - Validação backend impede duplicação de números
- 🛡️ **Proteção de Privacidade** - Mensagens de erro genéricas
- 📝 **Sanitização de Dados** - Validação de entrada em todas as operações
- 🔗 **Integridade Referencial** - CASCADE delete entre tabelas relacionadas

### 📊 Auditoria e Logs

- 📁 **Registro de Exclusões** - Arquivo `logs/exclusoes.txt` automático
- 🕐 **Timestamp Preciso** - Data e hora de cada operação
- 📋 **Dados Completos** - ID, nome, idade e todos os telefones registrados

---

## 🗄️ Estrutura do Banco de Dados

### Modelo Relacional

```sql
-- Tabela de Contatos
CREATE TABLE Contato (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100) NOT NULL,
    IDADE INTEGER
);

-- Tabela de Telefones (relacionamento 1:N)
CREATE TABLE Telefone (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    IDCONTATO INTEGER NOT NULL,
    NUMERO VARCHAR(16) UNIQUE NOT NULL,
    FOREIGN KEY (IDCONTATO) REFERENCES Contato(ID) ON DELETE CASCADE
);
```

### Diagrama de Relacionamento

```
┌─────────────────┐         ┌─────────────────┐
│    Contato      │         │    Telefone     │
├─────────────────┤         ├─────────────────┤
│ ID (PK)         │────────<│ ID (PK)         │
│ NOME            │    1:N  │ IDCONTATO (FK)  │
│ IDADE           │         │ NUMERO (UNIQUE) │
└─────────────────┘         └─────────────────┘
```

### Índices e Constraints

- **Primary Keys**: Auto-incrementais em ambas as tabelas
- **Foreign Key**: `IDCONTATO` com `ON DELETE CASCADE`
- **Unique Constraint**: `NUMERO` na tabela Telefone
- **Not Null**: `NOME` e `NUMERO` são obrigatórios

---

## � Início Rápido

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior ([Download](https://nodejs.org/))
- **npm** (incluído com Node.js) ou **yarn**
- **Git** para controle de versão ([Download](https://git-scm.com/))

### 📥 Instalação

#### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/devkassio/agenda-contatos.git
cd agenda-contatos
```

#### 2️⃣ Configure o Backend

```bash
cd backend
npm install
```

**Dependências instaladas:**

- express (^4.18.2)
- better-sqlite3 (^9.2.2)
- cors (^2.8.5)

#### 3️⃣ Configure o Frontend

```bash
cd ../frontend
npm install
```

**Dependências instaladas:**

- react (^18.3.1)
- react-dom (^18.3.1)
- axios (^1.6.4)

### ▶️ Execução

#### Terminal 1 - Backend (Porta 3001)

```bash
cd backend
npm start
```

**Saída esperada:**

```
Servidor rodando na porta 3001
Banco de dados inicializado com sucesso
```

#### Terminal 2 - Frontend (Porta 3000)

```bash
cd frontend
npm start
```

**Saída esperada:**

```
Compiled successfully!
You can now view the application in the browser.
Local: http://localhost:3000
```

O navegador abrirá automaticamente em `http://localhost:3000` 🎉

### 🧪 Verificação da Instalação

Após iniciar ambos os servidores:

1. ✅ Acesse `http://localhost:3000` - Frontend carregado
2. ✅ Teste `http://localhost:3001/api/contatos` - API respondendo
3. ✅ Crie um contato de teste via interface
4. ✅ Verifique o arquivo `backend/contatos.db` foi criado
5. ✅ Logs aparecem em `logs/exclusoes.txt` após exclusões

---

## 🎯 Como Testar

### Fluxo Completo de Uso

#### ➕ Adicionar Contato

1. Clique no botão **"➕ Novo Contato"**
2. Preencha o nome (obrigatório)
3. Adicione idade (opcional)
4. Insira pelo menos um telefone
5. Clique em **"Adicionar Telefone"** para múltiplos números
6. Clique em **"Salvar"**
7. ✅ Toast de sucesso: _"Contato criado com sucesso!"_

#### 🔍 Pesquisar Contatos

1. Digite no campo **"Pesquisar por nome"** ou **"Pesquisar por telefone"**
2. Clique em **"🔍 Pesquisar"**
3. Resultados filtrados aparecem instantaneamente
4. Clique em **"✕ Limpar Pesquisa"** para ver todos

#### ✏️ Editar Contato

1. Localize o contato desejado
2. Clique em **"✏️ Editar"**
3. Modifique os dados necessários
4. Adicione ou remova telefones
5. Clique em **"Salvar"**
6. ✅ Toast de sucesso: _"Contato atualizado com sucesso!"_

#### 🗑️ Excluir Contato

1. Localize o contato desejado
2. Clique em **"🗑️ Excluir"**
3. Confirme na mensagem de alerta
4. ✅ Toast de sucesso: _"Contato excluído com sucesso!"_
5. 📝 Exclusão registrada em `logs/exclusoes.txt`

### 🔒 Testes de Validação

#### Telefone Duplicado

1. Crie um contato com telefone `(11) 98888-8888`
2. Tente criar outro contato com o mesmo telefone
3. ❌ Toast de erro: _"O telefone (11) 98888-8888 já está cadastrado para outro contato"_
4. ✅ **Privacidade protegida**: não revela o nome do primeiro contato

#### Campos Obrigatórios

1. Tente salvar sem nome
2. ❌ Toast de erro: _"Nome é obrigatório"_
3. Tente salvar sem telefone
4. ❌ Toast de erro: _"Adicione pelo menos um telefone"_

### 📊 Visualizar Banco de Dados

```bash
cd backend
node visualizar.js
```

**Saída:**

```
═══════════════════════════════════════════════════════════
                    AGENDA DE CONTATOS
═══════════════════════════════════════════════════════════

📋 TABELA: Contato
┌────┬──────────────┬───────┐
│ ID │ NOME         │ IDADE │
├────┼──────────────┼───────┤
│ 1  │ João Silva   │ 30    │
│ 2  │ Maria Santos │ 25    │
└────┴──────────────┴───────┘

📞 TABELA: Telefone
┌────┬───────────┬─────────────────┐
│ ID │ IDCONTATO │ NUMERO          │
├────┼───────────┼─────────────────┤
│ 1  │ 1         │ (11) 98888-8888 │
│ 2  │ 1         │ (11) 97777-7777 │
│ 3  │ 2         │ (21) 96666-6666 │
└────┴───────────┴─────────────────┘

📊 ESTATÍSTICAS
Total de Contatos: 2
Total de Telefones: 3
```

### 💾 Exportar Banco de Dados

Para criar backups do banco de dados:

```bash
cd backend
npm run export
# ou
node exportar-banco.js
```

**Arquivos gerados:**

- `backup-banco.sql` - Backup em formato SQL
- `backup-banco.json` - Backup em formato JSON com metadados

**Saída:**

```
🗄️  EXPORTANDO BANCO DE DADOS...

✅ Backup criado com sucesso!
📁 Arquivo: backup-banco.sql
📊 3 contatos exportados
📞 5 telefones exportados

✅ Backup JSON criado com sucesso!
📁 Arquivo: backup-banco.json
📊 3 contatos exportados
```

**Estrutura do JSON:**
```json
{
  "metadata": {
    "exportDate": "2024-11-08T15:30:00.000Z",
    "totalContacts": 3,
    "totalPhones": 5
  },
  "contatos": [
    {
      "id": 1,
      "nome": "João Silva",
      "idade": 30,
      "telefones": ["(11) 98888-8888", "(11) 97777-7777"]
    }
  ]
}
```

---

## 📝 Sistema de Logs

### Localização

```
logs/exclusoes.txt
```

### Formato do Registro

```
===========================================
Data/Hora: 08/11/2025 02:30:25
Contato Excluído:
  ID: 3
  Nome: Diego do Carmo
  Idade: 28
  Telefones:
    - (11) 95555-5555
    - (11) 94444-4444
===========================================
```

### Informações Registradas

- ⏰ **Timestamp**: Data e hora exata da exclusão
- 🆔 **ID**: Identificador único do contato
- 👤 **Nome Completo**: Nome do contato excluído
- 🎂 **Idade**: Idade registrada (se informada)
- 📞 **Telefones**: Lista completa de todos os números

## **Nota**: Apenas exclusões geram logs. Criações e edições não são auditadas.

## 🏗️ Arquitetura

### 📁 Estrutura de Diretórios

```
agenda-contatos/
├── 📂 backend/                    # Servidor Node.js + Express
│   ├── server.js                  # Entry point - Inicialização do servidor
│   ├── database.js                # Configuração SQLite + Migrations
│   ├── routes.js                  # Definição de rotas RESTful
│   ├── logger.js                  # Sistema de auditoria de exclusões
│   ├── visualizar.js              # Script de visualização do banco
│   ├── exportar-banco.js          # Script de exportação (SQL + JSON)
│   ├── package.json               # Dependências e scripts (ES6 modules)
│   ├── contatos.db                # Banco SQLite (gerado automaticamente)
│   ├── backup-banco.sql           # Backup em SQL (gerado por exportar-banco.js)
│   ├── backup-banco.json          # Backup em JSON (gerado por exportar-banco.js)
│   └── node_modules/              # Pacotes npm instalados
│
├── 📂 frontend/                   # Aplicação React
│   ├── 📂 public/
│   │   ├── index.html             # Template HTML principal
│   │   ├── manifest.json          # PWA manifest
│   │   └── robots.txt             # SEO configuration
│   ├── 📂 src/
│   │   ├── App.js                 # Componente raiz da aplicação
│   │   ├── App.css                # Estilos globais
│   │   ├── index.js               # Entry point React
│   │   ├── index.css              # Reset CSS + variáveis globais
│   │   ├── 📂 components/
│   │   │   ├── 📂 ListaContatos/
│   │   │   │   ├── ListaContatos.jsx    # Listagem e pesquisa
│   │   │   │   └── ListaContatos.css    # Estilos dos cards
│   │   │   ├── 📂 ModalContato/
│   │   │   │   ├── ModalContato.jsx     # Formulário criar/editar
│   │   │   │   └── ModalContato.css     # Estilos do modal
│   │   │   └── 📂 Toast/
│   │   │       ├── Toast.jsx            # Notificações animadas
│   │   │       └── Toast.css            # Animações CSS
│   │   └── 📂 services/
│   │       └── api.js             # Cliente Axios configurado
│   ├── package.json               # Dependências React
│   └── node_modules/              # Pacotes npm instalados
│
├── 📂 logs/                       # Arquivos de auditoria
│   └── exclusoes.txt              # Registro de exclusões (auto-gerado)
│
├── 📂 .github/                    # GitHub Actions workflows
│   └── 📂 workflows/
│       ├── ci-backend.yml         # CI para backend (Node 18, 20)
│       ├── ci-frontend.yml        # CI para frontend (build + testes)
│       └── deploy.yml             # Deploy automático GitHub Pages
│
├── 📂 .vscode/                    # Configurações VS Code
│   └── settings.json              # Preferências do editor
│
├── .gitignore                     # Arquivos ignorados pelo Git
├── render.yaml                    # Configuração para deploy no Render
└── README.md                      # Este arquivo
```

### 🔄 Fluxo de Dados

```
┌─────────────┐       HTTP        ┌─────────────┐       SQL       ┌──────────┐
│   React     │ ─────────────────> │   Express   │ ──────────────> │  SQLite  │
│  (Frontend) │ <───────────────── │  (Backend)  │ <────────────── │   (DB)   │
└─────────────┘      JSON         └─────────────┘     Rows        └──────────┘
     │                                    │
     │                                    │
     v                                    v
┌─────────────┐                    ┌─────────────┐
│    Toast    │                    │   Logger    │
│ (Feedback)  │                    │   (Logs)    │
└─────────────┘                    └─────────────┘
```

### 🎨 Padrões Arquiteturais

- **Backend**: Arquitetura MVC simplificada (Routes → Database)
- **Frontend**: Component-based com separação de concerns
- **API**: RESTful com JSON para comunicação
- **Validação**: Dual-layer (Frontend UX + Backend Segurança)
- **Módulos**: ES6 imports/exports em todo o projeto

---

## 📚 Documentação da API

### Base URL

```
http://localhost:3001/api
```

### Endpoints Disponíveis

#### 📋 Listar Todos os Contatos

```http
GET /api/contatos
```

**Resposta (200 OK):**

```json
[
  {
    "ID": 1,
    "NOME": "João Silva",
    "IDADE": 30,
    "TELEFONES": ["(11) 98888-8888", "(11) 97777-7777"]
  }
]
```

#### 🔍 Pesquisar por Nome

```http
GET /api/contatos?nome=João
```

**Parâmetros:**

- `nome` (string): Busca parcial case-insensitive

#### 🔍 Pesquisar por Telefone

```http
GET /api/contatos?telefone=98888
```

**Parâmetros:**

- `telefone` (string): Busca parcial em todos os telefones

#### 🆔 Buscar Contato Específico

```http
GET /api/contatos/:id
```

**Resposta (200 OK):**

```json
{
  "ID": 1,
  "NOME": "João Silva",
  "IDADE": 30,
  "TELEFONES": ["(11) 98888-8888"]
}
```

#### ➕ Criar Novo Contato

```http
POST /api/contatos
Content-Type: application/json
```

**Body:**

```json
{
  "nome": "Maria Santos",
  "idade": 25,
  "telefones": ["(21) 96666-6666", "(21) 95555-5555"]
}
```

**Resposta (201 Created):**

```json
{
  "id": 2,
  "mensagem": "Contato criado com sucesso"
}
```

**Validações:**

- ✅ Nome obrigatório
- ✅ Pelo menos um telefone
- ✅ Telefone único (não pode duplicar)

**Erro (400 Bad Request):**

```json
{
  "erro": "O telefone (21) 96666-6666 já está cadastrado para outro contato"
}
```

#### ✏️ Atualizar Contato

```http
PUT /api/contatos/:id
Content-Type: application/json
```

**Body:**

```json
{
  "nome": "Maria Santos Silva",
  "idade": 26,
  "telefones": ["(21) 96666-6666"]
}
```

**Resposta (200 OK):**

```json
{
  "mensagem": "Contato atualizado com sucesso"
}
```

**Validações:**

- ✅ Telefone único (exclui telefones do próprio contato)
- ✅ Nome obrigatório
- ✅ Pelo menos um telefone

#### 🗑️ Excluir Contato

```http
DELETE /api/contatos/:id
```

**Resposta (200 OK):**

```json
{
  "mensagem": "Contato excluído com sucesso"
}
```

**Efeitos colaterais:**

- 📝 Registro gravado em `logs/exclusoes.txt`
- 🗑️ Telefones deletados automaticamente (CASCADE)

### 🔒 Códigos de Status HTTP

| Código  | Significado  | Quando Ocorre                            |
| ------- | ------------ | ---------------------------------------- |
| **200** | OK           | Operação bem-sucedida (GET, PUT, DELETE) |
| **201** | Created      | Contato criado com sucesso (POST)        |
| **400** | Bad Request  | Validação falhou (dados inválidos)       |
| **404** | Not Found    | Contato não encontrado                   |
| **500** | Server Error | Erro interno do servidor                 |

### 📝 Exemplos de Uso com cURL

```bash
# Listar todos
curl http://localhost:3001/api/contatos

# Criar contato
curl -X POST http://localhost:3001/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","idade":30,"telefones":["11988888888"]}'

# Atualizar
curl -X PUT http://localhost:3001/api/contatos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","idade":31,"telefones":["11988888888"]}'

# Excluir
curl -X DELETE http://localhost:3001/api/contatos/1
```

---

## � Deploy e CI/CD

### 📦 GitHub Actions

O projeto possui workflows automatizados para garantir qualidade e deploy contínuo:

#### CI Backend (`ci-backend.yml`)

- ✅ Testa em Node.js 18.x e 20.x
- ✅ Instala dependências com cache
- ✅ Verifica sintaxe dos arquivos
- ✅ Executa em push/PR nas branches main e develop

#### CI Frontend (`ci-frontend.yml`)

- ✅ Testa em Node.js 18.x e 20.x
- ✅ Build da aplicação React
- ✅ Executa testes (se configurados)
- ✅ Valida que o projeto compila sem erros

#### Deploy GitHub Pages (`deploy.yml`)

- 🚀 Deploy automático do frontend em GitHub Pages
- 📦 Build otimizado para produção
- 🌐 Disponível em: `https://devkassio.github.io/agenda-contatos`
- ⚙️ Habilitação automática do Pages via workflow

### 🌐 Deploy no Render

O backend pode ser facilmente deployado no Render usando o arquivo `render.yaml`:

```bash
# 1. Crie conta no Render.com
# 2. Conecte seu repositório GitHub
# 3. O Render detectará automaticamente o render.yaml
# 4. Click em "Apply" para criar o serviço
```

**Configurações do render.yaml:**

- 🟢 Runtime: Node.js
- 📍 Região: Oregon (US West)
- 💰 Plano: Free
- 🔄 Auto-deploy ativado
- 🏥 Health check configurado

### 📱 PWA (Progressive Web App)

A aplicação é instalável como PWA:

**Recursos PWA:**

- 📱 Instalável em desktop e mobile
- 🎨 Ícones personalizados (192x192, 512x512)
- 🌈 Theme color: `#667eea`
- 📲 Modo standalone (sem barra do navegador)
- 🔍 SEO otimizado com robots.txt

**Para instalar:**

1. Acesse a aplicação no navegador
2. Clique no ícone de instalação na barra de endereço
3. Confirme a instalação
4. App aparecerá como aplicativo nativo

---

## �🐛 Solução de Problemas

### ❌ Erro: "Cannot connect to backend"

**Sintomas:**

- Frontend não carrega dados
- Erro de CORS no console

**Soluções:**

```bash
# 1. Verifique se o backend está rodando
# Deve estar na porta 3001
curl http://localhost:3001/api/contatos

# 2. Verifique processos Node.js ativos
# Windows PowerShell:
Get-Process node

# 3. Reinicie o backend
cd backend
npm start
```

### ❌ Erro: "EADDRINUSE: Port already in use"

**Causa:** Porta 3001 (backend) ou 3000 (frontend) já está em uso

**Solução Windows:**

```powershell
# Encontrar processo na porta 3001
netstat -ano | findstr :3001

# Matar processo (substitua PID)
taskkill /PID <PID> /F

# Ou matar todos os processos Node
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### ❌ Erro: "Database locked"

**Causa:** Múltiplas instâncias acessando o banco

**Solução:**

```bash
# 1. Pare todos os servidores backend
# 2. Delete o arquivo de lock (se existir)
rm backend/contatos.db-journal

# 3. Reinicie apenas uma instância
cd backend
npm start
```

### ❌ Erro: "Module not found" ou "Cannot find module"

**Causa:** Dependências não instaladas corretamente

**Solução:**

```bash
# Limpe cache e reinstale
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Se persistir, use:
npm install --legacy-peer-deps
```

### ❌ Toast não aparece após ações

**Verificações:**

1. ✅ Console do navegador sem erros?
2. ✅ Requisição chegou ao backend? (status 200/201)
3. ✅ Componente Toast importado no App.js?
4. ✅ Estado `toast` sendo passado corretamente?

**Debug:**

```javascript
// Adicione no App.js antes do return
console.log('Toast atual:', toast);
```

### ❌ Telefone duplicado não está sendo validado

**Verificações:**

1. ✅ Backend atualizado com validação?
2. ✅ Mensagem de erro aparece no toast?
3. ✅ Console do navegador mostra erro 400?

**Teste manual:**

```bash
# Deve retornar erro 400
curl -X POST http://localhost:3001/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","telefones":["11988888888","11988888888"]}'
```

---

## 📊 Métricas do Projeto

### Linhas de Código (aproximado)

- **Backend**: ~350 linhas (JS + SQL)
- **Frontend**: ~550 linhas (JSX + CSS)
- **Total**: ~900 linhas

### Arquivos Principais

- **Componentes React**: 4 (App, ListaContatos, ModalContato, Toast)
- **Rotas API**: 6 endpoints RESTful
- **Tabelas DB**: 2 (Contato, Telefone)

### Performance

- **Tempo de resposta API**: < 10ms (SQLite síncrono)
- **Tamanho do build**: ~500KB (frontend minificado)
- **Tempo de build**: ~15s (Create React App)

---

## 🔐 Segurança e Privacidade

### Implementações de Segurança

✅ **Validação Backend**: Todos os dados são validados no servidor
✅ **CORS Configurado**: Apenas origens permitidas
✅ **Sanitização SQL**: Prepared statements previnem SQL Injection
✅ **Privacidade de Dados**: Erros não expõem nomes de outros usuários
✅ **Validação Frontend**: UX melhorado com feedback instantâneo

### Privacidade de Erro

**❌ Implementação Insegura:**

```
"Telefone já cadastrado para João Silva"
```

**✅ Implementação Atual:**

```
"O telefone (11) 98888-8888 já está cadastrado para outro contato"
```

---

## 📊 Informações do Projeto

### 📅 Desenvolvimento

- **Período**: 07-08/Nov/2024
- **Dedicação**: Full-time durante 2 dias
- **Status**: ✅ Projeto completo e testado

### ⏱️ Tempo de Desenvolvimento por Módulo

#### Backend (8-10h)

- Database modeling: 2h
- API REST implementation: 4h
- Validations & security: 2h
- Testing: 2h

#### Frontend (8-10h)

- React setup: 1h
- Components: 4h
- State management: 2h
- CSS styling: 2h
- Integration testing: 1h

#### Deploy & Infra (4-6h)

- GitHub Actions setup: 2h
- Render configuration: 2h
- Documentation: 2h

#### Debugging & Polish (2-4h)

- Bug fixes
- Performance optimization
- Final adjustments

**TOTAL: 22-30 horas** ✅

---

## ⚙️ Tecnologias Escolhidas e Justificativas

| Tecnologia         | Justificativa                                                       |
| ------------------ | ------------------------------------------------------------------- |
| **SQLite**         | Banco leve, sem necessidade de servidor, perfeito para demonstração |
| **better-sqlite3** | Performance superior (síncrono) vs async sqlite3                    |
| **React**          | Componentização, reatividade, ecossistema maduro                    |
| **Express**        | Minimalista, flexível, padrão da indústria                          |
| **ES6 Modules**    | Código moderno, tree-shaking, melhor organização                    |
| **Axios**          | Interceptors, melhor tratamento de erros que fetch()                |

### 🎓 Conceitos e Tecnologias

O projeto implementa:

- ✅ Arquitetura RESTful
- ✅ Relacionamento 1:N em banco de dados
- ✅ Validação dual-layer (frontend + backend)
- ✅ Sistema de auditoria com logs
- ✅ UX com feedback visual (Toast)
- ✅ Privacidade e proteção de dados sensíveis
- ✅ Modularização ES6
- ✅ Git workflow profissional
- ✅ CI/CD com GitHub Actions
- ✅ PWA com manifest e service worker

---

## 📞 Contato

### 📧 Para Dúvidas

- **Email**: kassioxis@icloud.com
- **LinkedIn**: https://www.linkedin.com/in/kassioxis/
- **GitHub**: [@devkassio](https://github.com/devkassio)

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-devkassio-181717?style=for-the-badge&logo=github)](https://github.com/devkassio)

</div>
