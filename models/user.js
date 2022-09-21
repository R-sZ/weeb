const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kode: {
        type: String,
        required: true
    },
    mapel: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('User', userSchema)