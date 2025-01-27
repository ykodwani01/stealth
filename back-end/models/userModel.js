const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email:{type: String, required: true, unique: true},
  password:{type:String, required: true}
});

// Pre-save hook to hash the password before saving

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);     // Hash the password using the generated salt
  next();
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword,this.password)
};

const User = mongoose.model('User', userSchema);
module.exports = User;