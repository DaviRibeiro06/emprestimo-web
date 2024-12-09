
# **Sistema de Gerenciamento de Empréstimos**

> Sistema completo para gerenciar empréstimos de itens, incluindo autenticação, cadastro de usuários e itens, além de controle de empréstimos e devoluções.

---

## **📖 Descrição do Projeto**

O **Sistema de Gerenciamento de Empréstimos** é uma aplicação web que permite o gerenciamento de usuários e itens, com funcionalidades como:

- Cadastro e autenticação de usuários (com senhas criptografadas).
- Cadastro, empréstimo e devolução de itens.
- Controle de status dos itens (disponível ou emprestado).
- Integração com MongoDB para persistência de dados.

Este projeto foi desenvolvido utilizando **Node.js**, **React**, e **MongoDB**, com o objetivo de criar uma aplicação segura e escalável.

---

## **🚀 Funcionalidades**

- **Login e Registro**
  - Login com autenticação JWT.
  - Registro com validação de campos e criptografia de senhas usando `bcrypt`.

- **Gerenciamento de Usuários**
  - Cadastro de usuários no banco de dados.
  - Listagem e exclusão de usuários.

- **Gerenciamento de Itens**
  - Cadastro de itens disponíveis para empréstimo.
  - Marcação de itens como emprestados e devolvidos.
  - Verificação do status de cada item.

---

## **🛠️ Tecnologias Utilizadas**

### **Frontend**
- **React.js**
- **React Router Dom** (navegação)
- **FontAwesome** (ícones)
- **CSS** (design responsivo e estilização)

### **Backend**
- **Node.js** com **Express.js** (servidor web)
- **bcrypt** (criptografia de senhas)
- **JWT (JSON Web Token)** (autenticação segura)

### **Banco de Dados**
- **MongoDB** (armazenamento dos dados)
- **MongoDB Atlas** (opcional para deploy)

---

## **📦 Instalação e Execução**

Siga os passos abaixo para configurar o projeto em seu ambiente local:

### **Pré-requisitos**
- **Node.js** (versão 14 ou superior)
- **MongoDB** (instalado localmente ou hospedado no MongoDB Atlas)

### **1. Clone o Repositório**
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### **2. Configure o Backend**
1. Entre na pasta do servidor:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados no arquivo `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/emprestimosDB
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### **3. Configure o Frontend**
1. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```

---

## **📂 Estrutura do Projeto**

```bash
├── backend/                # Código do servidor
│   ├── controllers/        # Lógica de negócio (rotas)
│   ├── models/             # Modelos de dados MongoDB
│   ├── routes/             # Rotas da API
│   ├── server.js           # Configuração principal
├── frontend/               # Código do cliente
│   ├── src/
│       ├── components/     # Componentes React
│       ├── pages/          # Páginas principais
│       ├── App.js          # Arquivo principal
│   ├── public/             # Assets públicos (imagens, favicon)
├── README.md               # Documentação do projeto
└── package.json            # Configuração de dependências
```

---

## **🔒 Segurança**

- Todas as senhas são armazenadas usando **criptografia com bcrypt**.
- As rotas protegidas utilizam **JWT** para autenticação.
- O backend valida todas as entradas para prevenir ataques comuns, como **SQL Injection** e **XSS**.

---

## **📝 Contribuindo**

Contribuições são sempre bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça as alterações e confirme os commits:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie as alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request** no GitHub.

---

## **🛡️ Licença**

Este projeto está licenciado sob a **MIT License**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## **👨‍💻 Autor**

Desenvolvido por **Davi Ribeiro - Talysson Gadêlha - João Victor**.

- **LinkedIn:** [Davi Ribeiro](https://www.linkedin.com/in/davi-ri/)
- **LinkedIn:** [Talysson Gadêlha](https://www.linkedin.com/in/talysson-gadêlha/)
- **LinkedIn:** [João Victor](https://www.linkedin.com/in/joão-victor-aquino-3901801b6/)