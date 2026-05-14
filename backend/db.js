import sql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), quiet: true });

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'StrongPass123!',
  server: process.env.DB_SERVER || '127.0.0.1',
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_NAME || 'TA_EIFU_DB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let activePoolPromise = null;

const getPool = () => {
  if (!activePoolPromise) {
    activePoolPromise = new sql.ConnectionPool(dbConfig)
      .connect()
      .then((pool) => {
        console.log('Connected to MSSQL - TA_EIFU_DB');
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
