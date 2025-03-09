import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import useAuth from '../../hooks/useAuth.js';
import authService from '../../services/auth.js';
import { api } from '../../services/api.js';

/**
 * LoginForm component provides a form for users to log in.
 *
 * It manages the form state, handles form submission,
 * and integrates with the authentication context.
 *
 * @returns {JSX.Element} - The login form component.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  /**
   * Handles the form submission for user login.
   *
   * Performs client-side validation, calls the login service,
   * and updates the authentication context on success.
   *
   * @param {object} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    try {
      const sanitizedEmail = api.sanitizeData(email);
      const sanitizedPassword = api.sanitizeData(password);

      authService.login(sanitizedEmail, sanitizedPassword)
        .then(({ user, token }) => {
          if (auth && auth.login) {
            auth.login(user, token);
            navigate('/dashboard');
          } else {
            setErrorMessage('Authentication failed. Please try again.');
          }
        })
        .catch((error) => {
          if (error && error.message) {
            setErrorMessage(error.message);
          } else {
            setErrorMessage('An unexpected error occurred. Please try again.');
          }
        });
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(value) => setEmail(value)}
        placeholder="Enter your email"
        error={errorMessage}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(value) => setPassword(value)}
        placeholder="Enter your password"
        error={errorMessage}
      />
      {errorMessage && <p className="text-red-500 text-sm italic">{errorMessage}</p>}
      <Button label="Login" type="submit" style="mt-4 w-full" />
    </form>
  );
};

export default LoginForm;