const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const orderSchema = new Schema({
    CODICE_RISORSA: Schema.Types.String,
    CODICE_ORDINE: Schema.Types.String,
    CODICE_PARTE: Schema.Types.String,
    PRIORITA_ORDINE: Schema.Types.Number
});

module.exports = mongoose.model('order', orderSchema);