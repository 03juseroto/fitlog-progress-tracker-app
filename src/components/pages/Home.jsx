import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm.jsx';
import SignupForm from '../features/auth/SignupForm.jsx';
import useAuth from '../../hooks/useAuth.js';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';
import { api } from '../../services/api.js';

/**
 * Home component is the landing page of the application.
 * It conditionally renders login/signup forms or a welcome message based on authentication status.
 *
 * @returns {JSX.Element} - The home component.
 */
const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <Header />
      <main className="flex-grow bg-gray-100 py-20">
        <div className="container mx-auto">
          {auth && auth.isAuthenticated ? (
            <div className="text-center">
              <h1 className="text-3xl font-semibold mb-4">Welcome!</h1>
              <p className="text-gray-700 mb-4">
                You are logged in as: {api.sanitizeData(auth.user.email)}
              </p>
              <Link
                to="/dashboard"
                className="text-blue-500 hover:text-blue-700"
                aria-label="Go to Dashboard page"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex justify-around mt-20">
              <LoginForm />
              <SignupForm />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;