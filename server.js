import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger.js'
import morgan from 'morgan'
import config from './core/config/config.dev.js'
import users from './routes/users.route.js'
import account from './routes/account.route.js'
import connectToDb from './db/connect.js'

const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.use('/users', users);
app.use('/account', account);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});

app.listen(port, () => {
    logger.info('server started - ', port);
});