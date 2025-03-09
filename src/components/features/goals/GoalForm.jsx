import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth.js';
import { api } from '../../services/api.js';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';

/**
 * GoalForm component provides a form for users to create new fitness goals.
 *
 * It manages the form state, handles form submission,
 * and integrates with the authentication context.
 *
 * @returns {JSX.Element} - The goal form component.
 */
const GoalForm = () => {
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const auth = useAuth();

  /**
   * Handles the form submission for creating a new goal.
   *
   * Performs client-side validation, calls the API to create the goal,
   * and resets the form on success.
   *
   * @param {object} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!description) {
      setErrorMessage('Description is required.');
      return;
    }

    if (description.length > 200) {
      setErrorMessage('Description must be less than 200 characters.');
      return;
    }

    try {
      const sanitizedDescription = api.sanitizeData(description);
      await api.post(
        '/api/goals',
        { description: sanitizedDescription },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setDescription(''); // Reset the input field after successful submission
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create goal. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <Input
        label="Description"
        type="text"
        value={description}
        onChange={(value) => setDescription(value)}
        placeholder="Enter your goal description"
        error={errorMessage}
      />
      {errorMessage && <p className="text-red-500 text-sm italic">{errorMessage}</p>}
      <Button label="Add Goal" type="submit" style="mt-4 w-full" />
    </form>
  );
};

GoalForm.propTypes = {
  description: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default GoalForm;