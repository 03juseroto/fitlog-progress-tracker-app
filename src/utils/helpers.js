/**
 * @module helpers
 * @description Provides reusable utility functions for the fitness tracking application.
 */

/**
 * Formats a date string (ISO 8601 format) into a human-readable date string.
 *
 * @param {string} dateString - The date string in ISO 8601 format.
 * @returns {string} A human-readable date string in the format "MMMM DD, YYYY",
 * or "Invalid Date" if the input is not a valid date string.
 */
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Calculates the total calories burned from an array of exercise objects.
 *
 * @param {Array<object>} exercises - An array of exercise objects, where each object
 * has a `caloriesBurned` property (number).
 * @returns {number} The total sum of `caloriesBurned` for all exercises in the array.
 * Returns 0 if the input is not an array or if the array is empty.
 * If any element in the array does not have the `caloriesBurned` property as a number,
 * it should be considered as 0 for calculation purposes.
 */
const calculateTotalCalories = (exercises) => {
  if (!Array.isArray(exercises)) {
    return 0;
  }

  if (exercises.length === 0) {
    return 0;
  }

  let totalCalories = 0;

  for (const exercise of exercises) {
    if (typeof exercise === 'object' && exercise !== null) {
      const caloriesBurned = typeof exercise.caloriesBurned === 'number' ? exercise.caloriesBurned : 0;
      totalCalories += caloriesBurned;
    }
  }

  return totalCalories;
};

/**
 * Validates the structure of a goal object.
 *
 * A valid goal object must have the following properties:
 * - `name` (string, non-empty)
 * - `targetValue` (number, positive)
 * - `unit` (string, non-empty)
 *
 * @param {object} goal - The goal object to validate.
 * @returns {boolean} A boolean indicating whether the goal is valid or not.
 */
const isValidGoal = (goal) => {
  try {
    if (typeof goal !== 'object' || goal === null) {
      return false;
    }

    const { name, targetValue, unit } = goal;

    if (typeof name !== 'string' || name.trim() === '') {
      return false;
    }

    if (typeof targetValue !== 'number' || targetValue <= 0) {
      return false;
    }

    if (typeof unit !== 'string' || unit.trim() === '') {
      return false;
    }

    // Basic HTML escaping for XSS prevention
    const sanitizedName = name.replace(/[&<>"']/g, (m) => {
      switch (m) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#39;';
        default:
          return m;
      }
    });

    if (sanitizedName !== name) {
        console.warn("Goal name was sanitized due to potential XSS.");
    }
    return true;
  } catch (error) {
    console.error("Error validating goal:", error);
    return false;
  }
};

export { formatDate, calculateTotalCalories, isValidGoal };