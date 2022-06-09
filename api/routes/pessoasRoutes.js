const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router
.get('/pessoas', PessoaController.listarPessoasAtivas)
.get('/pessoas/todos', PessoaController.listarTodasPessoas)
.get('/pessoas/:id', PessoaController.buscarUmaPessoa)
.post('/pessoas', PessoaController.criarPessoa)
.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete('/pessoas/:id', PessoaController.deletarPessoa)

// matriculas
router
.get('/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.buscarUmaMatricula)
.get('/pessoas/:estudanteId/matricula', PessoaController.pegarMatricula)
.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegarMatriculaPorTurma)
.get('/pessoas/matricula/lotada', PessoaController.pegarTurmasLotadas)
.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula)
.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restaurarMatricula)
.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula)
.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula)

module.exports = router;