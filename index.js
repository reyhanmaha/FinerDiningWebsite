import express from "express";
import bodyParser from "body-parser";
import path from "path";
import axios from "axios";
import pg from "pg";
import csvParser from "csv-parser";
import fs from "fs";
import { info } from "console";
/*
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Books",
  password: "postgres123",
  port: 5432,
});

db.connect();
*/

const port=3000;
const app=express();
let data=[];
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index.html");
});

app.get("/FineDiningMenu",(req,res)=>{
    res.render("menu");
});

app.get("/FineDiningAboutUs",(req,res)=>{
    res.render("FinerDiningAboutUs");
});

app.post("/FineDiningOptions",(req,res)=>{
    let drinkData=[];
    if(req.body['drink']){
        fs.createReadStream('./public/dataFiles/finerDiningDrinksData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            let item=row;
            //console.log(row); // Process each row
            drinkData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(drinkData);
            res.render("menuOptions",{data:drinkData,type:"drink"});
    });
        
    }
    if(req.body['food']){
        let foodData=[];
        fs.createReadStream('./public/dataFiles/finerDiningFoodData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            foodData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(foodData);
            res.render("menuOptions",{data:foodData,type:"food"});
    });
    }
    if(req.body['sweets']){
        let foodData=[];
        fs.createReadStream('./public/dataFiles/finerDiningFoodData.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            foodData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            console.log(foodData);
            res.render("menuOptions",{data:foodData,type:"dessert"});
    });
    }

    //res.render("menuOptions");
});

app.get("/FineDiningCareers",(req,res)=>{
    let jobsData=[];
    fs.createReadStream('./public/dataFiles/finerDiningCareers.csv') // Path to your CSV file
        .pipe(csvParser())
        .on('data', (row) => {
            
            //console.log(row); // Process each row
            jobsData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
            //console.log(foodData);
            res.render("FinerDiningCareers",{data:jobsData});
    });
   
});

app.post("/FineDiningCareers",(req,res)=>{
    
   res.redirect("/")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });