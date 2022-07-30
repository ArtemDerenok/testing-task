import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
const jsonParser = bodyParser.json()

const app = express();

app.use(cors());

app.post("/form", jsonParser, (request, response) => {
  if (request.body.name && request.body.email && request.body.phoneNumber && request.body.birthday) {
    response.send(JSON.stringify({status: 'success'}))
  } else {
    response.send(JSON.stringify({status: 'error'}))
  }
})

app.listen(3500, () => console.log('Running on port 3500'));
