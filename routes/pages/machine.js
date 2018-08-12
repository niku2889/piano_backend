const sql = require('mssql');
const sqlConfig = {
    user: 'nicim',
    password: 'nicim',
    server: 'PROMETEUS-TEMPL\\SQLEXPRESS',
    database: 'NICIM',
    port: 1433
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(res);
                }
            });
        }
    });
}

module.exports = (app) => {
    const machine = require('../../controllers/machine.controller.js');

    // Create a new Records
    app.post('/api/piano/machines', machine.create);

    // Retrieve all Records
    app.get('/api/piano/machines', function (req, res) {
        //sql.connect(sqlConfig, function (err) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("select * from RISORSE")
        }).then(result => {
            let rows = result.recordset
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order."
            });
            sql.close();
        });
    })

    // Retrieve a single Records with Id
    app.get('/api/piano/machines/:Id', function (req, res) {
        //sql.connect(sqlConfig, function (err) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("select * from RISORSE where CODICE_RISO = " + req.params.Id)
        }).then(result => {
            let rows = result.recordset
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order."
            });
            sql.close();
        });
    })

    // Update a Records with Id
    app.put('/api/piano/machines/:Id', machine.update);

    // Delete a Records with Id
    app.delete('/api/piano/machines/:Id', machine.delete);
}