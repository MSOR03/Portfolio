import fs from "fs";
import https from "https";
import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // ✅ PRODUCCIÓN (Render) - HTTP simple
  http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`🚀 HTTP Server running on port ${port}`);
    console.log("🔍 GITHUB PRIVATE KEY PATH =>", process.env.GITHUB_PRIVATE_KEY_PATH);
  });
} else {
  // 🔧 DESARROLLO LOCAL - HTTPS con certificados
  try {
    const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
    const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
    const ca_certificate = fs.readFileSync(process.env.SSL_CA_PATH, "utf-8");
    
    const credentials = { key: privateKey, cert: certificate, ca: ca_certificate };
    
    https.createServer(credentials, app).listen(port, () => {
      console.log(`🚀 HTTPS Server running on https://localhost:${port}`);
      console.log("🔍 GITHUB PRIVATE KEY PATH =>", process.env.GITHUB_PRIVATE_KEY_PATH);
    });
  } catch (error) {
    console.error("❌ Error loading SSL certificates:", error.message);
    console.log("⚠️  Falling back to HTTP...");
    
    http.createServer(app).listen(port, '0.0.0.0', () => {
      console.log(`🚀 HTTP Server running on http://localhost:${port}`);
    });
  }
}