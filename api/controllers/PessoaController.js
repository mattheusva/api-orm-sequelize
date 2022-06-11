const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
  static async listarPessoasAtivas(req, res){  
    try {
      const pessoasAtivas = await pessoasServices.pegarRegistrosAtivos()
      return res.status(200).json(pessoasAtivas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async listarTodasAsPessoas(req, res){  
    try {
      const todasAsPessoas = await pessoasServices.pegarTodosOsRegistros()
      return res.status(200).json(todasAsPessoas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarUmaPessoa(req, res) {  
    const { id } = req.params
    try {
      const pessoa = await pessoasServices.pegarUmRegistro({ id })
      return res.status(200).json(pessoa)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarPessoa(req, res) {  
    const novaPessoa = req.body
    try {
      const novaPessoaCriada = await pessoasServices.criarRegistro(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarPessoa(req, res) {  
    const { id } = req.params
    const novasInfos = req.body
    try {
      await pessoasServices.atualizarRegistro(novasInfos, Number(id))
      return res.status(200).json({ mensagem: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async deletarPessoa(req, res) {  
    const { id } = req.params
    try {
      await pessoasServices.apagarRegistro(Number(id))
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restaurarPessoa(req, res) {  
    const { id } = req.params
    try {
      const registroRestaurado = await pessoasServices
        .restauraRegistro(Number(id))
      return res.status(200).json(registroRestaurado)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async listarMatriculas(req, res) {  
    const { estudanteId } = req.params
    try {
      const matriculas = await pessoasServices
        .pegaMatriculasPorEstudante({ id: Number(estudanteId) })
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async cancelarPessoa(req, res) {  
    const { estudanteId } = req.params
    try {
      await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
      return res
        .status(200)
        .json({message: `matrículas ref. estudante ${estudanteId} canceladas`}) 
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController