import fetch from "node-fetch";
import { generateGitHubJWT } from "../utils/githubAuth.js";
import dotenv from "dotenv";
dotenv.config();

// Cache para el Installation Token
let tokenCache = {
  token: null,
  expiresAt: null
};

// Get an Installation Token with caching
export const getGitHubToken = async () => {
  // Si el token existe y no ha expirado, retornarlo
  const now = new Date();
  if (tokenCache.token && tokenCache.expiresAt && now < tokenCache.expiresAt) {
    console.log("✅ Usando token en caché");
    return tokenCache.token;
  }

  console.log("🔄 Generando nuevo token...");
  
  // Generar nuevo JWT (siempre fresco)
  const jwt = generateGitHubJWT();

  const response = await fetch(
    `https://api.github.com/app/installations/${process.env.GITHUB_INSTALLATION_ID}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Error obteniendo token:", errorData);
    throw new Error(`GitHub Token Error: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Guardar en caché (expira 5 minutos antes para seguridad)
  tokenCache.token = data.token;
  tokenCache.expiresAt = new Date(data.expires_at);
  tokenCache.expiresAt.setMinutes(tokenCache.expiresAt.getMinutes() - 5);
  
  console.log("✅ Token generado. Expira en:", data.expires_at);
  
  return data.token;
};

// ✅ Get commits from a specific repo
export const getGitHubCommits = async (req, res) => {
  try {
    const token = await getGitHubToken();

    const response = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/commits?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ GitHub API Error:", errorData);
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const commits = await response.json();

    res.json({
      message: "✅ Commits fetched",
      total_commits: commits.length,
      commits,
    });
  } catch (error) {
    console.error("❌ Error en getGitHubCommits:", error.message);
    res.status(500).json({ error: "Failed to fetch commits", details: error.message });
  }
};

// ✅ Get GitHub user statistics (OPTIMIZED with GraphQL)
export const getGitHubStats = async (req, res) => {
  try {
    const token = await getGitHubToken();
    const username = process.env.GITHUB_OWNER;

    const query = `
      query {
        user(login: "${username}") {
          repositories(first: 100, ownerAffiliations: OWNER) {
            totalCount
          }
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            restrictedContributionsCount
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ GraphQL Error:", errorText);
      throw new Error(`GitHub GraphQL Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error("❌ GraphQL Errors:", data.errors);
      throw new Error(`GraphQL Errors: ${JSON.stringify(data.errors)}`);
    }

    const user = data.data.user;
    const contributions = user.contributionsCollection;

    res.json({
      message: "✅ GitHub statistics fetched successfully",
      stats: {
        repositories: user.repositories.totalCount,
        commits: contributions.totalCommitContributions,
        pull_requests: contributions.totalPullRequestContributions,
        issues: contributions.totalIssueContributions,
      }
    });
  } catch (error) {
    console.error("❌ Error en getGitHubStats:", error.message);
    res.status(500).json({ 
      error: "Failed to fetch GitHub stats", 
      details: error.message 
    });
  }
};