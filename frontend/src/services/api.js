import axios from 'axios';

// Usa a URL da API do ambiente ou localhost para desenvolvimento
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

// funcoes pra interagir com a API
export const contatosAPI = {
  // busca todos os contatos ou pesquisa
  listar: async (filtros = {}) => {
    try {
      const params = new URLSearchParams();
      if (filtros.nome) params.append('nome', filtros.nome);
      if (filtros.telefone) params.append('telefone', filtros.telefone);

      const url = params.toString()
        ? `/contatos?${params.toString()}`
        : '/contatos';
      const response = await api.get(url);
      return response.data;
    } catch (erro) {
      console.error('Erro ao listar contatos:', erro);
      throw erro;
    }
  },

  // busca um contato especifico
  buscarPorId: async id => {
    try {
      const response = await api.get(`/contatos/${id}`);
      return response.data;
    } catch (erro) {
      console.error('Erro ao buscar contato:', erro);
      throw erro;
    }
  },

  // cria um novo contato
  criar: async contato => {
    try {
      const response = await api.post('/contatos', contato);
      return response.data;
    } catch (erro) {
      console.error('Erro ao criar contato:', erro);
      throw erro;
    }
  },

  // atualiza um contato existente
  atualizar: async (id, contato) => {
    try {
      const response = await api.put(`/contatos/${id}`, contato);
      return response.data;
    } catch (erro) {
      console.error('Erro ao atualizar contato:', erro);
      throw erro;
    }
  },

  // exclui um contato
  excluir: async id => {
    try {
      const response = await api.delete(`/contatos/${id}`);
      return response.data;
    } catch (erro) {
      console.error('Erro ao excluir contato:', erro);
      throw erro;
    }
  },
};

export default api;
