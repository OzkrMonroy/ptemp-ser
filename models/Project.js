const moongose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  demoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  codeUrl: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: Array,
    required: true
  }
});

module.exports = moongose.model('Project', ProjectSchema);