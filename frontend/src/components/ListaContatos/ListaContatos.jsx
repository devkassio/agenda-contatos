import './ListaContatos.css';

function ListaContatos({ contatos, aoEditar, aoExcluir }) {
  const confirmarExclusao = contato => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o contato "${contato.nome}"?`
      )
    ) {
      aoExcluir(contato.id);
    }
  };

  if (contatos.length === 0) {
    return (
      <div className="lista-vazia">
        <p>📭 Nenhum contato encontrado</p>
        <small>Adicione um novo contato ou ajuste os filtros de pesquisa</small>
      </div>
    );
  }

  return (
    <div className="lista-contatos">
      {contatos.map(contato => (
        <div key={contato.id} className="card-contato">
          <div className="contato-info">
            <h3>{contato.nome}</h3>
            {contato.idade && (
              <p className="idade">
                <span className="label">Idade:</span> {contato.idade} anos
              </p>
            )}
            {contato.telefones && contato.telefones.length > 0 && (
              <div className="telefones">
                <span className="label">Telefones:</span>
                <ul>
                  {contato.telefones.map((tel, index) => (
                    <li key={index}>📞 {tel}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="contato-acoes">
            <button
              className="btn-editar"
              onClick={() => aoEditar(contato)}
              title="Editar contato"
            >
              ✏️ Editar
            </button>
            <button
              className="btn-excluir"
              onClick={() => confirmarExclusao(contato)}
              title="Excluir contato"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaContatos;
