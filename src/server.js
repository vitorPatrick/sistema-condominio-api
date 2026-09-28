const express = require('express');

const app = express();

app.use(express.json());

const usuariosRoutes = require('./routes/usuarios');
const areasComunsRoutes = require('./routes/areasComuns');

app.use('/usuarios', usuariosRoutes);
app.use('/areas-comuns', areasComunsRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do Sistema de Gestão de Condomínios funcionando!'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});