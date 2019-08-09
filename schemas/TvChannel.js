const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvChannelsSchema = new Schema({
    name: {type: String},
    namePath: {type: String}
});
module.exports = tvchannels = mongoose.model('tvchannels', TvChannelsSchema);