const express = require("express");
const app = express();
const { engine } = require('express-handlebars')
const mysql = require("mysql")
const session = require('express-session')
const bodyParser = require("body-parser")
require("dotenv").config()
const port = process.env.PORT || 5000
const loginRoutes = require('./routes/login')
const conn = require('./coneccion/db')


conn.connect(function (err) {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }

    console.log('Conexión a la base de datos establecida');
});


// app.get('/tienda', (req, res) => {
//     const query = 'SELECT product, price FROM tienda';

//     conn.query(query, (err, rows) => {
//         if (err) {
//             console.error('Error executing query: ', err);
//             res.status(500).send('Internal server error');
//         } else {
//             console.log('Query executed successfully');
//             console.log(rows);
//             res.render('login/tienda', { products: rows });
//         }
//     });
// });


app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', __dirname + '/views')
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')


app.listen(port, () => { console.log("server runing in port 5000"); })


app.use('/', loginRoutes)

app.get('/', (req, res) => {
    res.render('home')
})

