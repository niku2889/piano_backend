const sql = require('mssql');
const sqlConfig = {
    user: 'sa',
    password: 'admin123',
    server: 'LENOVO-PC\\SQLEXPRESS',
    database: 'NICIM',
    port: 1433,
    options: {
        encrypt: false
    }
};

module.exports = (app) => {

    // Retrieve all Records
    app.get('/api/piano/machines', function (req, res) {
        //sql.connect(sqlConfig, function (err) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("select CODICE_RISORSA,DESCRIZIONE from RISORSE")
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
            return pool.request().query("select CODICE_RISORSA,DESCRIZIONE from RISORSE where CODICE_RISO = " + req.params.Id)
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

}