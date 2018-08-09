module.exports = (app) => {
    const orders = require('../../controllers/order.controller.js');

    // Create a new Records
    app.post('/api/piano/orders', orders.create);

    // Retrieve all Records
    app.get('/api/piano/orders', orders.findAll);

    // Retrieve a single Records with Id
    app.get('/api/piano/orders/:Id', orders.findOne);

    // Update a Records with Id
    app.put('/api/piano/orders/:Id', orders.update);

    // Delete a Records with Id
    app.delete('/api/piano/orders/:Id', orders.delete);
}