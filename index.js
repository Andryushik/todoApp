import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';
import { addCollections } from './setup.js';

dotenv.config();

const mongoUrl = process.env.MONGODB_URL;

async function main() {
  if (mongoUrl == null) {
    throw Error(`You did not set up the environment variables correctly.`);
  }
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  const clientToDo = client.db('todoApp').collection('todoData');

  try {
    await client.connect();
    console.log('Connected to databaseWeek4');
    //

    //
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
    console.log('Connection closed');
  }
}

async function populationOfCountry(client, country) {
  const agg = [];

  const populationList = await client
    .db('databaseWeek4')
    .collection('population')
    .aggregate(agg)
    .toArray();
  console.log(populationList);
}

main();
