import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ListaContatos from './components/ListaContatos/ListaContatos';
import ModalContato from './components/ModalContatos/ModalContato';
import Toast from './components/Toast/Toast';
import { contatosAPI } from './services/api';

function App() {
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [contatoEditando, setContatoEditando] = useState(null);
  const [filtros, setFiltros] = useState({ nome: '', telefone: '' });
  const [toast, setToast] = useState(null);

  // função para mostrar toast
  const mostrarToast = (mensagem, tipo = 'info') => {
    setToast({ mensagem, tipo });
  };

  // função para fechar toast
  const fecharToast = () => {
    setToast(null);
  };

  const carregarContatos = useCallback(async (filtrosPersonalizados = {}) => {
    setLoading(true);
    try {
      const dados = await contatosAPI.listar(filtrosPersonalizados);
      setContatos(dados);
    } catch (erro) {
      mostrarToast(
        'Erro ao carregar contatos. Verifique se o servidor está rodando!',
        'erro'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // carrega os contatos quando o componente monta
  useEffect(() => {
    carregarContatos();
  }, [carregarContatos]);

  const abrirModalNovo = () => {
    setContatoEditando(null);
    setModalAberto(true);
  };

  const abrirModalEditar = contato => {
    setContatoEditando(contato);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setContatoEditando(null);
  };

  const salvarContato = async dados => {
    try {
      if (contatoEditando) {
        // atualiza contato existente
        await contatosAPI.atualizar(contatoEditando.id, dados);
        mostrarToast('Contato atualizado com sucesso!', 'sucesso');
      } else {
        // cria novo contato
        await contatosAPI.criar(dados);
        mostrarToast('Contato criado com sucesso!', 'sucesso');
      }
      fecharModal();
      carregarContatos(filtros);
    } catch (erro) {
      // Verifica se há uma mensagem de erro específica do servidor
      const mensagemErro =
        erro.response?.data?.erro || 'Erro ao salvar contato!';
      mostrarToast(mensagemErro, 'erro');
    }
  };

  const excluirContato = async id => {
    try {
      await contatosAPI.excluir(id);
      mostrarToast('Contato excluído com sucesso!', 'sucesso');
      carregarContatos(filtros);
    } catch (erro) {
      mostrarToast('Erro ao excluir contato!', 'erro');
    }
  };

  const pesquisar = () => {
    // remove espaços em branco e pesquisa
    const filtrosTratados = {
      nome: filtros.nome.trim(),
      telefone: filtros.telefone.trim(),
    };
    carregarContatos(filtrosTratados);
  };

  const limparFiltros = () => {
    setFiltros({ nome: '', telefone: '' });
    carregarContatos();
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📇 Agenda de Contatos</h1>
        <p>Gerencie seus contatos de forma fácil e rápida</p>
      </header>

      <div className="container">
        {/* Seção de pesquisa e ações */}
        <div className="barra-acoes">
          <div className="filtros">
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={filtros.nome}
              onChange={e => setFiltros({ ...filtros, nome: e.target.value })}
              onKeyPress={e => e.key === 'Enter' && pesquisar()}
            />
            <input
              type="text"
              placeholder="Pesquisar por telefone..."
              value={filtros.telefone}
              onChange={e =>
                setFiltros({ ...filtros, telefone: e.target.value })
              }
              onKeyPress={e => e.key === 'Enter' && pesquisar()}
            />
            <button className="btn-pesquisar" onClick={pesquisar}>
              🔍 Pesquisar
            </button>
            {(filtros.nome || filtros.telefone) && (
              <button className="btn-limpar" onClick={limparFiltros}>
                ✕ Limpar
              </button>
            )}
          </div>
          <button className="btn-novo" onClick={abrirModalNovo}>
            ➕ Novo Contato
          </button>
        </div>

        {/* Indicador de carregamento */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Carregando contatos...</p>
          </div>
        ) : (
          <ListaContatos
            contatos={contatos}
            aoEditar={abrirModalEditar}
            aoExcluir={excluirContato}
          />
        )}
      </div>

      {/* Modal de cadastro/edição */}
      {modalAberto && (
        <ModalContato
          contato={contatoEditando}
          aoFechar={fecharModal}
          aoSalvar={salvarContato}
        />
      )}

      {/* Toast de notificações */}
      {toast && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={fecharToast}
        />
      )}
    </div>
  );
}

export default App;
