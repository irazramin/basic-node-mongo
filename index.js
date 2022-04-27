const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(express.json());
app.use(cors());

// user : practiceUser1
// pass : 7dUiyPQE6okWO9qi

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjpmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    await client.connect();
    const userCollection = client.db('userDb').collection('useCollections'); 
  try {
    
    app.get('/user',async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post('/user',async(req,res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result)
    });
    
    app.delete('/user/:id', async(req,res) =>{
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })
  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log('server is running');
});
