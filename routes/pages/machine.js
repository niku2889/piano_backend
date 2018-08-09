module.exports = (app) => {
    const machine = require('../../controllers/machine.controller.js');

    // Create a new Records
    app.post('/api/piano/machines', machine.create);

    // Retrieve all Records
    app.get('/api/piano/machines', machine.findAll);

    // Retrieve a single Records with Id
    app.get('/api/piano/machines/:Id', machine.findOne);

    // Update a Records with Id
    app.put('/api/piano/machines/:Id', machine.update);

    // Delete a Records with Id
    app.delete('/api/piano/machines/:Id', machine.delete);
}