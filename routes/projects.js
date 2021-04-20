const express = require('express');
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', [
  check('name', 'El nombre del proyecto es obligatorio.').not().isEmpty(),
  check('description', 'La descripción es obligatoria').not().isEmpty(),
  check('imageUrl', 'La url de imagen es obligatoria').not().isEmpty(),
  check('demoUrl', 'La url del demo es obligatoria').not().isEmpty(),
  check('codeUrl', 'La url del repositorio es obligatoria').not().isEmpty().isURL(),
  check('tags', 'Los tags son obligatorios').isArray({min: 1})
], projectController.createProject);

router.put('/:id', [
  check('name', 'El nombre del proyecto es obligatorio.').not().isEmpty(),
  check('description', 'La descripción es obligatoria').not().isEmpty(),
  check('imageUrl', 'La url de imagen es obligatoria').not().isEmpty(),
  check('demoUrl', 'La url del demo es obligatoria').not().isEmpty(),
  check('codeUrl', 'La url del repositorio es obligatoria').not().isEmpty().isURL(),
  check('tags', 'Los tags son obligatorios').isArray({min: 1})
], projectController.updateProject);

router.delete('/:id', projectController.deleteProject);

router.get('/', projectController.fetchAllProjects);

module.exports = router;