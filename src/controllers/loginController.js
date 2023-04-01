const bcrypt = require('bcrypt')
const mysql = require('mysql')
const conn = require('../coneccion/db')

const login = (req, res) => {
    res.render('login/index')
}

const register = (req, res) => {
    res.render('login/register')
}

const storeUser = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    let passwordHash = await bcrypt.hash(password, 8);

    conn.query('INSERT INTO usuarios SET ?', { nombre: name, email, password: passwordHash }, async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
}

const auth = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let passwordHash = await bcrypt.hash(password, 8);
    if (email && password) {
        conn.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
            if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
                res.send('CORREO O CONTRASEÑA INCORRECTAS')
            } else {

                const query = 'SELECT product, price FROM tienda';

                conn.query(query, (err, rows) => {
                    if (err) {
                        console.error('Error executing query: ', err);
                        res.status(500).send('Internal server error');
                    } else {
                        console.log('Query executed successfully');
                        console.log(rows);
                        res.render('login/tienda', { products: rows });
                    }
                });
            }
        })
    }
}

const filtrado = (req, res) => {

    const price = req.query.price;
    const product = req.query.product;

    let query = 'SELECT * FROM tienda WHERE 1=1';
    const queryParams = [];

    if (price) {
        query += ' AND price = ?';
        queryParams.push(price);
    }

    if (product) {
        query += ' AND product LIKE ?';
        queryParams.push(`%${product}%`);
    }

    conn.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error en la consulta SQL');
        } else {
            res.render('login/tienda', { productos: results });
        }
    });
}



module.exports = {
    register,
    login,
    storeUser,
    auth,
    filtrado,
    
}

