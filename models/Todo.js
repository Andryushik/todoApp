import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', schema);

export { Todo };
