import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-lg p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">School Name</Link>
        <div className="space-x-4">
          <Link to="/about" className="text-white hover:text-blue-300 transition-all duration-300">About</Link>
          <Link to="/admissions" className="text-white hover:text-blue-300 transition-all duration-300">Admissions</Link>
          <Link to="/contact" className="text-white hover:text-blue-300 transition-all duration-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;