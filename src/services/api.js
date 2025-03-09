/**
 * @module api
 * @description Provides a service for making authenticated HTTP requests to the backend API.
 */

import axios from 'axios';

/**
 * The base URL for the API, retrieved from the environment variables.
 * @constant {string}
 */
const baseURL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Creates an Axios instance with default configurations.
 * @constant {AxiosInstance}
 */
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to include the Authorization token in the headers.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle unauthorized requests.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * @function sanitizeData
 * @description Sanitizes data to prevent XSS vulnerabilities by encoding HTML entities in string values.
 * @param {any} data - The data to sanitize.
 * @returns {any} - The sanitized data.
 */
function sanitizeData(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"']/g, (match) => {
      switch (match) {
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
          return match;
      }
    });
  } else if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map((item) => sanitizeData(item));
    } else {
      const sanitizedData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          sanitizedData[key] = sanitizeData(data[key]);
        }
      }
      return sanitizedData;
    }
  }
  return data;
}

/**
 * @async
 * @function get
 * @description Makes a GET request to the specified URL.
 * @param {string} url - The URL to make the request to.
 * @param {object} [config] - The configuration for the request.
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const get = async (url, config) => {
  try {
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * @async
 * @function post
 * @description Makes a POST request to the specified URL.
 * @param {string} url - The URL to make the request to.
 * @param {any} data - The data to send in the request body.
 * @param {object} [config] - The configuration for the request.
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const post = async (url, data, config) => {
  try {
    const sanitizedDataValue = sanitizeData(data);
    const response = await api.post(url, sanitizedDataValue, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * @async
 * @function put
 * @description Makes a PUT request to the specified URL.
 * @param {string} url - The URL to make the request to.
 * @param {any} data - The data to send in the request body.
 * @param {object} [config] - The configuration for the request.
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const put = async (url, data, config) => {
  try {
    const sanitizedDataValue = sanitizeData(data);
    const response = await api.put(url, sanitizedDataValue, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * @async
 * @function delete
 * @description Makes a DELETE request to the specified URL.
 * @param {string} url - The URL to make the request to.
 * @param {object} [config] - The configuration for the request.
 * @returns {Promise<any>} - A promise that resolves with the response data or rejects with an error.
 * @throws {Error} - If the request fails due to a network error or an HTTP error.
 */
const del = async (url, config) => {
  try {
    const response = await api.delete(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * @function handleApiError
 * @description Handles API errors and returns a rejected promise with a custom error object.
 * @param {Error} error - The error object.
 * @returns {Promise<never>} - A rejected promise with a custom error object.
 */
const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`API Error: Status ${status}, Data:`, data);

    let message = data.message || 'An error occurred';
    if (status === 400) {
      message = data.errors ? data.errors[0] : message;
    }

    return Promise.reject({ status, message });
  } else if (error.request) {
    console.error('Network error:', error.message);
    return Promise.reject({ status: 0, message: 'Network error' });
  } else {
    console.error('Unexpected error:', error.message);
    return Promise.reject({ status: -1, message: 'Unexpected error' });
  }
};

const exportedApi = {
  get,
  post,
  put,
  delete: del,
  sanitizeData
};

export { exportedApi as api };