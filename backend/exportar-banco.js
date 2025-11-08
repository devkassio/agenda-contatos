import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conecta ao banco de dados
const db = new Database(path.join(__dirname, 'contatos.db'));

// Função para exportar o banco para SQL
function exportarParaSQL() {
  const outputPath = path.join(__dirname, 'backup-banco.sql');
  let sqlDump = '';

  // Adiciona header
  sqlDump += '-- Backup do Banco de Dados - Agenda de Contatos\n';
  sqlDump += `-- Data: ${new Date().toLocaleString('pt-BR')}\n\n`;

  // Exporta estrutura das tabelas
  sqlDump += '-- Estrutura da tabela Contato\n';
  sqlDump += `CREATE TABLE IF NOT EXISTS Contato (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100) NOT NULL,
    IDADE INTEGER
);\n\n`;

  sqlDump += '-- Estrutura da tabela Telefone\n';
  sqlDump += `CREATE TABLE IF NOT EXISTS Telefone (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    IDCONTATO INTEGER NOT NULL,
    NUMERO VARCHAR(16) NOT NULL,
    FOREIGN KEY (IDCONTATO) REFERENCES Contato(ID) ON DELETE CASCADE
);\n\n`;

  // Exporta dados da tabela Contato
  const contatos = db.prepare('SELECT * FROM Contato').all();
  if (contatos.length > 0) {
    sqlDump += '-- Dados da tabela Contato\n';
    contatos.forEach(c => {
      const idade = c.IDADE !== null ? c.IDADE : 'NULL';
      sqlDump += `INSERT INTO Contato (ID, NOME, IDADE) VALUES (${c.ID}, '${c.NOME.replace(/'/g, "''")}', ${idade});\n`;
    });
    sqlDump += '\n';
  }

  // Exporta dados da tabela Telefone
  const telefones = db.prepare('SELECT * FROM Telefone').all();
  if (telefones.length > 0) {
    sqlDump += '-- Dados da tabela Telefone\n';
    telefones.forEach(t => {
      sqlDump += `INSERT INTO Telefone (ID, IDCONTATO, NUMERO) VALUES (${t.ID}, ${t.IDCONTATO}, '${t.NUMERO}');\n`;
    });
    sqlDump += '\n';
  }

  // Salva o arquivo
  fs.writeFileSync(outputPath, sqlDump, 'utf8');
  console.log(`\n✅ Backup criado com sucesso!`);
  console.log(`📁 Arquivo: ${outputPath}`);
  console.log(`📊 ${contatos.length} contatos exportados`);
  console.log(`📞 ${telefones.length} telefones exportados\n`);
}

// Função para exportar para JSON
function exportarParaJSON() {
  const outputPath = path.join(__dirname, 'backup-banco.json');

  const contatos = db
    .prepare(
      `
    SELECT c.ID, c.NOME, c.IDADE,
           GROUP_CONCAT(t.NUMERO) as telefones
    FROM Contato c
    LEFT JOIN Telefone t ON c.ID = t.IDCONTATO
    GROUP BY c.ID, c.NOME, c.IDADE
  `
    )
    .all();

  const dadosFormatados = {
    metadata: {
      exportDate: new Date().toISOString(),
      totalContacts: contatos.length,
      totalPhones: db.prepare('SELECT COUNT(*) as count FROM Telefone').get()
        .count,
    },
    contatos: contatos.map(c => ({
      id: c.ID,
      nome: c.NOME,
      idade: c.IDADE,
      telefones: c.telefones ? c.telefones.split(',') : [],
    })),
  };

  fs.writeFileSync(outputPath, JSON.stringify(dadosFormatados, null, 2), 'utf8');
  console.log(`\n✅ Backup JSON criado com sucesso!`);
  console.log(`📁 Arquivo: ${outputPath}`);
  console.log(`📊 ${dadosFormatados.metadata.totalContacts} contatos exportados\n`);
}

// Executa as exportações
console.log('\n🗄️  EXPORTANDO BANCO DE DADOS...\n');

exportarParaSQL();
exportarParaJSON();

db.close();
