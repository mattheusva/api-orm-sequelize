const { TurmasServices } = require('../services')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const turmasService = new TurmasServices()

class TurmaController {
  static async buscarTurmas(req, res){  
    const { data_inicial, data_final } = req.query
    const where = {}
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      const todasAsTurmas = await turmasService.pegarTodosOsRegistros(where)
      return res.status(200).json(todasAsTurmas) 
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarUmaTurma(req, res) {  
    const { id } = req.params
    try {
      const turma = await turmasService.pegarUmRegistro({ id })
      return res.status(200).json(turma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarTurma(req, res) {  
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await turmasService.criarRegistro(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarTurma(req, res) {  
    const { id } = req.params
    const novasInfos = req.body
    try {
      await turmasService.atualizaRegistro(novasInfos, id)
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletarTurma(req, res) {  
    const { id } = req.params
    try {
      await turmasService.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }


  static async restaurarTurma(req, res) {  
    const { id } = req.params
    try {
      await turmasService.restauraRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = TurmaController