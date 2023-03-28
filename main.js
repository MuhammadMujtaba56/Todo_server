const express= require('express')
const fs=require('fs').promises
const bodyParser = require('body-parser')
const cors=require('cors')

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',async (req,res)=>{
   try{
    const file=await fs.readFile('list.json','utf-8')
    let data=file.length >0? JSON.parse(file):'' 
    res.status(200).json({
        data:data
    })
   }catch(err){
    console.log(err)
    res.status(500).json({
        message:"Error while Fetching Data"
    })
   }
})

app.post('/',async (req,res)=>{
   try{
    const body=req.body 
    let file=await fs.readFile('list.json','utf-8')
    let data=file.length >0? JSON.parse(file):[]
    data=JSON.parse(file)
    data.push(body)

    await fs.writeFile('list.json',JSON.stringify(data))
    file=await fs.readFile('list.json','utf-8')
    
    res.status(200).json({
        data:file
    })
   }catch(err){
    console.log(err)
    res.status(500).json({
        message:"Error while "
    })
   }
})



app.listen(3000)
console.log("at port 3000")