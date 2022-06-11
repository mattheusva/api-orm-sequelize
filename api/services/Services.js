const database = require('../models')

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo
  }

  async pegarTodosOsRegistros(where = {}) {
    return database[this.nomeDoModelo].findAll({ where: { ...where } })
  }

  async pegarUmRegistro(where = {}) {
    return database[this.nomeDoModelo].findOne({ where: { ...where } })
  }

  async criarRegistro(dados) {
    return database[this.nomeDoModelo].create(dados)
  }

  async atualizarRegistro(dadosAtualizados, id, transacao = {}){
    return database[this.nomeDoModelo]
      .update(dadosAtualizados, { where: { id: id } }, transacao)
  }

  async atualizarRegistros(dadosAtualizados, where, transacao = {}){
    return database[this.nomeDoModelo]
      .update(dadosAtualizados, { where: { ...where } }, transacao)
  }

  async apagarRegistro(id) {
    return database[this.nomeDoModelo].destroy({ where: { id: id } })
  }

  async restaurarRegistro(id) {
    return database[this.nomeDoModelo].restore({ where: { id: id } })
  }

  async consultarRegistroApagado(id) {
    return database[this.nomeDoModelo]
      .findOne({ paranoid: false, where: { id: Number(id) } })
  }

  async encontrarEContarRegistros(where = {}, agregadores) {
    return database[this.nomeDoModelo]
      .findAndCountAll({ where: { ...where }, ...agregadores })
  }

}

module.exports = Services