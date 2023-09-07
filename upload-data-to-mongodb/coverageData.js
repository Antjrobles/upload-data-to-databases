
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const { Morgan } = require('morgan');
const { Server } = require('http');



const uri = "mongodb+srv://antjrobles:fDaNG49AGuqMD87X@cluster0.yv30qwl.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'API-boilerplate-coverageData';
const dbCollection = 'countries';


// Parse the coverage data
const jsonData = fs.readFileSync('coverage.json', 'utf8');
const data = JSON.parse(jsonData);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});  

// PING & Test connection to MongoDB 
async function ConnectToMongoDB() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("antjrobles").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// ConnectToMongoDB().catch(console.dir);



async function insertData() {

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(dbCollection);

    // Inserta los datos en la colección
    const result = await collection.insertMany(data);

    console.log('Datos insertados exitosamente:', result.insertedCount);
  } finally {
    client.close();
  }
}
// Llama a la función para insertar los datos
insertData().catch(console.error);
