const express = require('express');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced route for testing in browser
app.get('/', (req, res) => {
  const isDocker = process.env.RUNNING_IN_DOCKER === 'true';
  const portMappingOk = process.env.PORT_MAPPING_OK === 'true';
  const accessPort = isDocker ? (portMappingOk ? '3010 (default)' : '&lt;HOST_PORT&gt; (e.g., 3010)') : PORT;
  
  res.send(`
    <html>
      <head>
        <title>Express API</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
          .warning { background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 5px solid #ffc107; margin-bottom: 20px; }
          .success { background-color: #d4edda; padding: 15px; border-radius: 5px; border-left: 5px solid #28a745; margin-bottom: 20px; }
          code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
          .solutions { margin-top: 20px; padding: 15px; background-color: #e7f5fe; border-radius: 5px; border-left: 5px solid #0d6efd; }
        </style>
      </head>
      <body>
        <h1>Express API Running Successfully</h1>
        <p>Server is running on port ${PORT}</p>
        
        ${isDocker ? 
          (portMappingOk ? 
            `<div class="success">
              <h3>✅ Docker Container Running Correctly</h3>
              <p>Application is properly mapped and accessible at:</p>
              <pre>http://localhost:3010</pre>
            </div>` 
            : 
            `<div class="warning">
              <h3>⚠️ Docker Port Mapping Required</h3>
              <p>For the application to be accessible, you <strong>must</strong> map the container port to a host port:</p>
              <pre>docker run -d -p &lt;HOST_PORT&gt;:${PORT} --name express-app vaibhavgabani/express-app:latest</pre>
              <p>Example: <code>docker run -d -p 3010:${PORT} --name express-app vaibhavgabani/express-app:latest</code></p>
              <p>Then access at: <code>http://localhost:&lt;HOST_PORT&gt;</code> (e.g., <code>http://localhost:3010</code>)</p>
              
              <div class="solutions">
                <h4>🔄 Easy Solutions:</h4>
                <ol>
                  <li><strong>Use Our Auto-Setup Scripts</strong> (Recommended):
                    <ul>
                      <li>Windows: <code>run-app.ps1</code></li>
                      <li>Mac/Linux: <code>run-app.sh</code></li>
                    </ul>
                  </li>
                  <li><strong>Use Docker Compose</strong>:
                    <pre>docker-compose up -d</pre>
                  </li>
                </ol>
              </div>
            </div>`
          ) 
          : 
          `<div class="success">
            <h3>✅ Running Locally</h3>
            <p>Application is running outside of Docker and is accessible at:</p>
            <pre>http://localhost:${PORT}</pre>
          </div>`
        }
        
        <h2>API Endpoints:</h2>
        <ul>
          <li><code>GET /</code> - This welcome page</li>
          <li><code>GET /api</code> - Sample JSON response (try in Postman)</li>
        </ul>
        <p>Use Postman with this URL: <pre>http://localhost:${accessPort}/api</pre></p>
      </body>
    </html>
  `);
});

// API endpoint for Postman testing
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API is working correctly!',
    timestamp: new Date(),    
    serverPort: PORT,
    endpoints: [
      { method: 'GET', path: '/', description: 'Welcome page' },
      { method: 'GET', path: '/api', description: 'This JSON response' }
    ]
  });
});

// Start the server - use HOST env var or default to 0.0.0.0
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`\n====== EXPRESS API SERVER STARTED ======`);
  console.log(`Server is running on ${HOST}:${PORT}`);
  
  // Provide clear instructions based on environment
  if (process.env.RUNNING_IN_DOCKER === 'true') {
    const portMappingOk = process.env.PORT_MAPPING_OK === 'true';
    
    if (portMappingOk) {
      console.log(`\n✅ DOCKER CONTAINER RUNNING CORRECTLY`);
      console.log(`- Container port ${PORT} is properly mapped`);
      console.log(`- Access the application at: http://localhost:3010 (default port mapping)`);
    } else {
      console.log(`\n⚠️ DOCKER PORT MAPPING REQUIRED`);
      console.log(`- Container port ${PORT} needs to be mapped to a host port`);
      console.log(`- To access this container, run it with:`);
      console.log(`  docker run -d -p <HOST_PORT>:${PORT} --name express-app vaibhavgabani/express-app:latest`);
      console.log(`  Example: docker run -d -p 3010:${PORT} --name express-app vaibhavgabani/express-app:latest`);
      console.log(`\n- Quick solutions:`);
      console.log(`  1. Use the auto-setup scripts: run-app.ps1 (Windows) or run-app.sh (Mac/Linux)`);
      console.log(`  2. Use Docker Compose: docker-compose up -d`);
    }
  } else {
    console.log(`\n✅ RUNNING LOCALLY (NOT IN DOCKER)`);
    console.log(`- Local URL: http://localhost:${PORT}`);
  }
  
  console.log(`\n📝 For detailed setup instructions, see DOCKER_INSTRUCTIONS.md`);
  console.log(`=====================================`);
});
