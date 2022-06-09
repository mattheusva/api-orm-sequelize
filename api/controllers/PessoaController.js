const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController {
  static async listarPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarTodasPessoas(req, res) {
    try {
      const todasPessoas = await database.Pessoas.scope('todos').findAll();
      return res.status(200).json(todasPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async buscarUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criarPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const { id } = req.params;
    const atualizacao = req.body;
    try {
      await database.Pessoas.update(atualizacao, {
        where: {
           id: Number(id) 
        }});
      const pessoaAtualizada = await database.Pessoas.findOne({ 
        where: {
           id: Number(id) 
        }});
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({
        where: {
           id: Number(id) 
        }});
      return res.status(200).json({ message: `id ${id} deletado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restaurarPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id: Number(id) }});
      return res.status(200).json({ message: `id ${id} restaurado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // matriculas

  static async buscarUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await database.Matriculas.findOne( { 
        where: { 
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = {...req.body, estudante_id: Number(estudanteId)};
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const atualizacao = req.body;
    try {
      await database.Matriculas.update(atualizacao, { 
        where: { 
          id: Number(matriculaId), 
          estudante_id: Number(estudanteId)
        }});
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId)
        }});
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: {
           id: Number(matriculaId) 
        }});
      return res.status(200).json({ message: `id ${matriculaId} deletado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restaurarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  
  static async pegarMatricula(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({ where: {id: Number(estudanteId)} })
      const matriculas = await pessoa.getAulasMatriculadas()
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarMatriculaPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas = await database.Matriculas.findAndCountAll({ where: {
        turma_id: Number(turmaId),
        status: 'confirmado' 
      },
      limit: 20,
      order: [['estudante_id', 'ASC']]
    })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegarTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await database.Matriculas
        .findAndCountAll({
          where: {
            status: 'confirmado'
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        })
      return res.status(200).json(turmasLotadas.count)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController;