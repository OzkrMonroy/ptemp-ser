const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  try {
    let project = await Project.findOne({ name });
    if(project){
      return res.status(400).json({ msg: 'A project with that name already exits.'});
    }

    project = new Project(req.body);
    await project.save();

    res.json(project);
  } catch (error) {
    console.log
  }
}

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.projectName = projectName;
  }

  try {
    let project = await Project.findById(req.params.id);

    if(!project){
      return res.status(404).json({ msg: 'Project doesn\'t exists.'});
    };
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error');
  };
};

exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if(!project){
      return res.status(400).json({ msg: 'Project doesn\'t exists.' });
    };

    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project has been deleted.'});
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Internal error.');
  }
}

exports.fetchAllProjects = async (req, res) => {
  try {
    const projectsList = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({projectsList});
  } catch (error) {
    res.status(500).send('An error occured while get projects');
  }
}