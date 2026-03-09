import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortColumn, setSortOrder, setFilterStock, setDummyData } from '../store/slices/dataGridSlice';

interface StockData {
  stock: string;
  timestamp: string;
  value: number;
}

interface DataGridProps {
  stock1Data: { time: number; price: number }[];
  stock2Data: { time: number; price: number }[];
}

const DataGrid: React.FC<DataGridProps> = () => {
  const dispatch = useDispatch();
  const dataGridState = useSelector((state: any) => state.dataGrid);
  const { sortColumn, sortOrder, filterStock, dummyData } = dataGridState;

  // Generate dummy data once on component mount
  useEffect(() => {
    const generateDummyData = (): StockData[] => {
      const now = new Date();
      return [
        {
          stock: 'Stock 1',
          timestamp: new Date(now.getTime() - 5000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 75) * 100) / 100,
        },
        {
          stock: 'Stock 2',
          timestamp: new Date(now.getTime() - 5000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 175) * 100) / 100,
        },
        {
          stock: 'Stock 1',
          timestamp: new Date(now.getTime() - 10000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 75) * 100) / 100,
        },
        {
          stock: 'Stock 2',
          timestamp: new Date(now.getTime() - 10000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 175) * 100) / 100,
        },
        {
          stock: 'Stock 1',
          timestamp: new Date(now.getTime() - 15000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 75) * 100) / 100,
        },
        {
          stock: 'Stock 2',
          timestamp: new Date(now.getTime() - 15000).toLocaleTimeString(),
          value: Math.round((Math.random() * 50 + 175) * 100) / 100,
        },
      ];
    };

    dispatch(setDummyData(generateDummyData()));
  }, [dispatch]);

  // Process and sort data
  const processedData = useMemo(() => {
    let data = [...dummyData];

    // Apply filtering
    if (filterStock === 'stock1') {
      data = data.filter(item => item.stock === 'Stock 1');
    } else if (filterStock === 'stock2') {
      data = data.filter(item => item.stock === 'Stock 2');
    }

    // Apply sorting
    const sorted = [...data].sort((a, b) => {
      let compareValue = 0;
      if (sortColumn === 'stock') {
        compareValue = a.stock.localeCompare(b.stock);
      } else if (sortColumn === 'timestamp') {
        compareValue = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortColumn === 'value') {
        compareValue = a.value - b.value;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
  }, [dummyData, sortColumn, sortOrder, filterStock]);

  const handleSort = (column: 'stock' | 'timestamp' | 'value') => {
    if (sortColumn === column) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortColumn(column));
      dispatch(setSortOrder('asc'));
    }
  };

  const getSortIndicator = (column: 'stock' | 'timestamp' | 'value') => {
    if (sortColumn !== column) return '';
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="data-grid">
      <h2>Stock Data Grid</h2>

      {/* Filter Controls */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '15px' }}>
          Filter by Stock:
          <select
            value={filterStock}
            onChange={(e) => dispatch(setFilterStock(e.target.value as 'all' | 'stock1' | 'stock2'))}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="all">All Stocks</option>
            <option value="stock1">Stock 1</option>
            <option value="stock2">Stock 2</option>
          </select>
        </label>
      </div>

      {/* Data Grid / Table using divs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        {/* Header Row */}
        <div onClick={() => handleSort('stock')} className="data-grid-header">
          Stock {getSortIndicator('stock')}
        </div>
        <div onClick={() => handleSort('timestamp')} className="data-grid-header">
          Timestamp {getSortIndicator('timestamp')}
        </div>
        <div onClick={() => handleSort('value')} className="data-grid-header">
          Value {getSortIndicator('value')}
        </div>

        {/* Data Rows */}
        {processedData.length > 0 ? (
          processedData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="data-grid-cell" style={{ fontWeight: 'bold' }}>
                {item.stock}
              </div>
              <div className="data-grid-cell">
                {item.timestamp}
              </div>
              <div className="data-grid-cell" style={{ color: '#0066cc', fontWeight: 'bold' }}>
                ${item.value.toFixed(2)}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div
            style={{
              padding: '12px',
              textAlign: 'center',
              color: '#999',
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            No data available
          </div>
        )}
      </div>

      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Click on column headers to sort. Use the filter dropdown to filter by stock.
      </p>
    </div>
  );
};

export default DataGrid;
