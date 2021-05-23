const express = require('express');
const router = express.Router();

const studentController = require('./controllers/student');
const teacherController = require('./controllers/teacher');
const loginControllerAluno = require('./controllers/loginAluno');
const loginControllerProfessor = require('./controllers/loginProfessor');
const transferController = require('./controllers/transfers');
const historicController = require('./controllers/historic');
const searchs = require('./controllers/tools/select');
const storeLogin = require('./controllers/loginLoja');
const storeRegistration = require('./controllers/cadastroLoja');
const vinculate = require('./controllers/vinculoLojaUniversidade');
const productRegistration = require('./controllers/cadastroDeProduto');
const { Router } = require('express');

router.get('/', (req, res) => res.json({ message: 'API working' }));

//ROTA DO LOGIN DO ALUNO
router.post('/users/login-aluno', loginControllerAluno.loginAluno);
//ROTA DO LOGIN DO PROFESSOR
router.post('/users/login-professor', loginControllerProfessor.loginProfessor);
//ROTA DO LOGIN DA LOJA
router.post('/users/login-loja', storeLogin.loginLojaParceira);

//ROTA DO CADASTRO DO ALUNO
router.post('/users/cadastro-aluno', studentController.registroAluno);
//ROTA DO CADASTRO DO PROFESSOR
router.post('/users/cadastro-professor', teacherController.registroProfessor);
//ROTA DO CADASTRO DA LOJA
router.post('/users/cadastro-loja', storeRegistration.CadastroLojaParceira);
//ROTA PARA CADASTRO DE UM VINCULO DA UMA LOJA A UMA UNIVERSIDADE
router.post('/users/vincular-loja', vinculate.FazerOVinculoLojaUniversidade); 
//ROTA PARA CADASTRO DE UM PRODUTO EM UMA LOJA
router.post('/users/store/product-register', productRegistration.CadastroProdutoNovo);

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
//ROTA PARA RETORNAR A LISTA DE UNIVERSIDADES
router.post('/users/search-all-university', searchs.filterBuscaNomeUniversidade);

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

// ROTA HISTORICO DE TRANSFERENCIAS ALUNO-ALUNO
router.post('/historic/historic-student', historicController.searchHistoricByDateStudent);
// ROTA HISTORICO DE TRANSFERENCIAS PROFESSOR-ALUNO
router.post('/historic/historic-teacher', historicController.searchHistoricByDateTeacher);

router.delete('/student/:id', studentController.remove);
router.patch('/student/:id', studentController.update);

module.exports = router;