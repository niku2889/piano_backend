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
    app.get('/api/piano/orders', function (req, res) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("select distinct f.codice_risorsa , o.codice_ordine , o.codice_parte, o.priorita_ordine from ordini_fasi f, odl o where f.codice_ordine = o.codice_ordine")
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
    app.get('/api/piano/orders/:Id', function (req, res) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("select distinct f.codice_risorsa , o.codice_ordine , o.codice_parte, o.priorita_ordine from ordini_fasi f, odl o where f.codice_ordine = o.codice_ordine and o.tipo <= 5 and f.codice_risorsa ='" + req.params.Id +"'")
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
    app.put('/api/piano/orders/:Id', function (req, res) {
        new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request().query("update ODL set PRIORITA_ORDINE = " + req.body.PRIORITA_ORDINE + "where CODICE_ORDINE = '" + req.body.CODICE_ORDINE + "'")
        }).then(result => {
            let rows = result.recordset
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(true);
            sql.close();
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order."
            });
            sql.close();
        });
    })

}