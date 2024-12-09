import axios from 'axios';

export const useApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:3000', // URL base da sua API
  });

  // ====== Funções auxiliares ======
  const getItemByName = async (itemName) => {
    try {
      const response = await api.get(`/itens?nome=${itemName}`);
      if (response.data.length === 0) {
        throw new Error(`Item com o nome "${itemName}" não encontrado.`);
      }
      console.log('Item encontrado:', response.data[0]);  // Log do item encontrado
      return response.data[0]; // Retorna o primeiro item encontrado
    } catch (error) {
      console.error('Erro ao buscar o item:', error.message);
      throw error;
    }
  };

  const getUserByName = async (userName) => {
    try {
      const response = await api.get(`/usuarios?nome=${userName}`);
      if (response.data.length === 0) {
        throw new Error(`Usuário com o nome "${userName}" não encontrado.`);
      }
      console.log('Usuário encontrado:', response.data[0]);  // Log do usuário encontrado
      return response.data[0]; // Retorna o primeiro usuário encontrado
    } catch (error) {
      console.error('Erro ao buscar o usuário:', error.message);
      throw error;
    }
  };

  // ====== Funções principais ======
  const loanItemByName = async (itemName, userName) => {
    try {
      const item = await getItemByName(itemName);  // Encontra o item pelo nome
      const user = await getUserByName(userName);  // Encontra o usuário pelo nome

      // Log dos dados enviados para a requisição
      console.log('Enviando dados para emprestar o item:', {
        itemId: item._id,
        userId: user._id,
      });

      const response = await api.post(`/itens/${item._id}/emprestar`, {
        userId: user._id,
      });

      console.log('Resposta do empréstimo:', response.data);  // Log da resposta
      return response.data;
    } catch (error) {
      console.error('Erro ao emprestar o item:', error.response?.data || error.message);
      throw error;
    }
  };

  const returnItemByName = async (itemName, userName) => {
    try {
      const item = await getItemByName(itemName);  // Encontra o item pelo nome
      const user = await getUserByName(userName);  // Encontra o usuário pelo nome

      // Log dos dados enviados para a requisição
      console.log('Enviando dados para devolver o item:', {
        itemId: item._id,
        userId: user._id,
      });

      const response = await api.post(`/itens/${item._id}/devolver`, {
        userId: user._id,
      });

      console.log('Resposta da devolução:', response.data);  // Log da resposta
      return response.data;
    } catch (error) {
      console.error('Erro ao devolver o item:', error.response?.data || error.message);
      throw error;
    }
  };

  // ====== Outras funções existentes ======
  const fetchUsers = async () => {
    try {
      const response = await api.get('/usuarios');
      console.log('Usuários recebidos:', response.data);  // Log dos usuários recebidos
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
      throw error;
    }
  };

  const createUser = async ({ nome, email }) => {
    try {
      const response = await api.post('/usuarios', { nome, email });
      console.log('Usuário criado:', response.data);  // Log do usuário criado
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/usuarios/${userId}`);
      console.log('Usuário excluído:', response.data);  // Log do usuário excluído
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
      throw error;
    }
  };

  const fetchItems = async () => {
    try {
      const response = await api.get('/itens');
      console.log('Itens recebidos:', response.data);  // Log dos itens recebidos
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar itens:', error.message);
      throw error;
    }
  };

  const createItem = async ({ nome, emprestado }) => {
    try {
      const response = await api.post('/itens', { nome, emprestado });
      console.log('Item criado:', response.data);  // Log do item criado
      return response.data;
    } catch (error) {
      console.error('Erro ao criar item:', error.message);
      throw error;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await api.delete(`/itens/${itemId}`);
      console.log('Item excluído:', response.data);  // Log do item excluído
      return response.data;
    } catch (error) {
      console.error('Erro ao excluir item:', error.message);
      throw error;
    }
  };

  return {
    loanItemByName,
    returnItemByName,
    fetchUsers,
    createUser,
    deleteUser,
    fetchItems,
    createItem,
    deleteItem,
  };
};
