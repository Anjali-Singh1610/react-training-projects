import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataGrid from './DataGrid';

const Dashboard: React.FC = () => {
  const stockState = useSelector((state: any) => state.stock);
  const { stock1Price, stock2Price, stock1Data, stock2Data } = stockState;
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawChart(canvas1Ref.current, stock1Data, '#8884d8');
  }, [stock1Data]);

  useEffect(() => {
    drawChart(canvas2Ref.current, stock2Data, '#82ca9d');
  }, [stock2Data]);

  const drawChart = (canvas: HTMLCanvasElement | null, data: { time: number; price: number }[], color: string) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60; // Increased padding for labels

    // Find min and max prices
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.setLineDash([5, 5]);
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - 2 * padding) * (1 - i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw axis labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Time', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Price', 0, 0);
    ctx.restore();

    // Draw price labels on y-axis
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (priceRange * i) / 5;
      const y = padding + (height - 2 * padding) * (1 - i / 5);
      ctx.fillText(price.toFixed(2), padding - 5, y + 4);
    }

    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (width - 2 * padding) * (index / (data.length - 1));
      const y = padding + (height - 2 * padding) * (1 - (point.price - minPrice) / priceRange);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button>Back to Home</button>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Stock 1: ${stock1Price.toFixed(2)}</h2>
          <canvas ref={canvas1Ref} width={400} height={200} style={{ border: '1px solid #ccc' }} />
        </div>
        <div style={{ textAlign: 'center' , marginLeft: '20px'}}>
          <h2>Stock 2: ${stock2Price.toFixed(2)}</h2>
          <canvas ref={canvas2Ref} width={400} height={200} style={{ border: '1px solid #ccc' }} />
        </div>
      </div>
      <DataGrid stock1Data={stock1Data} stock2Data={stock2Data} />
    </div>
  );
};

export default Dashboard;