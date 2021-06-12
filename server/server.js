import path from 'path'
import express from 'express'
import colors from 'colors'
import { MongoClient } from 'mongodb'
import template from './../template'
//comment out before building for production
import devBundle from './devBundle'

const app = express()
const NODE_ENV = process.env.NODE_ENV;
//comment out before building for production
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200).send(template())
})

let port = process.env.PORT || 3000
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err.red)
  }

  console.info(
    `The server is listening/started at - http://127.0.0.1:${port} in ${NODE_ENV} mode`
      .yellow
  );
})

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-users'
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, db)=>{
  console.log("Connected successfully to mongodb server".green)
  db.close()
})
