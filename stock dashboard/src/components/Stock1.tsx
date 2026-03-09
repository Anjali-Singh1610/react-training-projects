import React from 'react';
import { Link } from 'react-router-dom';

interface Stock1Props {
  min: number;
  max: number;
}

const Stock1: React.FC<Stock1Props> = ({ min, max }) => {
  return (
    <div>
      <h1>Stock 1 Details</h1>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button>Back to Home</button>
      </Link>
      <p>Established: January 1, 2020</p>
      <p>Min Value: ${min.toFixed(2)}</p>
      <p>Max Value: ${max.toFixed(2)}</p>
    </div>
  );
};

export default Stock1;