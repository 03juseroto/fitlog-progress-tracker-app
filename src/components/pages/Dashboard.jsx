import React from 'react';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';
import DashboardStats from '../features/dashboard/DashboardStats.jsx';
import GoalList from '../features/goals/GoalList.jsx';
import GoalForm from '../features/goals/GoalForm.jsx';
import useAuth from '../../hooks/useAuth.js';

/**
 * Dashboard component is the main dashboard page for authenticated users.
 *
 * It renders the Header, Footer, DashboardStats, GoalList, and GoalForm components.
 * If the user is not authenticated, it displays a loading message or an error.
 *
 * @returns {JSX.Element} - The dashboard component.
 */
const Dashboard = () => {
  const auth = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 py-20">
        <div className="container mx-auto">
          {auth && auth.isAuthenticated ? (
            <>
              <DashboardStats />
              <GoalList />
              <GoalForm />
            </>
          ) : (
            <div className="text-center">
              {auth ? (
                <p>Loading dashboard...</p>
              ) : (
                <p className="text-red-500">User is not authenticated.</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;