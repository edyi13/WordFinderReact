import React from 'react';
import './index.css'; // Create a CSS file for styling

interface Props {
  matrix: string[];
}

const MatrixGrid: React.FC<Props> = ({ matrix }) => {
  const gridSize = Math.ceil(Math.sqrt(matrix.reduce((acc, row) => acc + row.length, 0)));

  return (
    <div className="square-matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: gridSize }).map((_, cellIndex) => (
            <div key={cellIndex} className="cell">
              {row[cellIndex] || ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default MatrixGrid;