import User from '../models/users.model';
import logger from '../core/logger/app-logger';

const controller = {};

controller.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            logger.info(`User ${username} logged in successfully`);
            req.session.user = user;
            req.session.cookie.maxAge = 2 * 60 * 60 * 1000; // 2 hours
            res.send(user);
        } else {
            logger.error(`Login failed for user ${username}`);
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        logger.error('Error in login - ' + err);
        res.status(500).send('Internal Server Error');
    }
};

controller.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                logger.error('Error in logout - ' + err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Logout successful');
            }
        });
    } catch (err) {
        logger.error('Error in logout - ' + err);
        res.status(500).send('Internal Server Error');
    }
};

// testing
controller.createUser = async (req, res) => {
    const { username, password, accountType } = req.body;
    try {
        const newUser = new User({
            username,
            password,
            accountType,
            balance: 1000, // Set initial balance to 1000 Shekels
        });
        await newUser.save();
        logger.info('New user created successfully');
        res.send(newUser);
    } catch (err) {
        logger.error('Error creating user - ' + err);
        res.status(500).send('Internal Server Error');
    }
};

export default controller;
