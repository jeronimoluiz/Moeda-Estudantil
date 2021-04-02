const express  = require('express');
const router = express.Router();

const studentController = require('./controllers/student')
const loginController = require('./controllers/login')

router.get('/', (req, res) => res.json({ message: 'API working'}));

router.post('/login', loginController.loginStudent);
router.post('/student', studentController.add);
router.delete('/student/:id', studentController.remove);
router.patch('/student/:id', studentController.update);

module.exports = router;