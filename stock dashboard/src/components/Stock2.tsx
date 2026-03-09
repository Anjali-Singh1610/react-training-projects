import React from 'react';
import { Link } from 'react-router-dom';

interface Stock2Props {
  min: number;
  max: number;
}

const Stock2: React.FC<Stock2Props> = ({ min, max }) => {
  return (
    <div>
      <h1>Stock 2 Details</h1>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button>Back to Home</button>
      </Link>
      <p>Established: February 1, 2021</p>
      <p>Min Value: ${min.toFixed(2)}</p>
      <p>Max Value: ${max.toFixed(2)}</p>
    </div>
  );
};

export default Stock2;