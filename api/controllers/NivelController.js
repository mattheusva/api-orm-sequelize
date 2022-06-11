const Services = require('../services/Services')
const niveisServices = new Services('Niveis')

class NivelController {
  static async buscarNiveis(req, res){  
    try {
      const todosOsNiveis = await niveisServices.pegarTodosOsRegistros()
      return res.status(200).json(todosOsNiveis)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarUmNivel(req, res) {  
    const { id } = req.params
    try {
      const nivel = await niveisServices.pegarUmRegistro({ id })
      return res.status(200).json(nivel)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarNivel(req, res) {  
    const novoNivel = req.body
    try {
      const novoNivelCriado = await niveisServices.criarRegistro(novoNivel)
      return res.status(200).json(novoNivelCriado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarNivel(req, res) {  
    const { id } = req.params
    const novasInfos = req.body
    try {
      await niveisServices.atualizarRegistro(novasInfos, id)
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletarNivel(req, res) {  
    const { id } = req.params
    try {
      await niveisServices.apagaRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restaurarNivel(req, res) {  
    const { id } = req.params
    try {
      await niveisServices.restauraRegistro(id)
      return res.status(200).json({ mensagem: `id ${id} restaurado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = NivelController