import jwt from 'jsonwebtoken';
import config from '../core/config/config.dev';
import logger from '../core/logger/app-logger';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      logger.error('No token provided');
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        logger.error('Failed to authenticate token:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      req.user = decoded.user;
      next();
    });
  } catch (err) {
    logger.error('Error in authentication:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Middleware to check if the user is authorized based on account level
export const isAuthorized = (req, res, next) => {
  try {
    // Get the user account from the request object
    const account = req.user;

    // Implement account-level checks here based on the instructions
    // Example: Check if the user's account level is eligible for certain operations

    next();
  } catch (err) {
    logger.error('Error in authorization:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
