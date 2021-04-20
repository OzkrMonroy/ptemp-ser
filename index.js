const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

const app = express();
connectToDB();
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor running on Port ${PORT}`);
});