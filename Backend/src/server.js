//Import express(Server) and cors(Because the server and client are in differents ports)
//Import fs to read in disk and https for protocole.
//Import dotenv to read .env
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load environment variables from .env file
dotenv.config();

//Setup app with instance of express and port 5000
const app = express();
const port = process.env.PORT || 5000;

//Load certificates ssl for secure backend
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
const ca_certicate = fs.readFileSync(process.env.SSL_CA_PATH,"utf-8")

//Object for credentials
const credentials = { key: privateKey, cert: certificate,ca:ca_certicate };

//Enable from two ports and request from .json
app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
//Define routes '/api/message' and send answers.
app.get("/", (req, res) => {
  res.send("Hello from the secure backend" );
});

//Create server HTTPS with credentials and express
const httpsServer=https.createServer(credentials,app);
//Start the server
httpsServer.listen(port,()=>{
    console.log(`HTTPS Server is running on https://localhost:${port}`);
})