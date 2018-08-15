
//Library Imports
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let Logger = require('./services/logger');
//let fs = require('fs');
let mongoose = require('mongoose');
const cors = require('cors');
//const sql = require("msnodesqlv8");

// const connectionString = "server=LENOVO-PC\\SQLEXPRESS;Database=College_DB_New;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
// const query = "select * from Students";
// const sql = require('mssql');
// const  sqlConfig = {
//     user: 'sa',
//     password: 'admin123',
//     server: 'LENOVO-PC\\SQLEXPRESS',  
//     database: 'NICIM',
//     port: 1433
//   };
//Variable Configurations
//let dbURL = process.env.COSMOSDB_URL || 'mongodb://127.0.0.1:27017/sportscentrum';
//let dbURL = 'mongodb+srv://niku2889:niku2889@cluster0-tg6ei.mongodb.net/test?retryWrites=true';
// let dbURL = 'mongodb://niku2889:niku2889lee@ds217452.mlab.com:17452/pianodb';
// const models = path.join(__dirname, 'models');

// //Model Bootstrapping
// fs.readdirSync(models).forEach(file => require(path.join(models, file)));

let app = express();

app.use(Logger.morgan);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//CORS
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', ' Authorization'],
    credentials: true
}));


//Routes Config
let index = require('./routes/index');

require('./routes/pages/order.js')(app);
require('./routes/pages/machine.js')(app);
app.use('/', index);


app.use(express.static(path.join(__dirname, 'upload')));
module.exports = app;
