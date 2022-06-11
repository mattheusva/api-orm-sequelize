const Sequelize = require('sequelize');
const { MatriculasServices } = require('../services');
const matriculasServices = new MatriculasServices();

class MatriculaController {
  static async buscarUmaMatricula(req, res) { 
    const { estudanteId, matriculaId } = req.params
    try {
      const umaMatricula = await matriculasServices
        .pegarUmRegistro({id: matriculaId, estudante_id: estudanteId})
      return res.status(200).json(umaMatricula)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarMatricula(req, res) {  
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
    try {
      const novaMatriculaCriada = await matriculasServices
        .criarRegistro(novaMatricula)
      return res.status(200).json(novaMatriculaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarMatricula(req, res) {  
    const { estudanteId, matriculaId } = req.params
    const novasInfos = req.body
    try {
      await matriculasServices
        .atualizarRegistros(novasInfos, 
          { id: Number(matriculaId), estudante_id: Number(estudanteId) })
      return res.status(200).json({ mensagem: `id ${matriculaId} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletarMatricula(req, res) {  
    const { matriculaId } = req.params
    try {
      await matriculasServices.apagarRegistro(Number(matriculaId))
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restaurarMatricula(req, res) {  
    const { matriculaId } = req.params
    try {
      await matriculasServices
        .restaurarRegistro(Number(matriculaId))
      return res.status(200).json({ mensagem: `id ${matriculaId} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegarMatriculasPorTurma(req, res) {   
    const { turmaId } = req.params
    try {
      const todasAsMatriculas = await matriculasServices
        .encontrarEContarRegistros(
          { turma_id: Number(turmaId), status: 'confirmado' },
          { limit: 20, order: [['estudante_id', 'DESC']] })
      return res.status(200).json(todasAsMatriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegarTurmasLotadas(req, res) {  
    const lotacaoTurma = 2
    try {
      const turmasLotadas = await matriculasServices
        .encontrarEContarRegistros({ status: 'confirmado' },
          { 
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

module.exports = MatriculaController