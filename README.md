# Curio

Curio is a topic-discovery app for curious minds. Follow interests across science, nature, history, psychology, space, technology, and culture—or use Surprise Me to find an unexpected detour. Save topics to revisit later.

## Features

- Search a curated catalogue of short, sourced topic introductions.
- Filter by subject area and explore beyond your selected interests.
- Choose private interests to rank relevant discoveries higher.
- Save and remove topics from a personal MongoDB-backed collection.
- Open each source for further reading.
- Register, sign in, and manage an account with JWT authentication.
- Responsive discovery feed, topic cards, and navigation.

## Technology

- React, Vite, React Router, JavaScript, and CSS
- Node.js, Express, and REST endpoints
- MongoDB and Mongoose
- JWT and bcryptjs authentication

## Project Structure

```text
25070521027/
├── client/
│   ├── src/
│   │   ├── components/       # Topic cards and interest controls
│   │   ├── context/          # Authentication state
│   │   ├── pages/            # Discovery, saved topics, auth, profile
│   │   ├── services/         # Shared API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
└── server/
    ├── config/               # MongoDB connection
    ├── controllers/          # Auth and topic handlers
    ├── data/                 # Curated topic catalogue
    ├── middleware/           # JWT protection
    ├── models/               # User and saved-topic schemas
    ├── routes/
    ├── .env.example
    └── server.js
```

The topic catalogue is curated app content served through the API. Personal interests and saved-topic records are stored in MongoDB per account.

## API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get the signed-in profile |
| PUT | `/api/auth/profile` | Update profile name |
| GET | `/api/topics` | Search and filter topic discoveries |
| PUT | `/api/topics/interests` | Save up to 20 interests |
| GET | `/api/topics/saved` | List the signed-in user's saved topics |
| POST | `/api/topics/saved/:slug` | Save a topic |
| DELETE | `/api/topics/saved/:slug` | Remove a saved topic |
| GET | `/api/health` | Check server health |

Topic routes require a bearer token. Topic and saved-topic operations are scoped to the authenticated user.

## Run Locally

Install Node.js and MongoDB Community Server (or configure a MongoDB Atlas URI). For a local MongoDB installation, start the MongoDB service before launching the server. MongoDB Compass can connect to:

```text
mongodb://127.0.0.1:27017/data
```

### Configure environment

Copy the example files:

```powershell
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
```

Set a long, unique `JWT_SECRET` in `server\.env`. Keep `.env` files private; they are ignored by Git.

### Start the backend

```powershell
cd server
npm install
npm run dev
```

The API defaults to `http://localhost:5000`.

### Start the frontend

In a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open `http://localhost:5173`, create an account, choose interests, and start exploring. MongoDB creates the database and collections when the first records are written.

## Verification

Build the frontend:

```powershell
cd client
npm run build
```

The backend health endpoint is `http://localhost:5000/api/health`. For functional verification, register an account, save a few interests, save a topic, and confirm the `users` and `savedtopics` collections in Compass.

## GitHub

Repository: [github.com/roshal2211/FLEXI_CA](https://github.com/roshal2211/FLEXI_CA).

```powershell
git add .
git commit -m "Update Curio topic discovery app"
git push -u origin main
```

Local `.env` files, dependencies, and generated build output are excluded from Git.
