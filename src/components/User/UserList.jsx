import { useState, useEffect } from 'react';
import axios from 'axios';
import './buscar-Styles.css'; // Importando o arquivo CSS

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Carregar usuários ao carregar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsers(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setErrorMessage('Erro ao carregar usuários.');
      }
    };

    fetchUsers();
  }, []);

  // Função para deletar um usuário com confirmação
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?');

    if (!confirmDelete) {
      return; // Se o usuário cancelar, não faz nada
    }

    try {
      await axios.delete(`http://localhost:3000/usuarios/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setSuccessMessage('Usuário excluído com sucesso!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao excluir o usuário.');
      console.error("Erro capturado:", error.message);
      setSuccessMessage('');
    }
  };

  // Função para filtrar usuários pela pesquisa
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrar usuários com base na pesquisa
  const filteredUsers = users.filter(user => 
    user.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h2>Lista de Usuários</h2>

      {/* Campo de pesquisa */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Pesquisar usuário..." 
          value={searchQuery} 
          onChange={handleSearch} 
          className="search-input"
        />
      </div>

      {/* Lista de usuários */}
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user._id} className="user-item">
            <span>{user.nome} - {user.email}</span>
            <button 
              onClick={() => deleteUser(user._id)} 
              className="delete-button"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {/* Mensagens de erro ou sucesso */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UserList;
