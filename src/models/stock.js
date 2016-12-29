const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const StockSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: mongoose.Types.Currency, required: true },
  dateAvailable: { type: String, required: true },
  taxable: { type: Boolean, required: true },
});

module.exports = mongoose.model('Stock', StockSchema);
