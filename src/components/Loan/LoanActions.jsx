import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanActions-Styles.css';  // Importando o CSS

const LoanActions = () => {

    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/itens');
                setItems(response.data);
            } catch (error) {
                setErrorMessage('Erro ao carregar itens.');
                console.error("Erro capturado:", error.message);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/usuarios');
                setUsers(response.data);
            } catch (error) {
                setErrorMessage('Erro ao carregar usuários.');
                console.error("Erro capturado:", error.message);
            }
        };

        fetchItems();
        fetchUsers();
    }, []);

    const emprestarItem = async () => {
        if (!selectedUserName) {
            setErrorMessage('O campo Nome do Usuário é obrigatório.');
            return;
        }

        if (!selectedItemId) {
            setErrorMessage('Por favor, selecione um item.');
            return;
        }

        const dataEmprestimo = new Date().toLocaleDateString(); // Data atual de empréstimo
        const dataDevolucaoPrevista = new Date();
        dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 7); // Devolução prevista em 7 dias

        try {
            const response = await axios.post(`http://localhost:3000/itens/${selectedItemId}/emprestar`, { 
                userName: selectedUserName,
                dataEmprestimo,
                dataDevolucaoPrevista: dataDevolucaoPrevista.toLocaleDateString()
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');

            setItems(prevItems =>
                prevItems.map(item =>
                    item._id === selectedItemId
                        ? { 
                            ...item, 
                            emprestado: true, 
                            usuarioEmprestado: selectedUserName,
                            dataEmprestimo,
                            dataDevolucaoPrevista: dataDevolucaoPrevista.toLocaleDateString()
                        }
                        : item
                )
            );
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erro ao tentar emprestar o item.');
            }
            setSuccessMessage('');
        }
    };

    const devolverItem = async () => {
        if (!selectedUserName) {
            setErrorMessage('O campo Nome do Usuário é obrigatório.');
            return;
        }

        if (!selectedItemId) {
            setErrorMessage('Por favor, selecione um item.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/itens/${selectedItemId}/devolver`, { userName: selectedUserName });
            setSuccessMessage(response.data.message);
            setErrorMessage('');

            setItems(prevItems =>
                prevItems.map(item =>
                    item._id === selectedItemId
                        ? { ...item, emprestado: false, usuarioEmprestado: null, dataEmprestimo: null, dataDevolucaoPrevista: null }
                        : item
                )
            );
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Erro ao tentar devolver o item.');
            }
            setSuccessMessage('');
        }
    };

    const getItensEmprestados = (userName) => {
        return items.filter(item => item.usuarioEmprestado === userName);
    };

    const getItensDisponiveis = () => {
        return items.filter(item => !item.emprestado);
    };

    return (
        <div className="loan-actions-container">
            <h2>Emprestar ou Devolver Item</h2>

            {/* Seletor de usuário */}
            <div className="select-container">
                <label htmlFor="userName">Selecione um Usuário:</label>
                <select 
                    id="userName" 
                    value={selectedUserName} 
                    onChange={(e) => setSelectedUserName(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {users.map(user => (
                        <option key={user._id} value={user.nome}>{user.nome}</option>
                    ))}
                </select>
            </div>

            {/* Seletor de item */}
            <div className="select-container">
                <label htmlFor="itemId">Selecione um Item:</label>
                <select 
                    id="itemId" 
                    value={selectedItemId} 
                    onChange={(e) => setSelectedItemId(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {items.map(item => (
                        <option key={item._id} value={item._id}>{item.nome}</option>
                    ))}
                </select>
            </div>

            {/* Botões para emprestar e devolver */}
            <div className="button-group">
                <button onClick={emprestarItem}>Emprestar Item</button>
                <button onClick={devolverItem}>Devolver Item</button>
            </div>

            {/* Exibição de mensagens de erro ou sucesso */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Exibir lista de usuários e os itens emprestados */}
            <div className="users-list">
                <h3>Usuários e Itens Emprestados:</h3>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => {
                            const itemsEmprestados = getItensEmprestados(user.nome);
                            return (
                                <li key={user._id}>
                                    <strong>{user.nome}</strong>
                                    {itemsEmprestados.length > 0 ? (
                                        <ul>
                                            {itemsEmprestados.map(item => (
                                                <li key={item._id}>
                                                    {item.nome} (Emprestado em: {item.dataEmprestimo} | Devolução prevista: {item.dataDevolucaoPrevista})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Não há itens emprestados.</p>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>Não há usuários cadastrados.</p>
                )}
            </div>

            {/* Exibir lista de itens disponíveis */}
            <div className="available-items-list">
                <h3>Itens Disponíveis:</h3>
                {getItensDisponiveis().length > 0 ? (
                    <ul>
                        {getItensDisponiveis().map(item => (
                            <li key={item._id}>
                                {item.nome} (Disponível)
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Não há itens disponíveis.</p>
                )}
            </div>
        </div>
    );
};

export default LoanActions;
