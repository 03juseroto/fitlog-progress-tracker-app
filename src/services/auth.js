/**
 * @module auth
 * @description Provides authentication services for user login and signup.
 */

import { api } from '../services/api';

/**
 * @async
 * @function login
 * @description Logs in a user with the provided email and password.
 * @param {string} email - The user's email address.  Must be a valid email format.
 * @param {string} password - The user's password. Must be at least 8 characters.
 * @returns {Promise<object>} - A promise that resolves with the authentication token and user data upon successful login,
 * or rejects with a detailed error message upon failure (e.g., invalid credentials, server error).
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const login = async (email, password) => {
  if (!email) {
    return Promise.reject({ status: 400, message: 'Email is required' });
  }

  if (!password) {
    return Promise.reject({ status: 400, message: 'Password is required' });
  }

  if (password.length < 8) {
    return Promise.reject({ status: 400, message: 'Password must be at least 8 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Promise.reject({ status: 400, message: 'Invalid email format' });
  }

  try {
    const sanitizedEmail = api.sanitizeData(email);
    const sanitizedPassword = api.sanitizeData(password);
    const response = await api.post('/api/auth/login', { email: sanitizedEmail, password: sanitizedPassword }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Mitigate potential CSRF
      }
    });

    const { token, user } = response.data;

    if (!token || !user) {
      return Promise.reject({ status: 500, message: 'Authentication failed: Token or user data missing' });
    }

    try {
      localStorage.setItem("authToken", token);
    } catch (localStorageError) {
      console.error("Error saving token to localStorage:", localStorageError);
      return Promise.reject({ status: 500, message: 'Failed to save token to localStorage' });
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return Promise.resolve({ token, user });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @async
 * @function signup
 * @description Registers a new user with the provided user data.
 * @param {object} userData - The user's data, including email, password, and other registration information.
 * @returns {Promise<object>} - A promise that resolves with the authentication token and user data upon successful signup,
 * or rejects with a detailed error message upon failure (e.g., invalid input, server error).
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const signup = async (userData) => {
  if (!userData) {
    return Promise.reject({ status: 400, message: 'User data is required' });
  }

  const { email, password } = userData;

  if (!email) {
    return Promise.reject({ status: 400, message: 'Email is required' });
  }

  if (!password) {
    return Promise.reject({ status: 400, message: 'Password is required' });
  }

  if (password.length < 8) {
    return Promise.reject({ status: 400, message: 'Password must be at least 8 characters' });
  }

    // Password Complexity Validation (example - adjust as needed)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return Promise.reject({ status: 400, message: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character' });
    }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Promise.reject({ status: 400, message: 'Invalid email format' });
  }

  try {
    const sanitizedUserData = api.sanitizeData(userData);
    const response = await api.post('/api/auth/signup', sanitizedUserData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Mitigate potential CSRF
      }
    });

    const { token, user } = response.data;

    if (!token || !user) {
      return Promise.reject({ status: 500, message: 'Registration failed: Token or user data missing' });
    }

    try {
      localStorage.setItem("authToken", token);
    } catch (localStorageError) {
      console.error("Error saving token to localStorage:", localStorageError);
      return Promise.reject({ status: 500, message: 'Failed to save token to localStorage' });
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return Promise.resolve({ token, user });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * @function logout
 * @description Logs out the current user by removing the authentication token from localStorage and redirecting to the login page.
 */
const logout = () => {
  try {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  } catch (localStorageError) {
    console.error("Error removing token from localStorage:", localStorageError);
  }
};

const authService = {
  login,
  signup,
  logout
};

export default authService;

/**
 * Unit Tests
 *
 * 1. Test successful login:
 *    - Mock the API to return a valid token and user data.
 *    - Call the login function with valid credentials.
 *    - Assert that the function resolves with the correct token and user data.
 *    - Assert that the token is stored in localStorage.
 *    - Assert that the Authorization header is set correctly.
 *
 * 2. Test failed login (invalid credentials):
 *    - Mock the API to return an error.
 *    - Call the login function with invalid credentials.
 *    - Assert that the function rejects with the correct error message.
 *    - Assert that the token is not stored in localStorage.
 *    - Assert that the Authorization header is not set.
 *
 * 3. Test successful signup:
 *    - Mock the API to return a valid token and user data.
 *    - Call the signup function with valid user data.
 *    - Assert that the function resolves with the correct token and user data.
 *    - Assert that the token is stored in localStorage.
 *    - Assert that the Authorization header is set correctly.
 *
 * 4. Test failed signup (invalid input):
 *    - Mock the API to return an error.
 *    - Call the signup function with invalid user data.
 *    - Assert that the function rejects with the correct error message.
 *    - Assert that the token is not stored in localStorage.
 *    - Assert that the Authorization header is not set.
 *
 * 5. Test logout:
 *    - Store a token in localStorage.
 *    - Call the logout function.
 *    - Assert that the token is removed from localStorage.
 *    - Assert that the Authorization header is cleared.
 *    - Assert that the user is redirected to the login page.
 *
 * 6. Test localStorage errors during login/signup/logout:
 *    - Mock localStorage to throw an error.
 *    - Call the login/signup/logout function.
 *    - Assert that the function rejects with an appropriate error message.
 *
 * 7. Test input validation (email format, password length):
 *    - Call the login/signup function with invalid email/password.
 *    - Assert that the function rejects with the correct error message.
 */