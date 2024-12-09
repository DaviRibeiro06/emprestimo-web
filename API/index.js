import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
const app = express();
import bcrypt from 'bcrypt';

app.use(cors());
app.use(express.json());

// Configuração do MongoDB
const uri = "mongodb://localhost:27017"; // URL do MongoDB (localmente)
const client = new MongoClient(uri);
let db, usersCollection, itemsCollection, administradoresCollection;

async function connectDB() {
    await client.connect();
    db = client.db('emprestimosDB');
    administradoresCollection = db.collection('administradores');
    usersCollection = db.collection('usuarios');
    itemsCollection = db.collection('itens');
}

// Inicializar a conexão
connectDB().then(() => console.log("Conectado ao MongoDB"));

app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Usuário e senha são obrigatórios.' });
    }

    try {
        // Verificar se o usuário existe
        const user = await administradoresCollection.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        // Comparar a senha fornecida com o hash armazenado
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Senha inválida.' });
        }

        // Retornar sucesso com o token (mock ou real)
        const token = "mockToken123"; // Substitua por lógica JWT
        res.status(200).send({ token, message: 'Login bem-sucedido!' });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao realizar login', error: err.message });
    }
});


// Rota para registrar um novo usuário com senha criptografada
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Gerar hash da senha
        const saltRounds = 10; // Número de rodadas de salt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Criar usuário com senha criptografada
        const user = { username, password: hashedPassword, email };
        const result = await administradoresCollection.insertOne(user);

        user.id = result.insertedId;
        res.status(201).send({ message: 'Usuário registrado com sucesso!', user });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao registrar usuário', error: err.message });
    }
});


// Rota para Criar Usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    const user = { nome, email };

    try {
        const result = await usersCollection.insertOne(user);
        user.id = result.insertedId;
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao adicionar o usuário', error: err.message });
    }
});

// Rota para obter todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao obter usuários', error: err.message });
    }
});

// Rota para excluir um usuário
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }
        res.status(200).send({ message: 'Usuário excluído com sucesso.' });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao excluir o usuário', error: err.message });
    }
});

// Rota para Criar Item
app.post('/itens', async (req, res) => {
    const { nome, emprestado } = req.body;
    const item = { nome, emprestado };

    try {
        const result = await itemsCollection.insertOne(item);
        item.id = result.insertedId;
        res.status(201).send(item);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao adicionar o item', error: err.message });
    }
});

// Rota para obter todos os itens
app.get('/itens', async (req, res) => {
    try {
        const itens = await itemsCollection.find().toArray();
        res.status(200).json(itens);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao obter itens', error: err.message });
    }
});

// Rota para excluir um item
app.delete('/itens/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Item não encontrado.' });
        }
        res.status(200).send({ message: 'Item excluído com sucesso.' });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao excluir o item', error: err.message });
    }
});

// Rota para emprestar um item
app.post('/itens/:id/emprestar', async (req, res) => {
    const { id } = req.params;
    const { userName } = req.body;

    if (!userName) {
        return res.status(400).send({ message: 'O campo userName é obrigatório.' });
    }

    try {
        const item = await itemsCollection.findOne({ _id: new ObjectId(id) });
        if (!item) {
            return res.status(404).send({ message: 'Item não encontrado.' });
        }

        // Verificar se o item já foi emprestado
        if (item.emprestado) {
            return res.status(400).send({ message: 'Item já está emprestado.' });
        }

        // Atualizar item com o status de emprestado e o nome do usuário que pegou o item
        await itemsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { emprestado: true, usuarioEmprestado: userName } }
        );

        res.status(200).send({ message: `Item emprestado com sucesso para ${userName}.` });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao emprestar o item', error: err.message });
    }
});

// Rota para devolver um item
app.post('/itens/:id/devolver', async (req, res) => {
    const { id } = req.params;
    const { userName } = req.body;

    if (!userName) {
        return res.status(400).send({ message: 'O campo userName é obrigatório.' });
    }

    try {
        const item = await itemsCollection.findOne({ _id: new ObjectId(id) });
        if (!item) {
            return res.status(404).send({ message: 'Item não encontrado.' });
        }

        if (!item.emprestado || item.usuarioEmprestado !== userName) {
            return res.status(400).send({ message: 'Item não está emprestado para este usuário.' });
        }

        await itemsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { emprestado: false, usuarioEmprestado: null } }
        );

        res.status(200).send({ message: 'Item devolvido com sucesso.' });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao devolver o item', error: err.message });
    }
});

// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
