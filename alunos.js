//Lista de alunos 
const alunos = [
  { nome: "José Almir", media: 8.5 },
  { nome: "Maria Silva", media: 7.0 },
  { nome: "Franscico Braga", media: 9.2 },
];

function filterBynome(alunos, nome) {
  if (!nome) {
    return alunos;
  }

  return alunos.filter(alunos => alunos.nome.toLowerCase().includes(nome.toLowerCase()));
}

function deletar(alunos, index) {
  if (index >= 0 && index < alunos.length) {
    alunos.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function atualizarAluno(alunos, index, { nome, media }) {
  const aluno = alunos[index];
  if (aluno && (nome || media)) {
    aluno.nome = nome ?? aluno.nome;
    aluno.media = media ?? aluno.media;
    return aluno;
  }
  return null;
}

function writeToFile() {
  fs.writeFile('db.json', JSON.stringify(alunos), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data written to db.json file');
    }
  });

}
alunos[0].age = 9;
alunos.push({ nome: 'Maria', media: 10 });

module.exports = { alunos, filterBynome, atualizarAluno, deletar };
