import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable button component styled with Tailwind CSS.
 *
 * @param {string} label - The text to display on the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} style - Tailwind CSS classes to apply to the button.
 * @param {boolean} disabled - Whether the button is disabled.
 * @returns {JSX.Element} - The button component.
 */
const Button = ({ label, onClick, style, disabled }) => {
  const defaultStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed';

  const combinedStyle = style ? `${defaultStyle} ${style}` : defaultStyle;

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={combinedStyle}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;