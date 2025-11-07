import express from 'express';
import db from './database.js';
import { registrarExclusao } from './logger.js';

const router = express.Router();

// GET - buscar todos os contatos ou pesquisar
router.get('/contatos', (req, res) => {
  try {
    const { nome, telefone } = req.query;
    let query = `
            SELECT c.ID, c.NOME, c.IDADE,
                   GROUP_CONCAT(t.NUMERO) as telefones
            FROM Contato c
            LEFT JOIN Telefone t ON c.ID = t.IDCONTATO
        `;

    const params = [];
    const conditions = [];

    // filtra por nome se fornecido
    if (nome) {
      conditions.push('c.NOME LIKE ?');
      params.push(`%${nome}%`);
    }

    // filtra por telefone se fornecido
    if (telefone) {
      conditions.push('t.NUMERO LIKE ?');
      params.push(`%${telefone}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY c.ID, c.NOME, c.IDADE ORDER BY c.NOME';

    const contatos = db.prepare(query).all(...params);

    // formata os telefones como array
    const contatosFormatados = contatos.map(c => ({
      id: c.ID,
      nome: c.NOME,
      idade: c.IDADE,
      telefones: c.telefones ? c.telefones.split(',') : [],
    }));

    res.json(contatosFormatados);
  } catch (erro) {
    console.error('Erro ao buscar contatos:', erro);
    res.status(500).json({ erro: 'Erro ao buscar contatos' });
  }
});

// GET - buscar um contato especifico
router.get('/contatos/:id', (req, res) => {
  try {
    const { id } = req.params;

    const contato = db.prepare('SELECT * FROM Contato WHERE ID = ?').get(id);

    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    const telefones = db
      .prepare('SELECT * FROM Telefone WHERE IDCONTATO = ?')
      .all(id);

    res.json({
      id: contato.ID,
      nome: contato.NOME,
      idade: contato.IDADE,
      telefones: telefones.map(t => ({ id: t.ID, numero: t.NUMERO })),
    });
  } catch (erro) {
    console.error('Erro ao buscar contato:', erro);
    res.status(500).json({ erro: 'Erro ao buscar contato' });
  }
});

// POST - criar novo contato
router.post('/contatos', (req, res) => {
  try {
    const { nome, idade, telefones } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    // verifica se algum telefone já existe no banco
    if (telefones && Array.isArray(telefones)) {
      const verificarTelefone = db.prepare(
        'SELECT NUMERO FROM Telefone WHERE NUMERO = ?'
      );

      for (const tel of telefones) {
        if (tel.numero && tel.numero.trim()) {
          const telefoneExistente = verificarTelefone.get(tel.numero.trim());
          if (telefoneExistente) {
            return res.status(400).json({
              erro: `O telefone ${tel.numero.trim()} já está cadastrado para outro contato`,
            });
          }
        }
      }
    }

    // inicia transacao
    const inserirContato = db.prepare(
      'INSERT INTO Contato (NOME, IDADE) VALUES (?, ?)'
    );
    const inserirTelefone = db.prepare(
      'INSERT INTO Telefone (IDCONTATO, NUMERO) VALUES (?, ?)'
    );

    const transaction = db.transaction(() => {
      const resultado = inserirContato.run(nome, idade || null);
      const contatoId = resultado.lastInsertRowid;

      // insere os telefones se houver
      if (telefones && Array.isArray(telefones)) {
        telefones.forEach(tel => {
          if (tel.numero && tel.numero.trim()) {
            inserirTelefone.run(contatoId, tel.numero.trim());
          }
        });
      }

      return contatoId;
    });

    const novoId = transaction();

    res.status(201).json({
      id: novoId,
      mensagem: 'Contato criado com sucesso!',
    });
  } catch (erro) {
    console.error('Erro ao criar contato:', erro);
    res.status(500).json({ erro: 'Erro ao criar contato' });
  }
});

// PUT - atualizar contato
router.put('/contatos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, telefones } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    // verifica se o contato existe
    const contatoExiste = db
      .prepare('SELECT ID FROM Contato WHERE ID = ?')
      .get(id);
    if (!contatoExiste) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    // verifica se algum telefone já existe em outro contato
    if (telefones && Array.isArray(telefones)) {
      const verificarTelefone = db.prepare(
        'SELECT NUMERO FROM Telefone WHERE NUMERO = ? AND IDCONTATO != ?'
      );

      for (const tel of telefones) {
        if (tel.numero && tel.numero.trim()) {
          const telefoneExistente = verificarTelefone.get(
            tel.numero.trim(),
            id
          );
          if (telefoneExistente) {
            return res.status(400).json({
              erro: `O telefone ${tel.numero.trim()} já está cadastrado para outro contato`,
            });
          }
        }
      }
    }

    const atualizarContato = db.prepare(
      'UPDATE Contato SET NOME = ?, IDADE = ? WHERE ID = ?'
    );
    const deletarTelefones = db.prepare(
      'DELETE FROM Telefone WHERE IDCONTATO = ?'
    );
    const inserirTelefone = db.prepare(
      'INSERT INTO Telefone (IDCONTATO, NUMERO) VALUES (?, ?)'
    );

    const transaction = db.transaction(() => {
      atualizarContato.run(nome, idade || null, id);

      // remove telefones antigos
      deletarTelefones.run(id);

      // insere novos telefones
      if (telefones && Array.isArray(telefones)) {
        telefones.forEach(tel => {
          if (tel.numero && tel.numero.trim()) {
            inserirTelefone.run(id, tel.numero.trim());
          }
        });
      }
    });

    transaction();

    res.json({ mensagem: 'Contato atualizado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao atualizar contato:', erro);
    res.status(500).json({ erro: 'Erro ao atualizar contato' });
  }
});

// DELETE - excluir contato
router.delete('/contatos/:id', (req, res) => {
  try {
    const { id } = req.params;

    // busca o contato antes de excluir pra registrar no log
    const contato = db.prepare('SELECT * FROM Contato WHERE ID = ?').get(id);

    if (!contato) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    // busca os telefones também
    const telefones = db
      .prepare('SELECT NUMERO FROM Telefone WHERE IDCONTATO = ?')
      .all(id);

    // exclui o contato (telefones sao excluidos automaticamente por cascade)
    db.prepare('DELETE FROM Contato WHERE ID = ?').run(id);

    // registra no log
    registrarExclusao({
      id: contato.ID,
      nome: contato.NOME,
      idade: contato.IDADE,
      telefones: telefones.map(t => t.NUMERO),
    });

    res.json({ mensagem: 'Contato excluído com sucesso!' });
  } catch (erro) {
    console.error('Erro ao excluir contato:', erro);
    res.status(500).json({ erro: 'Erro ao excluir contato' });
  }
});

export default router;
