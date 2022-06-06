const { Router } = require('express')
const NivelController = require('../controllers/NivelController')
 
const router = Router()
router
 .get('/niveis', NivelController.buscarNiveis)
 .get('/niveis/:id', NivelController.buscarUmNivel)
 .post('/niveis', NivelController.criarNivel)
 .post('/niveis/:id/restaura', NivelController.restaurarNivel)
 .put('/niveis/:id', NivelController.atualizarNivel)
 .delete('/niveis/:id', NivelController.deletarNivel)
module.exports = router