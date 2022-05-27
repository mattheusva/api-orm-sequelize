const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')
 
const router = Router()
router
 .get('/turmas', TurmaController.buscarTurmas)
 .get('/turmas/:id', TurmaController.buscarUmaTurma)
 .post('/turmas', TurmaController.criarTurma)
 .put('/turmas/:id', TurmaController.atualizarTurma)
 .delete('/turmas/:id', TurmaController.deletarTurma)
module.exports = router