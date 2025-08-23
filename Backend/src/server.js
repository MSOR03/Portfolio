import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import emailRoutes from "./routes/emailRoutes.js";

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// SSL certificates
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.SSL_CERT_PATH, "utf8");
const ca_certificate = fs.readFileSync(process.env.SSL_CA_PATH, "utf-8");

const credentials = { key: privateKey, cert: certificate, ca: ca_certificate };

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: "http://localhost:3000", // puerto donde corre tu frontend
  methods: ["POST", "GET"],
}));

// Routes
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the secure backend");
});

// Start HTTPS server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
  console.log(`🚀 HTTPS Server running on https://localhost:${port}`);
});
