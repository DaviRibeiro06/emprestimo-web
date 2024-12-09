import  { useState, useEffect } from 'react';
import axios from 'axios';
import './Item-Styles.css';

const ItemList = () => {
  const [nome, setNome] = useState('');
  const [itens, setItens] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/itens');
        setItens(response.data);
      } catch (error) {
        setErrorMessage('Erro ao carregar itens.');
        console.error("Erro capturado:", error.message);
      }
    };

    fetchItems();
  }, []);

  const adicionarItem = async () => {
    if (!nome) {
      setErrorMessage('O campo Nome do Item é obrigatório.');
      return;
    }

    // Verificar se o nome do item já existe
    const itemExistente = itens.find(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (itemExistente) {
      setErrorMessage('Já existe um item com esse nome.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/itens', { nome, emprestado: false });
      setItens([...itens, response.data]);
      setNome('');
      setSuccessMessage('Item adicionado com sucesso!');
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro ao tentar adicionar o item.');
      }
      setSuccessMessage('');
    }
  };

  const deleteItem = async (itemId, emprestado) => {
    if (emprestado) {
      setErrorMessage('Não é possível excluir um item que já está emprestado.');
      return;
    }

    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este item?');
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/itens/${itemId}`);
      setItens(itens.filter(item => item._id !== itemId));
      setSuccessMessage('Item excluído com sucesso!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Erro ao excluir o item.');
      console.error("Erro capturado:", error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Novo Item</h2>

      <div className="input-group">
        <label htmlFor="itemName">Nome do Item:</label>
        <input
          type="text"
          id="itemName"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <button className="button-primary" onClick={adicionarItem}>
        Adicionar Item
      </button>

      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}

      <div className="item-list">
        <h3>Itens Cadastrados</h3>
        <ul>
          {itens.map((item) => (
            <li key={item._id}>
              <span>{item.nome} - {item.emprestado ? 'Emprestado' : 'Disponível'}</span>
              <button
                className="button-danger"
                onClick={() => deleteItem(item._id, item.emprestado)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
