const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const UserSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = User = mongoose.model('user', UserSchema);