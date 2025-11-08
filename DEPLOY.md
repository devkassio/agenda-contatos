# 🚀 Guia de Deploy - Agenda de Contatos

## 📦 Deploy do Backend no Render

### Opção 1: Deploy com SQLite (Demonstração)

⚠️ **Atenção**: SQLite no Render **não persiste dados** entre deploys. Use apenas para demonstração.

**Passos:**

1. Crie uma conta em [Render.com](https://render.com)
2. Clique em **"New +"** → **"Blueprint"**
3. Conecte seu repositório GitHub
4. O Render detectará automaticamente o `render.yaml`
5. Clique em **"Apply"**
6. Aguarde o deploy (~3-5 minutos)

**URL do backend**: `https://agenda-contatos-backend.onrender.com`

### Opção 2: Deploy com PostgreSQL (Produção - Recomendado)

✅ **Vantagens**: Dados persistentes, backup automático, melhor performance

**Passos:**

1. No `render.yaml`, descomente a seção `databases`
2. No Render Dashboard:
   - Crie um **PostgreSQL Database** (Free tier)
   - Copie a `DATABASE_URL`
3. No Web Service, adicione a variável de ambiente:
   - `DATABASE_TYPE=postgres`
   - `DATABASE_URL=<sua-url-do-postgres>`
4. Atualize o código do backend para suportar PostgreSQL

**Código necessário** (não implementado ainda):
```javascript
// Instalar: npm install pg
// Atualizar database.js para usar PostgreSQL quando DATABASE_TYPE=postgres
```

---

## 🌐 Deploy do Frontend no GitHub Pages

**Configurado automaticamente via GitHub Actions!**

### Ativar GitHub Pages:

1. Vá em **Settings** → **Pages**
2. Em **Build and deployment**:
   - **Source**: GitHub Actions
3. Faça push para `main`:
   ```bash
   git push origin main
   ```
4. Aguarde o workflow concluir (~2 minutos)
5. Acesse: `https://devkassio.github.io/agenda-contatos`

### Configurar API do Backend:

Atualize `frontend/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});
```

Adicione no GitHub:
- **Settings** → **Secrets and variables** → **Actions**
- **New repository variable**:
  - Nome: `REACT_APP_API_URL`
  - Valor: `https://agenda-contatos-backend.onrender.com/api`

---

## 🔧 Variáveis de Ambiente

### Backend (Render)

| Variável        | Valor                          | Descrição                       |
| --------------- | ------------------------------ | ------------------------------- |
| `NODE_ENV`      | `production`                   | Ambiente de produção            |
| `PORT`          | `10000`                        | Porta do Render (obrigatória)   |
| `DATABASE_TYPE` | `sqlite` ou `postgres`         | Tipo de banco de dados          |
| `DATABASE_URL`  | `postgresql://...` (se pg)     | URL do PostgreSQL (se usar)     |

### Frontend (GitHub Pages)

| Variável              | Valor                                           | Descrição          |
| --------------------- | ----------------------------------------------- | ------------------ |
| `REACT_APP_API_URL`   | `https://agenda-contatos-backend.onrender.com/api` | URL da API backend |

---

## 🧪 Testando o Deploy

### Backend

```bash
# Health check
curl https://agenda-contatos-backend.onrender.com/

# Listar contatos
curl https://agenda-contatos-backend.onrender.com/api/contatos

# Criar contato de teste
curl -X POST https://agenda-contatos-backend.onrender.com/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Deploy","idade":25,"telefones":["11999999999"]}'
```

### Frontend

1. Acesse: `https://devkassio.github.io/agenda-contatos`
2. Verifique se o frontend carrega
3. Teste criar/editar/excluir contatos

---

## ⚠️ Limitações do Plano Free

### Render (Backend)
- ❌ Serviço dorme após 15 minutos de inatividade
- ❌ Primeiro acesso pode demorar ~30 segundos (cold start)
- ❌ SQLite não persiste dados entre deploys
- ✅ 750 horas/mês gratuitas
- ✅ PostgreSQL Free: 1GB storage, 97 horas/mês

### GitHub Pages (Frontend)
- ✅ Sem limitações práticas
- ✅ Uptime 99.9%
- ✅ CDN global (rápido em qualquer lugar)
- ✅ HTTPS automático

---

## 🔄 Atualizações Automáticas

### Backend
- ✅ Auto-deploy habilitado
- ✅ Cada push na `main` faz redeploy
- ✅ Logs disponíveis no dashboard do Render

### Frontend
- ✅ GitHub Actions configurado
- ✅ Build e deploy automático
- ✅ Logs na aba **Actions** do GitHub

---

## 🐛 Troubleshooting

### Backend não responde
```bash
# Verificar logs no Render Dashboard
# Ou via CLI:
render logs -s agenda-contatos-backend --tail
```

### Frontend não carrega dados
1. Verifique o console do navegador
2. Confirme a `REACT_APP_API_URL` está correta
3. Teste a API diretamente com curl
4. Verifique CORS no backend

### Dados sumindo (SQLite)
- **Esperado**: SQLite no Render é efêmero
- **Solução**: Migre para PostgreSQL

---

## 📞 Suporte

Para problemas com deploy:
- 📖 [Render Docs](https://render.com/docs)
- 📖 [GitHub Pages Docs](https://docs.github.com/pt/pages)
- 📖 [GitHub Actions Docs](https://docs.github.com/pt/actions)
