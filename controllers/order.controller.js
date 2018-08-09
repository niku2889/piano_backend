const Orders = require('../models/order.model.js');

// Create and Save a new order 
exports.create = (req, res) => {
    //Validate request
    if (!req.body.CODICE_RISORSA) {
        return res.status(400).send({
            message: "CODICE_RISORSA content can not be empty"
        });
    } else if (!req.body.CODICE_ORDINE) {
        return res.status(400).send({
            message: "CODICE_ORDINE content can not be empty"
        });
    } else if (!req.body.CODICE_PARTE) {
        return res.status(400).send({
            message: "CODICE_PARTE content can not be empty"
        });
    } else if (!req.body.PRIORITA_ORDINE) {
        return res.status(400).send({
            message: "PRIORITA_ORDINE content can not be empty"
        });
    }

    const orders = new Orders({
        CODICE_RISORSA: req.body.CODICE_RISORSA,
        CODICE_ORDINE: req.body.CODICE_ORDINE,
        CODICE_PARTE: req.body.CODICE_PARTE,
        PRIORITA_ORDINE: req.body.PRIORITA_ORDINE
    });

    // Save Order in the database
    orders.save()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Orders.find()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order."
            });
        });
}

// Find a single order with a Id
exports.findOne = (req, res) => {
    Orders.findById(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Order with id " + req.params.Id
            });
        });
};

// Update a order identified by the Id in the request
exports.update = (req, res) => {
    //Validate request
    if (!req.body.CODICE_RISORSA) {
        return res.status(400).send({
            message: "CODICE_RISORSA content can not be empty"
        });
    } else if (!req.body.CODICE_ORDINE) {
        return res.status(400).send({
            message: "CODICE_ORDINE content can not be empty"
        });
    } else if (!req.body.CODICE_PARTE) {
        return res.status(400).send({
            message: "CODICE_PARTE content can not be empty"
        });
    } else if (!req.body.PRIORITA_ORDINE) {
        return res.status(400).send({
            message: "PRIORITA_ORDINE content can not be empty"
        });
    }

    // Find order and update it with the request body
    Orders.findByIdAndUpdate(req.params.Id, {
        CODICE_RISORSA: req.body.CODICE_RISORSA,
        CODICE_ORDINE: req.body.CODICE_ORDINE,
        CODICE_PARTE: req.body.CODICE_PARTE,
        PRIORITA_ORDINE: req.body.PRIORITA_ORDINE
    }, { new: true })
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating Order with id " + req.params.Id
            });
        });
};

// Delete a order with the specified Id in the request
exports.delete = (req, res) => {
    Orders.findByIdAndRemove(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            res.send({ message: "Order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete Order with id " + req.params.Id
            });
        });
};