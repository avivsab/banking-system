import path from "path";
import { generateKey } from "../../utils/auth.utils";
let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'banking-system';
config.secretKey = generateKey();
config.serverPort = process.env.serverPort || 2000;
 
export default config;