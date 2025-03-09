import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import { api } from '../../services/api.js';
import Button from "../../components/Button.jsx";
import PropTypes from 'prop-types';

/**
 * GoalList component displays a list of fitness goals for the authenticated user.
 *
 * It fetches the goals from the backend API and renders them.
 * Utilizes Tailwind CSS for styling, adhering to the existing design patterns.
 * Implements error handling and loading state management.
 *
 * @returns {JSX.Element} - The goal list component.
 */
const GoalList = () => {
  const auth = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/goals');
        const sanitizedGoals = api.sanitizeData(response.data);
        setGoals(sanitizedGoals);
      } catch (err) {
        setError(err.message || 'Failed to fetch goals.');
      } finally {
        setLoading(false);
      }
    };

    if (auth.isAuthenticated) {
      fetchGoals();
    } else {
      setLoading(false);
      setError('User is not authenticated.');
    }
  }, [auth.isAuthenticated]);

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/api/goals/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete goal.');
    }
  };

  if (loading) {
    return <p>Loading goals...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!goals || goals.length === 0) {
    return <p>No goals found. Add a goal to get started!</p>;
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Your Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id} className="flex items-center justify-between py-2 border-b border-gray-200">
            <span className="text-gray-700 py-2" aria-label={`Goal description: ${goal.description}`}>
              {goal.description}
            </span>
            <Button
              label="Delete"
              onClick={() => handleDeleteGoal(goal._id)}
              style="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              aria-label={`Delete goal with description: ${goal.description}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

GoalList.propTypes = {
  goals: PropTypes.array,
};

export default GoalList;