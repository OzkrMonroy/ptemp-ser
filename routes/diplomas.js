const express = require('express');
const { check } = require('express-validator');
const diplomaController = require('../controllers/diplomaController');

const router = express.Router();

router.post('/', [
  check('name', 'Name is required.').not().isEmpty(),
  check('description', 'Description is required.').not().isEmpty(),
  check('imageUrl', 'Verified is a valid url').not().isURL(),
  check('courseUrl', 'Verified is a valid url').not().isURL()
], diplomaController.createDiploma);

router.put('/:id', [
  check('name', 'Name is required.').not().isEmpty(),
  check('description', 'Description is required.').not().isEmpty(),
  check('imageUrl', 'Verified is a valid url').not().isURL(),
  check('courseUrl', 'Verified is a valid url').not().isURL()
], diplomaController.updateDiploma);

router.delete('/:id', diplomaController.deleteDiploma);

router.get('/', diplomaController.fetchAllDiplomas);