const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET: Todos os produtos
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM produtos');
  res.json(result.rows);
});

// POST: Adicionar produto
router.post('/', async (req, res) => {
  const { nome, preco, qtde_estoque } = req.body;
  const result = await pool.query(
    'INSERT INTO produtos (nome, preco, qtde_estoque) VALUES ($1, $2, $3) RETURNING *',
    [nome, preco, qtde_estoque]
  );
  res.json(result.rows[0]);
});

// PUT: Editar produto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco, qtde_estoque } = req.body;
  const result = await pool.query(
    'UPDATE produtos SET nome = $1, preco = $2, qtde_estoque = $3 WHERE id = $4 RETURNING *',
    [nome, preco, qtde_estoque, id]
  );
  res.json(result.rows[0]);
});

// DELETE: Deletar produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
