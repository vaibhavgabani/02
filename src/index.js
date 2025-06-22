const express = require('express');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced route for testing in browser
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Express API</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Express API Running Successfully</h1>
        <p>Server is running on port ${PORT}</p>
        <h2>API Endpoints:</h2>
        <ul>
          <li><code>GET /</code> - This welcome page</li>
          <li><code>GET /api</code> - Sample JSON response (try in Postman)</li>
        </ul>
        <p>Use Postman with this URL: <pre>http://localhost:3010/api</pre></p>
      </body>
    </html>
  `);
});

// API endpoint for Postman testing
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API is working correctly!',
    timestamp: new Date(),    serverPort: PORT,
    endpoints: [
      { method: 'GET', path: '/', description: 'Welcome page' },
      { method: 'GET', path: '/api', description: 'This JSON response' }
    ]
  });
});

// Start the server - use HOST env var or default to 0.0.0.0
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Apply this command frist than access PORTS : docker run -d -p 3010:3000 --name express-app vaibhavgabani/express-app:latest`);
  console.log(`Server is running on ${HOST}:${PORT}`);
  console.log(`- Local URL: http://localhost:${PORT}`);
  console.log(`- Running in Docker: Container port ${PORT} is mapped to host port (default: 3010)`);
  console.log(`- Access the application at: http://localhost:3010 (if using default port mapping)`);
});
