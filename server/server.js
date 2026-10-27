require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = new URL(process.env.CLIENT_URL || 'http://localhost:5173');
const clientOrigins = [clientUrl.origin];

if (clientUrl.hostname === 'localhost') {
  clientUrl.hostname = '127.0.0.1';
  clientOrigins.push(clientUrl.origin);
} else if (clientUrl.hostname === '127.0.0.1') {
  clientUrl.hostname = 'localhost';
  clientOrigins.push(clientUrl.origin);
}

app.use(
  cors({
    origin: clientOrigins,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error.'
  });
});

const startServer = async () => {
  const connected = await connectDB();

  if (!connected) {
    console.warn('MongoDB connection not available. Check server/.env for MONGODB_URI.');
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
