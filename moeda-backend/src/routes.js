const express  = require('express');
const router = express.Router();

const studentController = require('./controllers/student')
const loginControllerAluno = require('./controllers/loginAluno')
const loginControllerProfessor = require('./controllers/loginProfessor')
const searchs = require('./controllers/select');
const exchange = require('./controllers/exchange');

router.get('/', (req, res) => res.json({ message: 'API working'}));

//ROTA DO LOGIN DO ALUNO
router.post('/users/login-aluno', loginControllerAluno.loginAluno);
//ROTA DO LOGIN DO PROFESSOR
router.post('/users/login-professor', loginControllerProfessor.loginProfessor);
//
router.post('/student', studentController.add);
// ROTA DA PROCURA DO PROFESSOR
router.post('/users/professor/search', searchs.filterAluno);
//ROTA PARA PROCURA DO PROFESSOR DE TODOS OS ALUNOS DE UMA UNIVERSIDADE
router.post('/users/searchall', searchs.filterBuscaAlunos);

// ROTA DE RETORNO DE MOEDAS DO ALUNO
router.post('/users/moeda-aluno', searchs.filterMoedaAluno);

// ROTA DE RETORNO DE MOEDAS DO PROFESSOR
router.post('/users/moeda-professor', searchs.filterMoedaProfessor);

// ROTA PARA EXCHANGE DE MOEDAS DE ALUNO PARA ALUNO
router.post('/users/exchange-aluno', exchange.trocaAluno);

router.delete('/student/:id', studentController.remove);
router.patch('/student/:id', studentController.update);

module.exports = router;