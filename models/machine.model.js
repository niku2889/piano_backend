const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const machineSchema = new Schema({
    CODICE_RISORSA: Schema.Types.String,
    DESCRIZIONE: Schema.Types.String
});

module.exports = mongoose.model('machine', machineSchema);