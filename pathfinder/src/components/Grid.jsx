function Grid({ grid, rows, cols, cellState }) {
  const getCellColor = (i, j) => {
    if (i === 0 && j === 0) return "#2ecc71";
    if (i === rows - 1 && j === cols - 1) return "#e74c3c";
    if (cellState[i][j] === "path") return "#f1c40f";
    if (cellState[i][j] === "visited") return "#a8d8ea";
    if (grid[i][j] === -1) return "#2c3e50";
    if (grid[i][j] === 5) return "#c8d6e5";
    if (grid[i][j] === 3) return "#dfe6e9";
    return "#ffffff";
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 20px)`,
        gridTemplateRows: `repeat(${rows}, 20px)`,
      }}
    >
      {grid.map((row, i) =>
        row.map((_, j) => (
          <div
            key={`${i}-${j}`}
            className="grid-cell"
            style={{ backgroundColor: getCellColor(i, j) }}
          />
        ))
      )}
    </div>
  );
}

export default Grid;