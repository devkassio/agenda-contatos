/**
 * Script para visualizar dados do banco SQLite no terminal
 * Execute: node visualizar.js
 * (Execute este comando de dentro da pasta backend)
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'contatos.db');

try {
  const db = new Database(dbPath, { readonly: true });

  console.log(
    '\n╔═══════════════════════════════════════════════════════════════╗'
  );
  console.log(
    '║         📊 VISUALIZADOR DE BANCO - AGENDA DE CONTATOS        ║'
  );
  console.log(
    '╚═══════════════════════════════════════════════════════════════╝\n'
  );

  // Verifica se banco existe
  const tables = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all();

  if (tables.length === 0) {
    console.log('⚠️  Banco vazio ou não inicializado\n');
    db.close();
    process.exit(0);
  }

  // ==================== TABELA CONTATOS ====================
  console.log(
    '┌─────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│                     📇 TABELA: CONTATOS                     │'
  );
  console.log(
    '└─────────────────────────────────────────────────────────────┘\n'
  );

  const contatos = db.prepare('SELECT * FROM Contato ORDER BY ID').all();

  if (contatos.length === 0) {
    console.log('   ⚠️  Nenhum contato cadastrado\n');
  } else {
    console.log('┌──────┬────────────────────────────────┬────────┐');
    console.log('│  ID  │             NOME               │ IDADE  │');
    console.log('├──────┼────────────────────────────────┼────────┤');

    contatos.forEach(contato => {
      const id = String(contato.ID).padEnd(4);
      const nome = String(contato.NOME).padEnd(30);
      const idade = contato.IDADE ? String(contato.IDADE).padEnd(6) : '---   ';
      console.log(`│ ${id} │ ${nome} │ ${idade} │`);
    });

    console.log('└──────┴────────────────────────────────┴────────┘');
    console.log(`   Total: ${contatos.length} contato(s)\n`);
  }

  // ==================== TABELA TELEFONES ====================
  console.log(
    '┌─────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│                    📞 TABELA: TELEFONES                     │'
  );
  console.log(
    '└─────────────────────────────────────────────────────────────┘\n'
  );

  const telefones = db
    .prepare(
      `
    SELECT
      t.ID,
      t.IDCONTATO,
      c.NOME,
      t.NUMERO
    FROM Telefone t
    INNER JOIN Contato c ON t.IDCONTATO = c.ID
    ORDER BY c.NOME, t.ID
  `
    )
    .all();

  if (telefones.length === 0) {
    console.log('   ⚠️  Nenhum telefone cadastrado\n');
  } else {
    console.log(
      '┌──────┬──────────┬────────────────────────────────┬──────────────────┐'
    );
    console.log(
      '│  ID  │ ID_CONT. │            CONTATO             │     TELEFONE     │'
    );
    console.log(
      '├──────┼──────────┼────────────────────────────────┼──────────────────┤'
    );

    telefones.forEach(tel => {
      const id = String(tel.ID).padEnd(4);
      const idContato = String(tel.IDCONTATO).padEnd(8);
      const nome = String(tel.NOME).padEnd(30);
      const numero = String(tel.NUMERO).padEnd(16);
      console.log(`│ ${id} │ ${idContato} │ ${nome} │ ${numero} │`);
    });

    console.log(
      '└──────┴──────────┴────────────────────────────────┴──────────────────┘'
    );
    console.log(`   Total: ${telefones.length} telefone(s)\n`);
  }

  // ==================== VISÃO COMPLETA ====================
  console.log(
    '┌─────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│              👥 VISÃO COMPLETA: CONTATOS COM TELEFONES       │'
  );
  console.log(
    '└─────────────────────────────────────────────────────────────┘\n'
  );

  if (contatos.length === 0) {
    console.log('   ⚠️  Nenhum contato para exibir\n');
  } else {
    contatos.forEach(contato => {
      const telefonesDoContato = db
        .prepare(
          `
        SELECT NUMERO FROM Telefone WHERE IDCONTATO = ?
      `
        )
        .all(contato.ID);

      console.log(
        `📇 ${contato.NOME} (${contato.IDADE || 'idade não informada'})`
      );

      if (telefonesDoContato.length === 0) {
        console.log('   └─ 📵 Sem telefones cadastrados');
      } else {
        telefonesDoContato.forEach((tel, index) => {
          const isLast = index === telefonesDoContato.length - 1;
          const prefix = isLast ? '   └─' : '   ├─';
          console.log(`${prefix} 📞 ${tel.NUMERO}`);
        });
      }
      console.log('');
    });
  }

  // ==================== ESTATÍSTICAS ====================
  console.log(
    '┌─────────────────────────────────────────────────────────────┐'
  );
  console.log(
    '│                      📊 ESTATÍSTICAS                        │'
  );
  console.log(
    '└─────────────────────────────────────────────────────────────┘\n'
  );

  const stats = {
    totalContatos: contatos.length,
    totalTelefones: telefones.length,
    contatosSemTelefone: db
      .prepare(
        `
      SELECT COUNT(*) as total FROM Contato
      WHERE ID NOT IN (SELECT DISTINCT IDCONTATO FROM Telefone)
    `
      )
      .get().total,
    mediaTelefonesPorContato:
      contatos.length > 0 ? (telefones.length / contatos.length).toFixed(2) : 0,
  };

  console.log(`   📇 Total de Contatos: ${stats.totalContatos}`);
  console.log(`   📞 Total de Telefones: ${stats.totalTelefones}`);
  console.log(`   📵 Contatos sem telefone: ${stats.contatosSemTelefone}`);
  console.log(
    `   📊 Média de telefones por contato: ${stats.mediaTelefonesPorContato}`
  );
  console.log('');

  db.close();

  console.log('✅ Visualização concluída com sucesso!\n');
} catch (erro) {
  console.error('\n❌ Erro ao visualizar banco de dados:', erro.message);
  console.error('\n💡 Dicas:');
  console.error(
    '   - Certifique-se que o backend foi iniciado ao menos uma vez'
  );
  console.error('   - Verifique se o arquivo contatos.db existe nesta pasta');
  console.error('   - Execute: npm start (para criar o banco)\n');
  process.exit(1);
}
