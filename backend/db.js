import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });

const databaseName = process.env.DB_DATABASE || process.env.DB_NAME || 'TA_EIFU_DB';

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '127.0.0.1',
  port: Number(process.env.DB_PORT || 1433),
  database: databaseName,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const validateDbConfig = () => {
  const missingVariables = [];
  if (!dbConfig.user) missingVariables.push('DB_USER');
  if (!dbConfig.password) missingVariables.push('DB_PASSWORD');
  if (!dbConfig.database) missingVariables.push('DB_DATABASE');

  if (missingVariables.length > 0) {
    throw new Error(`Missing required database environment variables: ${missingVariables.join(', ')}`);
  }
};

let activePoolPromise = null;

const getPool = () => {
  if (!activePoolPromise) {
    validateDbConfig();
    activePoolPromise = new sql.ConnectionPool(dbConfig)
      .connect()
      .then((pool) => {
        console.info(`Connected to MSSQL - ${databaseName}`);
        return pool;
      })
      .catch((err) => {
        activePoolPromise = null;
        console.error('Database Connection Failed:', err.message);
        throw err;
      });
  }

  return activePoolPromise;
};

const poolPromise = {
  then: (onFulfilled, onRejected) => getPool().then(onFulfilled, onRejected),
  catch: (onRejected) => getPool().catch(onRejected),
  finally: (onFinally) => getPool().finally(onFinally),
};

export { sql, poolPromise, getPool };
