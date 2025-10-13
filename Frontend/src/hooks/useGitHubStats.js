import { useState, useEffect } from "react";

export const useGitHubStats = () => {
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.BACKEND_GITHUB_STATS
              : process.env.NEXT_PUBLIC_BACKEND_LOCAL_API_GITHUB_STATS
          }`
        );

        
        if (!response.ok) {
          throw new Error("Error fetching GitHub stats");
        }

        const data = await response.json();
        setGithubStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return { githubStats, loading, error };
};
