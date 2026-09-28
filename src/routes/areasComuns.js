const express = require('express');

const router = express.Router();

let areasComuns = [
    {
        id: 1,
        nome: 'Salão de Festas',
        capacidade: 50,
        disponivel: true
    },
    {
        id: 2,
        nome: 'Churrasqueira',
        capacidade: 20,
        disponivel: true
    }
];

// GET - listar todas as áreas comuns
router.get('/', (req, res) => {
    res.json(areasComuns);
});

// GET - buscar área comum por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const area = areasComuns.find(a => a.id === id);

    if (!area) {
        return res.status(404).json({
            mensagem: 'Área comum não encontrada'
        });
    }

    res.json(area);
});

// POST - criar área comum
router.post('/', (req, res) => {
    const novaArea = {
        id: areasComuns.length > 0
            ? areasComuns[areasComuns.length - 1].id + 1
            : 1,
        nome: req.body.nome,
        capacidade: req.body.capacidade,
        disponivel: req.body.disponivel
    };

    areasComuns.push(novaArea);

    res.status(201).json(novaArea);
});

// PUT - atualizar área comum
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const area = areasComuns.find(a => a.id === id);

    if (!area) {
        return res.status(404).json({
            mensagem: 'Área comum não encontrada'
        });
    }

    area.nome = req.body.nome;
    area.capacidade = req.body.capacidade;
    area.disponivel = req.body.disponivel;

    res.json(area);
});

// DELETE - excluir área comum
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const indice = areasComuns.findIndex(a => a.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Área comum não encontrada'
        });
    }

    const areaRemovida = areasComuns.splice(indice, 1);

    res.json({
        mensagem: 'Área comum removida com sucesso',
        area: areaRemovida[0]
    });
});

module.exports = router;