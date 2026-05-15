# TA eIFU Portal

TA Dental Implants eIFU portal with a React/Vite frontend, Express backend, MSSQL product database, Gemini-powered UI translation, current IFU files, and IFU archive support.

## Requirements

- Node.js 18+
- npm
- Microsoft SQL Server
- Gemini API key

## Environment

Backend environment variables are loaded from `backend/.env`.

Create it from the example:

```bash
cp backend/.env.example backend/.env
```

Required variables:

```env
PORT=5090
DB_SERVER=127.0.0.1
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=CHANGE_ME
DB_NAME=TA_EIFU_DB
GEMINI_API_KEY=PUT_YOUR_GEMINI_API_KEY_HERE
```

For production frontend deployments where the API is not served from the same host, set this at build time:

```env
VITE_API_BASE_URL=https://your-api-domain.example
```

If `VITE_API_BASE_URL` is not set, the frontend uses `http://localhost:5090`.

## Local Development

Install frontend dependencies from the project root:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

Start the backend on port `5090`:

```bash
npm run backend
```

Start the frontend on port `5190`:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5190/
```

## Build

Create a production frontend build:

```bash
npm run build
```

The build output is written to `dist/`.

Preview the production build locally:

```bash
npm run preview
```

## Backend

Run the backend:

```bash
npm run backend
```

Health-style checks:

```bash
curl http://localhost:5090/api/translate/test
curl "http://localhost:5090/api/products?search=2013310A"
```

The backend reads `backend/.env`, connects to MSSQL, exposes `/api/*` routes, and logs only whether the Gemini key is loaded. Do not commit real `.env` files.

## MSSQL Seed

Create the database first:

```sql
CREATE DATABASE TA_EIFU_DB;
```

Run the base SQL seed if needed:

```bash
sqlcmd -S 127.0.0.1,1433 -U sa -P "YOUR_PASSWORD" -d TA_EIFU_DB -i seed.sql
```

Run the full SQL seed if needed:

```bash
sqlcmd -S 127.0.0.1,1433 -U sa -P "YOUR_PASSWORD" -d TA_EIFU_DB -i seed_full.sql
```

To seed or refresh product rows from `src/data/products.json` using the backend taxonomy mapping:

```bash
cd backend
node seedProducts.js
```

## Server Deploy

1. Clone the repository on the server.
2. Create `backend/.env` from `backend/.env.example`.
3. Install dependencies:

```bash
npm install
cd backend
npm install
cd ..
```

4. Build frontend:

```bash
npm run build
```

5. Serve `dist/` with a static web server such as Nginx, Caddy, or a hosting platform.
6. Run the backend with a process manager:

```bash
PORT=5090 node backend/server.js
```

Recommended process manager example:

```bash
pm2 start backend/server.js --name ta-eifu-backend
```

7. Proxy `/api` from the public frontend domain to the backend, or build the frontend with `VITE_API_BASE_URL` pointing to the backend URL.

## Important Files

- `backend/server.js` - Express API entrypoint
- `backend/db.js` - MSSQL connection
- `backend/routes/products.js` - product, REF, UDI/GTIN search
- `backend/routes/translate.js` - Gemini translation endpoint
- `backend/routes/ifu.js` - current and archived IFU documents
- `backend/ifuCatalog.js` - current IFU mapping
- `backend/ifuArchiveCatalog.js` - archived IFU mapping
- `src/components/EifuPortal.jsx` - IFU search UI
- `src/contexts/TranslationContext.jsx` - frontend translation cache and helpers

## Git Hygiene

The repository ignores:

- `node_modules/`
- `dist/`
- `.env`
- `.DS_Store`

Commit `backend/.env.example`, but never commit real credentials or API keys.
