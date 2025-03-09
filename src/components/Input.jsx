import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable input component styled with Tailwind CSS.
 *
 * @param {string} label - The text to display next to the input field.
 * @param {string} type - The type of input (e.g., "text", "password", "email").
 * @param {string} value - The current value of the input.
 * @param {function} onChange - The function to call when the input value changes.
 * @param {string} placeholder - A hint to display inside the input field.
 * @param {string} error - An error message to display below the input field.
 * @returns {JSX.Element} - The input component.
 */
const Input = ({ label, type, value, onChange, placeholder, error }) => {
  const handleInputChange = (event) => {
    // Sanitize input to prevent XSS
    const sanitizedValue = event.target.value.replace(/[&<>"]/g, (match) => {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        default:
          return match;
      }
    });
    onChange(sanitizedValue);
  };

  return (
    <div>
      <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        aria-label={label}
      />
      {error && <p className="text-red-500 text-sm italic">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;