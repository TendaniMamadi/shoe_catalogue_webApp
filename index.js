import express from 'express';
import {engine} from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
//import route from './route/routes.js';
import db_queries from './services/db_queries.js';
import shoe_catalogue from './API/shoe_catalogue_API.js'
import cors from 'cors'
import axios from 'axios';




const app = express();
const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);
const backendInstance = db_queries(db);
const API_Instance = shoe_catalogue(backendInstance);
//const routeInstance = route(API_Instance);



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
app.get('/', async (req, res) => {
    try {
      const items = await db.any('SELECT * FROM shoes');
      res.render('index', { items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// app.get("/shoes", API_Instance.showAllShoes);
// app.get('/api/shoes/brand/:brandname', API_Instance.filterShoeByBrandName);
// app.get('/api/shoes/size/:size', API_Instance.filterShoesBySize);
// app.get('/api/shoes/color/:color', API_Instance.filterShoeColors);
// app.get('/api/shoes/brand/:brandname/size/:size',API_Instance.filterShoeByBrandNameAndSize);


// app.post('/api/shoes/sold/:id',(req,res)=>{

// });
// app.post('/api/shoes',(req,res)=>{

// });

//API instances
app.get("/api/shoes", API_Instance.showAllShoes);
app.get('/api/shoes/brand/:brandname', API_Instance.filterShoeByBrandName);
app.get('/api/shoes/size/:size', API_Instance.filterShoesBySize);
app.get('/api/shoes/color/:color', API_Instance.filterShoeColors);
app.get('/api/shoes/brand/:brandname/size/:size',API_Instance.filterShoeByBrandNameAndSize);


// app.post('/api/shoes/sold/:id',(req,res)=>{

// });
// app.post('/api/shoes',(req,res)=>{

// });

//PORT
const PORT = process.env.PORT || 2026;
app.listen(PORT, (req,res) => {
    console.log('We running on port:',PORT);
});
