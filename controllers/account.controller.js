import Account from '../models/account.model';
import logger from '../core/logger/app-logger';

const accountController = {};

accountController.withdraw = async (req, res) => {
  const { username, amount } = req.body;
  try {
    const account = await Account.findOne({ username });

    if (!account) {
      logger.error('Account not found');
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.balance < amount) {
      logger.error('Insufficient balance');
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    account.balance -= amount;
    account.withdrawsCount += 1;
    await account.save();

    logger.info(`Withdraw successful. New balance: ${account.balance}`);
    return res.json({ message: 'Withdraw successful', newBalance: account.balance });
  } catch (err) {
    logger.error('Error in withdrawing money:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

accountController.deposit = async (req, res) => {
  const { username, amount } = req.body;
  try {
    const account = await Account.findOne({ username });

    if (!account) {
      logger.error('Account not found');
      return res.status(404).json({ error: 'Account not found' });
    }

    account.balance += amount;
    await account.save();

    logger.info(`Deposit successful. New balance: ${account.balance}`);
    return res.json({ message: 'Deposit successful', newBalance: account.balance });
  } catch (err) {
    logger.error('Error in depositing money:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export default accountController;
