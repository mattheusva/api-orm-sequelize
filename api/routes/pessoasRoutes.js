const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router();

router
.get('/pessoas', PessoaController.listarPessoasAtivas)
.get('/pessoas/todos', PessoaController.listarTodasAsPessoas)
.get('/pessoas/:id', PessoaController.buscarUmaPessoa)
.post('/pessoas', PessoaController.criarPessoa)
.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa)
.post('/pessoas/:estudanteId/cancela', PessoaController.cancelarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete('/pessoas/:id', PessoaController.deletarPessoa)

// matriculas
router
.get('/pessoas/:estudanteId/matricula/:matriculaId',  MatriculaController.buscarUmaMatricula)
.get('/pessoas/:estudanteId/matricula', PessoaController.listarMatriculas)
.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegarMatriculasPorTurma)
.get('/pessoas/matricula/lotada', MatriculaController.pegarTurmasLotadas)
.post('/pessoas/:estudanteId/matricula', MatriculaController.criarMatricula)
.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', MatriculaController.restaurarMatricula)
.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizarMatricula)
.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.deletarMatricula)

module.exports = router;