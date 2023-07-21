import express from 'express';
import accountController from '../controllers/account.controller';
import { isAuthenticated, isAuthorized } from '../middleware/auth';

const router = express.Router();

// Withdraw route
router.post('/withdraw', isAuthenticated, async (req, res) => {
  await accountController.withdraw(req, res);
});

// Deposit route
router.post('/deposit', isAuthenticated, async (req, res) => {
  await accountController.deposit(req, res);
});

// Transfer money route
router.post('/transfer', isAuthenticated, async (req, res) => {
  await accountController.transfer(req, res);
});

// Loan route
router.post('/loan', isAuthenticated, isAuthorized, async (req, res) => {
  await accountController.loan(req, res);
});

// Return loan route (to the bank)
router.post('/returnLoan', isAuthenticated, isAuthorized, async (req, res) => {
  await accountController.returnLoan(req, res);
});

export default router;
