const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Rota Raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota de sugestão
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Seu lanche com os ingredientes: <strong>${ingredientes}</strong> foi enviado com sucesso!</p>
    <a href="/">Voltar ao início</a>
  `);
});

// Rota GET para contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Rota POST para envio do contato
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
    <h1>Mensagem Recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

// Rota da API de lanches
app.get('/api/lanches', (req, res) => {
  const dataPath = path.join(__dirname, 'public', 'data', 'lanches.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao ler os lanches.' });
    }
    res.json(JSON.parse(data));
  });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
