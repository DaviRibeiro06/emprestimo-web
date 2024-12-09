import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useAp1'; // Certifique-se de importar corretamente
import './User-Styles.css';

export const UserForm = () => {
  const [nome, setNome] = useState(''); // Estado para o nome do usuário
  const [email, setEmail] = useState(''); // Estado para o email do usuário
  const { fetchUsers, createUser } = useApi(); // Funções do hook useApi

  // Função para carregar os usuários da API ao montar o componente
  const carregarUsuarios = async () => {
    try {
      await fetchUsers(); // Carrega os usuários, mas não os armazena
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    carregarUsuarios(); // Chama a função ao montar
  }, []);

  // Função para submeter o formulário e criar um novo usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validação para evitar duplicados
      const usuariosCarregados = await fetchUsers();
      if (usuariosCarregados.some(usuario => usuario.email === email)) {
        alert('Usuário com este email já foi cadastrado!');
        return;
      }

      // Criação do novo usuário
      const novoUsuario = await createUser({ nome, email });
      setNome(''); // Limpa o campo de nome
      setEmail(''); // Limpa o campo de email
      alert('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      alert('Não foi possível adicionar o usuário. Tente novamente.');
    }
  };

  return (
    <div className="body">
    {/* Título no topo */}
      <form onSubmit={handleSubmit}>
      <h1>Gerenciar Usuários</h1>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
          aria-label="Nome do Usuário"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          aria-label="Email do Usuário"
        />
        <button type="submit">Adicionar Usuário</button>
      </form>
    </div>
  );
};

export default UserForm;
