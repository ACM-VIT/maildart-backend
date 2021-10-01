const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Define the structure of User document here
 */
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);
