const Diploma = require('../models/Diploma');
const express = require('express');
const { validationResult } = require('express-validator');

exports.createDiploma = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    let diploma = await Diploma.findOne({ name });
    if(diploma){
      res.status(400).json({ msg: 'A Diploma with that name already exists'});
    }

    diploma = new Diploma(req.body);
    await diploma.save();

    res.status(200).json({ diploma });
  } catch (error) {
    console.log(error);
  }
};

exports.updateDiploma = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  let newDiploma;

  if(name){
    newDiploma = req.body
  }

  try {
    const diploma = await Diploma.findById(req.params.id);
    if(!diploma){
      res.status(404).json({ msg: 'The diploma doesn\'t exists.'});
    }

    diploma = await Diploma.findByIdAndUpdate({ _id: req.params.id }, { $set: newDiploma}, { new: true });
    res.status(200).json({ diploma });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

exports.deleteDiploma = async (req, res) => {
  try {
    let diploma = await Diploma.findById(req.params.id);

    if(!diploma){
      res.status(400).json({ msg: 'Diploma doesn\'t exists.'});
    }
    await Diploma.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: 'Project has been deleted.' });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

exports.fetchAllDiplomas = async (req, res) => {
  try {
    const diplomasList = await Diploma.find().sort({ createdAt: -1 });
    res.status(200).json({ diplomasList });
  } catch (error) {
    res.status(500).send('An error occured while get diplomas.');
  }
}