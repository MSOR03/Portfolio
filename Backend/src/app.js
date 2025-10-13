import express from "express";
import cors from "cors";
import morgan from "morgan";
import emailRoutes from "./routes/emailRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // frontend URL
  methods: ["POST", "GET"]
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the secure backend");
});

export default app;
