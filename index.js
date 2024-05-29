import express from "express";
import fs from 'fs';
import {format} from 'date-fns';
import path from 'path';

const app=express();
const port=4000;

app.use(express.json());

app.get('/',(req,res)=>{
    let today=format(new Date(),'dd-mm-yyyy-HH-MM-SS')
    //console.log(today);
    const filepath = `Timestamp/${today}.txt`

    fs.writeFileSync(filepath,`${today}`,'utf8')
    let data = fs.readFileSync(filepath,'utf8')
    res.status(200).send(data)
})

app.get('/gettextfiles',(req,res)=>{
    const folderPath='Timestamp';

    fs.readdir(folderPath,(err,files)=>{
        if(err){
            console.log(err)
            res.status(500).send('An error occurred while listing the diles from directory');
        }else{
            const textFiles = files.filter((file)=>path.extname(file)==='.txt');
            res.status(200).json(textFiles);
        }
    })

})


app.listen(port,()=>{
    console.log("App is running on the port",port)
})