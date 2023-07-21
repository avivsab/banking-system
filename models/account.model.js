import mongoose from 'mongoose';

const AccountSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  balance: { type: Number, default: 1000 },
  lastLoanDate: { type: Date },
  withdrawsCount: { type: Number, default: 0 },
  transformationsCount: { type: Number, default: 0 },
  accountLevel: { type: String, enum: ['Basic', 'Silver', 'Gold'], default: 'Basic' },
});

const Account = mongoose.model('Account', AccountSchema);

export default Account;
