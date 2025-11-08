import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './routes.js';

const app = express();
// Usa a porta do ambiente (Render) ou 3001 (local)
const PORT = process.env.PORT || 3001;

/*  Middleware */
// Configuração CORS para aceitar requisições do frontend
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? [
          'https://devkassio.github.io',
          'https://agenda-contatos-backend.onrender.com',
        ]
      : '*', // Em desenvolvimento aceita qualquer origem
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* rotas da API */
app.use('/api', routes);

/* rota raiz pra testar se o servidor está online */
app.get('/', (_req, res) => {
  res.json({
    mensagem: 'API Agenda de Contatos rodando!',
    versao: '1.0.0',
    ambiente: process.env.NODE_ENV || 'development',
    endpoints: {
      listar: 'GET /api/contatos',
      buscar: 'GET /api/contatos/:id',
      pesquisar: 'GET /api/contatos?nome=xxx&telefone=xxx',
      criar: 'POST /api/contatos',
      atualizar: 'PUT /api/contatos/:id',
      excluir: 'DELETE /api/contatos/:id',
    },
  });
});

/* tratamento de erro 404 */
app.use((_req, res) => {
  res.status(404).json({ erro: 'Rota nao encontrada' });
});

/* inicia o servidor */
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`📝 Documentação em: http://localhost:${PORT}/`);
});
