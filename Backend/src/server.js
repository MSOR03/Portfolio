import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

const port = process.env.PORT || 5000;

// SSL certificates
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
const ca_certificate = fs.readFileSync(process.env.SSL_CA_PATH, "utf-8");

const credentials = { key: privateKey, cert: certificate, ca: ca_certificate };

// Start HTTPS server
https.createServer(credentials, app).listen(port, () => {
  console.log(`🚀 HTTPS Server running on https://localhost:${port}`);
  console.log("🔍 GITHUB PRIVATE KEY PATH =>", process.env.GITHUB_PRIVATE_KEY_PATH);

});
