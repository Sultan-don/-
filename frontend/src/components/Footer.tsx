import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg p-4 text-center text-white">
      <p>&copy; {new Date().getFullYear()} School Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;