import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/dashboard" style={{ border: '1px solid #ccc', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
          Dashboard
        </Link>
        <Link to="/stock1" style={{ border: '1px solid #ccc', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
          Stock 1
        </Link>
        <Link to="/stock2" style={{ border: '1px solid #ccc', padding: '20px', textDecoration: 'none', color: 'inherit' }}>
          Stock 2
        </Link>
      </div>
    </div>
  );
};

export default Home;