const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
id:{
    type: Number, required: true, unique: true
},
topic:{
    type: String
},
year:{
    type: Number
},
quote:{
    type: String
}
});
module.exports = mongoose.model('Quote', quoteSchema);