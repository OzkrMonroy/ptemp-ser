const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const diplomasRouter = require('./routes/diplomas');
const portfolioRouter = require('./routes/portfolio');

const app = express();
connectToDB();
app.use(cors());

const port = process.env.port || 4000;

app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/diplomas', diplomasRouter);
app.use('/portfolio', portfolioRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on Port ${port}`);
});