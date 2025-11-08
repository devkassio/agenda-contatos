import { useEffect, useState } from 'react';
import './ModalContato.css';

function ModalContato({ contato, aoFechar, aoSalvar }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [telefones, setTelefones] = useState([{ numero: '' }]);

  // preenche os campos se estiver editando
  useEffect(() => {
    if (contato) {
      setNome(contato.nome || '');
      setIdade(contato.idade || '');
      setTelefones(
        contato.telefones?.length > 0
          ? contato.telefones.map(t => ({ numero: t.numero || t }))
          : [{ numero: '' }]
      );
    }
  }, [contato]);

  const adicionarTelefone = () => {
    setTelefones([...telefones, { numero: '' }]);
  };

  const removerTelefone = index => {
    const novosTelefones = telefones.filter((_, i) => i !== index);
    setTelefones(novosTelefones.length > 0 ? novosTelefones : [{ numero: '' }]);
  };

  const atualizarTelefone = (index, valor) => {
    const novosTelefones = [...telefones];
    novosTelefones[index].numero = valor;
    setTelefones(novosTelefones);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!nome.trim()) {
      alert('Por favor, preencha o nome do contato!');
      return;
    }

    // filtra telefones vazios
    const telefonesValidos = telefones.filter(t => t.numero.trim() !== '');

    const dadosContato = {
      nome: nome.trim(),
      idade: idade ? parseInt(idade) : null,
      telefones: telefonesValidos,
    };

    aoSalvar(dadosContato);
  };

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{contato ? 'Editar Contato' : 'Novo Contato'}</h2>
          <button className="btn-fechar" onClick={aoFechar}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label>Idade</label>
            <input
              type="number"
              value={idade}
              onChange={e => setIdade(e.target.value)}
              placeholder="Digite a idade"
              min="0"
              max="150"
            />
          </div>

          <div className="form-group">
            <label>Telefones</label>
            {telefones.map((tel, index) => (
              <div key={index} className="telefone-input">
                <input
                  type="text"
                  value={tel.numero}
                  onChange={e => atualizarTelefone(index, e.target.value)}
                  placeholder="(00) 00000-0000"
                />
                {telefones.length > 1 && (
                  <button
                    type="button"
                    className="btn-remover"
                    onClick={() => removerTelefone(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn-adicionar"
              onClick={adicionarTelefone}
            >
              + Adicionar telefone
            </button>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancelar" onClick={aoFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              {contato ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalContato;
