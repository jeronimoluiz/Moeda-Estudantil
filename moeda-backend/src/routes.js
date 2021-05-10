const express = require('express');
const router = express.Router();

const studentController = require('./controllers/student');
const teacherController = require('./controllers/teacher');
const loginControllerAluno = require('./controllers/loginAluno');
const loginControllerProfessor = require('./controllers/loginProfessor');
const transferController = require('./controllers/transfers');
const searchs = require('./controllers/tools/select');

router.get('/', (req, res) => res.json({ message: 'API working' }));

//ROTA DO LOGIN DO ALUNO
router.post('/users/login-aluno', loginControllerAluno.loginAluno);
//ROTA DO LOGIN DO PROFESSOR
router.post('/users/login-professor', loginControllerProfessor.loginProfessor);

//ROTA DO CADASTRO DO ALUNO
router.post('/users/cadastro-aluno', studentController.registroAluno);
//ROTA DO CADASTRO DO PROFESSOR
router.post('/users/cadastro-professor', teacherController.registroProfessor);

// ROTA DA PROCURA DO PROFESSOR
router.post('/users/professor/search', searchs.filterAlunoCPF);
//ROTA PARA PROCURA DO PROFESSOR DE TODOS OS ALUNOS DE UMA UNIVERSIDADE
router.post('/users/searchall', searchs.filterBuscaAlunos);
//ROTA PARA PROCURA DO ALUNO PARA OUTRO ALUNO PELA MATRICULA
router.post('/users/search-matricula', searchs.filterAlunoMatricula);
//ROTA PARA PROCURA DO ALUNO PARA OUTRO ALUNO PELO NOME
router.post('/users/search-name', searchs.filterBuscaNomeAluno);
//ROTA PARA PROCURA DO ALUNO PARA OUTRO ALUNO PELO NOME E RETORNAR A MATRICULA
router.post('/users/search-registration', searchs.filterBuscaNomeAlunoMatricula);

// ROTA DE RETORNO DE MOEDAS DO ALUNO
router.post('/users/moeda-aluno', searchs.filterMoedaAluno);
// ROTA DE RETORNO DE MOEDAS DO PROFESSOR
router.post('/users/moeda-professor', searchs.filterMoedaProfessor);

// ROTA TRANSFERENCIA DE ALUNO PRA ALUNO PELO CPF
router.post('/tranfer/aluno-aluno-cpf', transferController.studentToStudentCPF);
// ROTA TRANSFERENCIA DE PROFESSOR PRA ALUNO PELO CPF
router.post('/tranfer/professor-aluno-cpf', transferController.teacherToStudentCPF);
// ROTA TRANSFERENCIA DE ALUNO PRA ALUNO PELO NOME
router.post('/tranfer/aluno-aluno-matricula', transferController.studentToStudentRegistration);
// ROTA TRANSFERENCIA DE PROFESSOR PRA ALUNO PELO NOME
router.post('/tranfer/professor-aluno-matricula', transferController.teacherToStudentRegistration);

router.delete('/student/:id', studentController.remove);
router.patch('/student/:id', studentController.update);

module.exports = router;