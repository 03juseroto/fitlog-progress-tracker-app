import React from 'react';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';
import GoalList from '../features/goals/GoalList.jsx';
import GoalForm from '../features/goals/GoalForm.jsx';
import useAuth from '../../hooks/useAuth.js';

/**
 * Goals component is the main goals page for authenticated users.
 *
 * It renders the Header, Footer, GoalList, and GoalForm components.
 * If the user is not authenticated, it displays an error message.
 *
 * @returns {JSX.Element} - The goals component.
 */
const Goals = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-20">
        <div className="container mx-auto">
          {auth && auth.isAuthenticated ? (
            <>
              <GoalList />
              <GoalForm />
            </>
          ) : (
            <div className="text-center">
              <p className="text-red-500">User is not authenticated.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Goals;