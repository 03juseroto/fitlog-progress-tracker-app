import React from 'react';

/**
 * The Footer component serves as the application's footer.
 * It displays a copyright notice with the current year.
 *
 * @returns {JSX.Element} - The footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;