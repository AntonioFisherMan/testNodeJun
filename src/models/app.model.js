const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appSchema = new Schema({items: Array})

module.exports = mongoose.model("AppModel", appSchema)