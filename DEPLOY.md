# 🚀 Deploy - Agenda de Contatos

## Status de Deploy

### ✅ Backend (Render)

- **URL**: https://agenda-contatos-backend.onrender.com
- **Status**: ✅ Live
- **Plano**: Free (spin down após 15min de inatividade)
- **Banco**: SQLite (dados não persistem entre deploys)

### ✅ Frontend (GitHub Pages)

- **URL**: https://devkassio.github.io/agenda-contatos
- **Deploy**: Automático via GitHub Actions
- **Branch**: main

---

## 🔧 URLs Configuradas

| Ambiente            | Frontend                                    | Backend                                      |
| ------------------- | ------------------------------------------- | -------------------------------------------- |
| **Produção**        | https://devkassio.github.io/agenda-contatos | https://agenda-contatos-backend.onrender.com |
| **Desenvolvimento** | http://localhost:3000                       | http://localhost:3001                        |

---

## 📝 Configurações Importantes

### CORS (Backend)

```javascript
// Origens permitidas em produção:
- https://devkassio.github.io
- https://agenda-contatos-backend.onrender.com
```

### Variáveis de Ambiente (Frontend)

**Desenvolvimento** (`.env.development`):

```env
REACT_APP_API_URL=http://localhost:3001/api
```

**Produção** (`.env.production`):

```env
REACT_APP_API_URL=https://agenda-contatos-backend.onrender.com/api
```

---

## ⚠️ Limitações do Plano Free

### Render (Backend)

- ❌ **Cold Start**: Primeira requisição pode demorar 50+ segundos
- ❌ **Spin Down**: Serviço dorme após 15 minutos sem uso
- ❌ **Dados Temporários**: SQLite não persiste entre deploys
- ✅ **Uptime**: 750 horas/mês gratuitas

### GitHub Pages (Frontend)

- ✅ **Sem limitações práticas**
- ✅ **CDN Global**: Rápido em qualquer região
- ✅ **HTTPS**: Certificado automático

---

## 🧪 Testar Deploy

### Backend

```bash
# Health check
curl https://agenda-contatos-backend.onrender.com/

# Listar contatos
curl https://agenda-contatos-backend.onrender.com/api/contatos

# Criar contato
curl -X POST https://agenda-contatos-backend.onrender.com/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","idade":25,"telefones":["11999999999"]}'
```

### Frontend

1. Acesse: https://devkassio.github.io/agenda-contatos
2. Aguarde o backend acordar (primeira vez ~50s)
3. Teste criar/editar/excluir contatos

---

## 🔄 Atualizar Deploy

### Frontend

```bash
git push origin main
# GitHub Actions faz deploy automaticamente
```

### Backend

```bash
git push origin main
# Render detecta mudanças e faz redeploy automático
```

---

## 🐛 Troubleshooting

### Frontend não carrega dados

1. Abra o DevTools (F12) → Console
2. Verifique se há erro de CORS
3. Teste o backend diretamente: `curl https://agenda-contatos-backend.onrender.com/api/contatos`
4. Aguarde 50s na primeira requisição (cold start)

### Backend não responde

- **Primeira requisição**: Normal demorar 50s (cold start)
- **Após 15 min**: Serviço dormiu, aguarde acordar
- **Erro 404**: Verifique se a rota está correta (`/api/contatos`)

### Dados sumindo

- **Esperado**: SQLite no Render é efêmero
- **Solução**: Para persistência, migre para PostgreSQL

---

## 📊 Monitoramento

### Render Dashboard

- **Logs**: https://dashboard.render.com/
- **Métricas**: CPU, RAM, Requests
- **Eventos**: Deploy history

### GitHub Actions

- **Workflows**: https://github.com/devkassio/agenda-contatos/actions
- **Status**: ✅ ou ❌ em cada deploy

---
