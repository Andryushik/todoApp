import express from 'express';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as todoRoutes } from './routes/todos.js';
mongoose.set('strictQuery', true);
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URL;
const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);

async function start() {
  if (mongoUrl == null) {
    throw Error(`You did not set up the environment variables correctly.`);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to todoApp database');

    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
    //

    //
  } catch (err) {
    console.error(err);
  }
  //finally {
  // client.close();
  // console.log('Connection closed');
  //}
}

start();
