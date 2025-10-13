import express from "express";
import cors from "cors";
import morgan from "morgan";
import emailRoutes from "./routes/emailRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000", // desarrollo local
  process.env.FRONTEND_URL_PROD || "https://sebastianolarte.vercel.app" // producción
];

// ✅ Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origen (por ejemplo Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST"],
}));

app.use(express.json());
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/email", emailRoutes);
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("✅ Hello from the secure backend");
});

export default app;
