import express from 'express';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import db_queries from './services/db_queries.js';
import shoe_catalogue from './API/shoe_catalogue_API.js'
import cors from 'cors'




const app = express();
const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise({});
const db = pgp(connectionString);
const backendInstance = db_queries(db);
const API_Instance = shoe_catalogue(backendInstance);


app.use(session({
    secret: "shoe_catalogue",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


//API instances
app.get("/api/shoes", API_Instance.showAllShoes);
app.get('/api/shoes/brand/:brandname', API_Instance.filterShoeByBrandName);
app.get('/api/shoes/size/:size', API_Instance.filterShoesBySize);
app.get('/api/shoes/color/:color', API_Instance.filterShoeColors);
app.get('/api/shoes/brand/:brandname/size/:size', API_Instance.filterShoeByBrandNameAndSize);
app.post('/api/shoes/sold/:id',API_Instance.sold_shoes);
app.post('/api/shoes',API_Instance.insert);

//PORT
const PORT = process.env.PORT || 2026;
app.listen(PORT, (req, res) => {
    console.log('We running on port:', PORT);
});
