const express  = require('express');
const router = express.Router();

const studentController = require('./controllers/student');
const teacherController = require('./controllers/teacher');
const loginControllerAluno = require('./controllers/loginAluno');
const loginControllerProfessor = require('./controllers/loginProfessor');
const searchs = require('./controllers/select');

router.get('/', (req, res) => res.json({ message: 'API working'}));

//ROTA DO LOGIN DO ALUNO
router.post('/users/login-aluno', loginControllerAluno.loginAluno);
//ROTA DO LOGIN DO PROFESSOR
router.post('/users/login-professor', loginControllerProfessor.loginProfessor);

//ROTA DO CADASTRO DO ALUNO
router.post('/users/cadastro-aluno', studentController.registroAluno);
//ROTA DO CADASTRO DO PROFESSOR
router.post('/users/cadastro-professor', teacherController.registroProfessor);

// ROTA DA PROCURA DO PROFESSOR
router.post('/users/professor/search', searchs.filterAluno);
//ROTA PARA PROCURA DO PROFESSOR DE TODOS OS ALUNOS DE UMA UNIVERSIDADE
router.post('/users/searchall', searchs.filterBuscaAlunos);

// ROTA DE RETORNO DE MOEDAS DO ALUNO
router.post('/users/moeda-aluno', searchs.filterMoedaAluno);
// ROTA DE RETORNO DE MOEDAS DO PROFESSOR
router.post('/users/moeda-professor', searchs.filterMoedaProfessor);

router.delete('/student/:id', studentController.remove);
router.patch('/student/:id', studentController.update);



module.exports = router;