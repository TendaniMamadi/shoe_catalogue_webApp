import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import route from './route/routes.js';
import db_queries from './services/db_queries.js';
import shoe_catalogue from './API/shoe_catalogue.js'
import cors from 'cors'
import axios from 'axios';




const app = express();
const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);
const backendInstance = db_queries(db);
const API_Instance = shoe_catalogue(backendInstance);
const routeInstance = route(API_Instance);



app.engine('handlebars',engine({
    layoutsDir:'./views/layouts'
}));

app.use(session({
    secret: "shoe_catalogue",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

//Routes
app.get('/',(req,res)=>{
    res.render('index');
});

app.get("/api/shoes", routeInstance.allShoes);
app.get('/api/shoes/brand/:brandname', routeInstance.allShoeBrandName);
app.get('/api/shoes/size/:size', routeInstance.allSizes);
app.get('/api/shoes/color/:color', routeInstance.allShoeColors);
app.get('/api/shoes/brand/:brandname/size/:size',routeInstance.allShoeBrandNameAndSize);


// app.post('/api/shoes/sold/:id',(req,res)=>{

// });
// app.post('/api/shoes',(req,res)=>{

// });

//PORT
const PORT = process.env.PORT || 2026;
app.listen(PORT, (req,res) => {
    console.log('We running on port:',PORT);
});
