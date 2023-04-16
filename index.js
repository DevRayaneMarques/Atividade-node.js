const express = require("express");
const alunos = require("./alunos");
const bodyParser = require("body-parser");
const fs = require('fs');

// Define uma aplicação backend em Express
// Recursos pré-configurados
const app = express();

//Defini a rota
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route alunos
app.get("/alunos", (req, res) => {
  let { nome, media } = req.query;
  let filteredAlunos = alunos;

  //Filtrar nome
  if (nome) {
    filteredAlunos = filteredAlunos.filter(aluno => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
  }
  //Filtrar media 
  if (media) {
    filteredAlunos = filteredAlunos.filter(aluno => aluno.media >= media);
  }
  res.json(filteredAlunos);

});

app.post("/alunos/:novo", (req, res) => {
  let { nome, matricula, media } = req.body;

  if (!nome || !matricula || !media) {
    return res.status(400).json({ error: "Name, registration number, and average are required fields." });
  }

  let newAluno = { nome, matricula, media };
  alunos.push(newAluno);

  res.status(201).json(newAluno);
});

app.post('/alunos/deletar/:index', (req, res) => {
  const { index } = req.params;

  if (index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }

  alunos.splice(index, 1);

  return res.json({ message: 'Aluno deletado' });
});

app.post('/alunos/atualizar/:index', (req, res) => {
  const { index } = req.params;
  const { nome, media } = req.body;

 
    if (index < 0 || index >= alunos.length) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

  alunos[index].nome = nome || alunos[index].nome;
  alunos[index].media = media || alunos[index].media;

  return res.json({ message: 'Aluno deletado' });
});

app.listen(3000, () => {
  // roda sempre que o servidor inicia com sucesso
  console.log("Servidor rodando em http://localhost:3000/");
});