import express from 'express';
import { Todo } from '../models/Todo.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find({}).lean();
  console.log(todos);

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos,
  });
});

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true,
  });
});

router.post('/create', async (req, res) => {
  console.log(req.body.title);
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();
  res.redirect('/');
});

export default router;
