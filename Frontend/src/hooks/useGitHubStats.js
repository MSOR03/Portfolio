import { useState, useEffect } from "react";

export const useGitHubStats = () => {
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // ✅ Usa NEXT_PUBLIC_ para que esté disponible en el cliente
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        
      
        const response = await fetch(`${API_URL}/api/github/stats`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setGithubStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error("❌ Error fetching GitHub stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return { githubStats, loading, error };
};