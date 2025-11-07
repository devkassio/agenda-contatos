import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria a conexão com o banco
export const db = new Database(path.join(__dirname, 'database.db'));

// Ativa chaves estrangeiras
db.pragma('foreign_keys = ON');

function inicializarBanco() {
  /* Cria a tabela de contatos */
  db.exec(`
    CREATE TABLE IF NOT EXISTS Contato (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            NOME VARCHAR(100) NOT NULL,
            IDADE INTEGER
    );
  `);

  /* Cria a tabela de telefones */
  db.exec(`
        CREATE TABLE IF NOT EXISTS Telefone (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            IDCONTATO INTEGER NOT NULL,
            NUMERO VARCHAR(16) NOT NULL,
            FOREIGN KEY (IDCONTATO) REFERENCES Contato(ID) ON DELETE CASCADE
        )
    `);

  console.log('✅ Banco de dados inicializado com sucesso!');
}

inicializarBanco();

export default db;
