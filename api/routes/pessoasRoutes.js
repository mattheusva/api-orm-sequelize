const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.listarPessoasAtivas);
router.get('/pessoas/todos', PessoaController.listarTodasPessoas);
router.get('/pessoas/:id', PessoaController.buscarUmaPessoa);
router.post('/pessoas', PessoaController.criarPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa);
router.put('/pessoas/:id', PessoaController.atualizarPessoa);
router.delete('/pessoas/:id', PessoaController.deletarPessoa);

// matriculas
router.get('/pessoas/:estudanteId/matricula/:matriculaId',  PessoaController.buscarUmaMatricula);
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegarMatricula);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegarMatriculaPorTurma);
router.post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula);
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restaurarMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletarMatricula);

module.exports = router;