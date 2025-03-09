import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import { api } from '../../services/api.js';

/**
 * DashboardStats component displays key fitness statistics to the user.
 *
 * It fetches data from the backend API and displays total goals, completed goals,
 * current streak, and average workout duration.  It also handles loading and error states.
 *
 * @returns {JSX.Element} - The dashboard statistics component.
 */
const DashboardStats = () => {
  const auth = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get('/api/stats');
        const sanitizedStats = api.sanitizeData(response);
        setStats(sanitizedStats);
      } catch (err) {
        setError(err.message || 'Failed to fetch statistics.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [auth.isAuthenticated]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Your Stats</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <p>
            Total Goals: {stats.totalGoals !== undefined ? stats.totalGoals : 'N/A'}
          </p>
          <p>
            Completed Goals: {stats.completedGoals !== undefined ? stats.completedGoals : 'N/A'}
          </p>
          <p>
            Current Streak: {stats.currentStreak !== undefined ? stats.currentStreak : 'N/A'}
          </p>
          <p>
            Average Workout Duration: {stats.averageWorkoutDuration !== undefined ? stats.averageWorkoutDuration : 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;