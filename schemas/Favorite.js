const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema ({
    program: {type: Schema.Types.ObjectId, ref: 'program'}
});

module.exports = Favorite = mongoose.model ("favorite",FavoriteSchema);