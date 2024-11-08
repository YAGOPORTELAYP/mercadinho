const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');
const vendasRoutes = require('./routes/vendas');

app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);
app.use('/vendas', vendasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
