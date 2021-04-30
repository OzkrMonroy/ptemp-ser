const User = require('../models/User');
const Projects = require('../models/Project');
const Diplomas = require('../models/Diploma');

exports.getPortfolioData = async (req, res) => {
  try {
    const user = await User.find();
    const projects = await Projects.find().sort({ createdAt: -1 });
    const diplomas = await Diplomas.find();

    res.status(200).json({
      user,
      projects,
      diplomas
    })
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}