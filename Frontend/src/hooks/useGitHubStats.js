import { useState, useEffect } from 'react';

export const useGitHubStats = () => {
  const [githubStats, setGithubStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('https://localhost:5000/api/github/stats' || process.env.BACKEND_GITHUB_STATS);
        
        if (!response.ok) {
          throw new Error('Error fetching GitHub stats');
        }
        

        const data = await response.json();
        setGithubStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return { githubStats, loading, error };
};