import express from "express";
import { getGitHubCommits, getGitHubStats } from "../controllers/githubControllers.js";

const router = express.Router();

router.get("/commits", getGitHubCommits); // Commits del repo 'portfolio'
router.get("/stats", getGitHubStats);     // Estadísticas generales del usuario

export default router;
