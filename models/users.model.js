import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['Basic', 'Silver', 'Gold'], default: 'Basic' },
  balance: { type: Number, default: 1000 },
  loanAmount: { type: Number, default: 0 },
  loanTimestamp: { type: Date, default: null },
  loanPaid: { type: Boolean, default: false },
  withdrawsCount: { type: Number, default: 0 },
  transformationsCount: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
