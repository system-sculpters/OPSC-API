const https = require('https')
const dotenv = require('dotenv').config()
const fs = require('fs')
const app = require('./app')

const PORT = process.env.PORT || 3001

// Define options for the HTTPS server using SSL/TLS certificates
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

// Create an HTTPS server using the specified options and the Express app
const server = https.createServer(options, app)

// Start the server and have it listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
 