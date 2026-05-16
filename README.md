# TA eIFU Portal

Production-ready electronic Instructions for Use (eIFU) portal for TA Dental Implants.

The project includes:

- React + Vite frontend
- Express backend API
- Microsoft SQL Server product database
- Gemini-powered UI translation
- Country-specific current IFU document selection
- Archived IFU document listing
- REF, UDI/GTIN, and product-name search

## Project Structure

```text
ta-eifu-portal/
├── backend/                  Express API, MSSQL connection, IFU catalogs
├── public/                   Static frontend assets served by Vite
│   ├── archive/              Archived IFU PDFs exposed to the portal
│   └── label-guides/         REF / UDI label guide images
├── src/                      React frontend source
├── archiv/                   Source archive PDFs kept for handover/reference
├── ref udi/                  Source REF / UDI label images kept for handover/reference
├── seed.sql                  Base SQL seed
├── seed_full.sql             Full MSSQL seed for production handoff
├── package.json              Frontend/root scripts
└── vite.config.js            Frontend dev server and API proxy config
```

Generated folders such as `node_modules/` and `dist/` are ignored by Git.

## Requirements

- Node.js 18 or newer
- npm
- Microsoft SQL Server
- `sqlcmd` or another SQL Server client
- Gemini API key

## Environment

Backend environment variables are loaded from:

```text
backend/.env
```

Create it from the example:

```bash
cp backend/.env.example backend/.env
```

Required backend environment variables:

```env
PORT=5090

DB_SERVER=127.0.0.1
DB_PORT=1433
DB_DATABASE=TA_EIFU_DB
DB_USER=sa
DB_PASSWORD=YOUR_PASSWORD

GEMINI_API_KEY=YOUR_KEY
```

`DB_NAME` is still supported as a legacy fallback, but new deployments should use `DB_DATABASE`.

By default, the frontend calls the backend through relative `/api` URLs. This is the recommended production setup for a subdomain such as:

```text
https://eifu.your-domain.com
```

In that setup no public port is required in the browser URL. A reverse proxy or hosting platform can forward traffic to the internal Node.js process.

For split deployments where the backend is on a different domain, set this before building:

```env
VITE_API_BASE_URL=https://your-backend-domain.example
```

If `VITE_API_BASE_URL` is not set, the frontend uses same-origin `/api` requests.

## MSSQL Setup

Create the database in SQL Server:

```sql
CREATE DATABASE TA_EIFU_DB;
```

Run the full seed:

```bash
sqlcmd -S 127.0.0.1,1433 -U sa -P "YOUR_PASSWORD" -d TA_EIFU_DB -i seed_full.sql
```

If the product taxonomy needs to be refreshed from the source JSON and backend mapping:

```bash
cd backend
node seedProducts.js
```

## Installation

Install root/frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

## Local Development

Start the backend API on port `5090`:

```bash
cd backend
npm run dev
```

Or from the project root:

```bash
npm run backend
```

Start the frontend on port `5190`:

```bash
npm run dev
```

Open:

```text
http://localhost:5190/
```

Useful checks:

```bash
curl http://localhost:5090/api/translate/test
curl "http://localhost:5090/api/products?search=2013310A"
curl "http://localhost:5090/api/products?search=%2BEAMG2013310A1%2F%24"
```

## Build

Create a production frontend build:

```bash
npm run build
```

The production output is written to:

```text
dist/
```

The backend can serve this `dist/` folder directly after the build.

Preview the built frontend locally:

```bash
npm run preview
```

## Backend Production Run

Build the frontend first:

```bash
npm run build
```

From the `backend/` directory:

```bash
npm run start
```

From the project root:

```bash
npm run start
```

Build and start in one command:

```bash
npm run serve
```

Recommended process manager example:

```bash
pm2 start backend/server.js --name ta-eifu-backend
```

## Deploy Notes

1. Point the subdomain DNS record to the server.
2. Clone the repository on the server.
3. Install root and backend dependencies.
4. Create `backend/.env` from `backend/.env.example`.
5. Create `TA_EIFU_DB` in SQL Server.
6. Run `seed_full.sql`.
7. Run `npm run build`.
8. Run the backend with `npm run start` or a process manager.
9. Configure the reverse proxy to forward the subdomain to the internal Node.js port.

The Express backend serves both:

- `/api/*` backend routes
- the built React app from `dist/`

Example Nginx shape:

```nginx
server {
  server_name eifu.your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:5090;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Alternative static-host shape if you want Nginx to serve `dist/` itself:

```nginx
location / {
  try_files $uri /index.html;
}

location /api/ {
  proxy_pass http://127.0.0.1:5090/api/;
}
```

## Vercel Deploy

The project is Vercel-ready:

- `vercel.json` builds the Vite frontend into `dist/`.
- `api/[...path].js` exposes the Express backend routes as Vercel serverless functions.
- Frontend API calls use same-origin `/api` by default.
- Current and archived IFU PDFs are served from `public/`.

To deploy on Vercel:

1. Push this repository to GitHub.
2. In Vercel, choose `Add New Project`.
3. Import `hltsngl91/ta-eifu-portal`.
4. Use the default framework detection or set:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Add these environment variables in Vercel Project Settings:

```env
DB_SERVER=YOUR_SQL_SERVER_HOST
DB_PORT=1433
DB_DATABASE=TA_EIFU_DB
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
GEMINI_API_KEY=YOUR_GEMINI_KEY
```

6. Deploy.

Important: the MSSQL server must be reachable from Vercel serverless functions. For production, use a cloud SQL Server or allow Vercel outbound access to the database host.

## Ports

- Frontend dev server: `5190`
- Backend API/local production server: `5090` by default, or the platform-provided `PORT`

Production users should access the project through the subdomain without typing a port:

```text
https://eifu.your-domain.com
```

`vite.config.js` uses `strictPort: true`, so the frontend will fail instead of silently moving to another port if `5190` is occupied.

## Git and Secrets

The repository ignores:

- `node_modules/`
- `dist/`
- `.env`
- `backend/.env`
- `.DS_Store`

Commit `backend/.env.example`, but never commit real `.env` files, database passwords, or Gemini API keys.
