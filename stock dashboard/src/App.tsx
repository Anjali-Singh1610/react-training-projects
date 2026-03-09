import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { updateStock1Price, updateStock2Price } from './store/slices/stockSlice';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Stock1 from './components/Stock1';
import Stock2 from './components/Stock2';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const stockState = useSelector((state: any) => state.stock);
  const { stock1Data, stock2Data } = stockState;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateStock1Price(100 + (Math.random() - 0.5) * 10));
      dispatch(updateStock2Price(200 + (Math.random() - 0.5) * 10));
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const stock1Prices = stock1Data.map((d: { price: number }) => d.price);
  const stock1Min = Math.min(...stock1Prices);
  const stock1Max = Math.max(...stock1Prices);

  const stock2Prices = stock2Data.map((d: { price: number }) => d.price);
  const stock2Min = Math.min(...stock2Prices);
  const stock2Max = Math.max(...stock2Prices);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stock1" element={<Stock1 min={stock1Min} max={stock1Max} />} />
      <Route path="/stock2" element={<Stock2 min={stock2Min} max={stock2Max} />} />
    </Routes>
  );
}

export default App;
