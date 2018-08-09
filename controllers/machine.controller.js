const Machine = require('../models/machine.model.js');

// Create and Save a new Record 
exports.create = (req, res) => {
    //Validate request
    if (!req.body.CODICE_RISORSA) {
        return res.status(400).send({
            message: "CODICE_RISORSA content can not be empty"
        });
    } else if (!req.body.DESCRIZIONE) {
        return res.status(400).send({
            message: "DESCRIZIONE content can not be empty"
        });
    }

    const machine = new Machine({
        CODICE_RISORSA: req.body.CODICE_RISORSA,
        DESCRIZIONE: req.body.DESCRIZIONE
    });

    // Save Record in the database
    machine.save()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the machine."
            });
        });
};

// Retrieve and return all Records from the database.
exports.findAll = (req, res) => {
    Machine.find()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving machine."
            });
        });
}

// Find a single Record with a Id
exports.findOne = (req, res) => {
    Machine.findById(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Machine with id " + req.params.Id
            });
        });
};

// Update a Record identified by the Id in the request
exports.update = (req, res) => {
    //Validate request
    if (!req.body.CODICE_RISORSA) {
        return res.status(400).send({
            message: "CODICE_RISORSA content can not be empty"
        });
    } else if (!req.body.DESCRIZIONE) {
        return res.status(400).send({
            message: "DESCRIZIONE content can not be empty"
        });
    }

    // Find Record and update it with the request body
    Machine.findByIdAndUpdate(req.params.Id, {
        CODICE_RISORSA: req.body.CODICE_RISORSA,
        DESCRIZIONE: req.body.DESCRIZIONE
    }, { new: true })
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating Machine with id " + req.params.Id
            });
        });
};

// Delete a Record with the specified Id in the request
exports.delete = (req, res) => {
    Machine.findByIdAndRemove(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            res.send({ message: "Machine deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Machine not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete Machine with id " + req.params.Id
            });
        });
};