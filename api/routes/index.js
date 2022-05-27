const express = require('express');
const pessoas = require('./pessoasRoutes');
const niveis = require('./niveisRoutes');
const turmas = require('./turmasRoutes');

module.exports = app => {
  app.use(
    express.json(),
    pessoas,
    niveis,
    turmas
  );
};