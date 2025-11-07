import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* caminho do arquivo de log */
const logPath = path.join(__dirname, '..', 'logs', 'exclusoes.txt');

/* Garantir que a pasta de log exista */
function garantirPastaLogs() {
  const logsDir = path.join(__dirname, '..', 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

/* Registar a exclusão no log */
function registrarExclusao(contato) {
  garantirPastaLogs();

  const dataHora = new Date().toLocaleString('pt-BR');
  const telefones = contato.telefones ? contato.telefones.join(', ') : 'Nenhum';

  const logMessage = `
==========================================
DATA/HORA: ${dataHora}
CONTATO EXCLUÍDO:
  - ID: ${contato.id}
  - Nome: ${contato.nome}
  - Idade: ${contato.idade || 'Não informada'}
  - Telefones: ${telefones}
==========================================

`;
  fs.appendFileSync(logPath, logMessage, 'utf-8');
  console.log(`📝 Log de exclusão registrado: ${contato.nome}`);
}

export { registrarExclusao };
