import express from "express";
import {read} from './jsonFileStorage.js'

const app = express();
const port = 3004;

app.listen(port,console.log(`Listening on port ${port}`))

app.get('/recipe/:index',(req,res)=>{
read("data.json",(err,jsonContentObj)=>{
  console.log(jsonContentObj.recipes.length)
  if(req.params.index >= jsonContentObj.recipes.length){
    res.status(404).send('Not found!')
    console.error('Not Found!',err)
  }
  res.send(jsonContentObj.recipes[req.params.index])
})
})