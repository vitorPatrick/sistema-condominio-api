const express = require('express');

const router = express.Router();

let usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao@email.com',
        apartamento: '101'
    },
    {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria@email.com',
        apartamento: '202'
    }
];

// GET - listar todos os usuários
router.get('/', (req, res) => {
    res.json(usuarios);
});

// GET - buscar usuário por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }

    res.json(usuario);
});

// POST - criar usuário
router.post('/', (req, res) => {
    const novoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nome: req.body.nome,
        email: req.body.email,
        apartamento: req.body.apartamento
    };

    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

// PUT - atualizar usuário
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }

    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.apartamento = req.body.apartamento;

    res.json(usuario);
});

// DELETE - excluir usuário
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Usuário não encontrado'
        });
    }

    const usuarioRemovido = usuarios.splice(indice, 1);

    res.json({
        mensagem: 'Usuário removido com sucesso',
        usuario: usuarioRemovido[0]
    });
});

module.exports = router;