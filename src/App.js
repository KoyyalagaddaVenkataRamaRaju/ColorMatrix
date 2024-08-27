import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill('')));
  const [clicks, setClicks] = useState([]);
  const [isLastBoxClicked, setIsLastBoxClicked] = useState(false);
  const handleBoxClick = (rowIdx, colIdx) => {
    if (isLastBoxClicked) return;
    const newMatrix = matrix.map((row, rIdx) =>
      row.map((color, cIdx) =>
        rIdx === rowIdx && cIdx === colIdx ? 'green' : color
      )
    );
    setMatrix(newMatrix);
    const newClicks = [...clicks, { rowIdx, colIdx }];
    setClicks(newClicks);

    if (rowIdx === 2 && colIdx === 2) {
      setIsLastBoxClicked(true);
      changeColorsSequentially(newClicks);
    }
  };
  const changeColorsSequentially = async (clicksArray) => {
    for (let i = 0; i < clicksArray.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMatrix(prevMatrix =>
        prevMatrix.map((row, rIdx) =>
          row.map((color, cIdx) =>
            rIdx === clicksArray[i].rowIdx && cIdx === clicksArray[i].colIdx ? 'orange' : color
          )
        )
      );
    }
  };

  return (
    <div className="matrix">
      <h1>Color Matrix</h1>
      {matrix.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((color, colIdx) => (
            <div
              key={colIdx}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleBoxClick(rowIdx, colIdx)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
