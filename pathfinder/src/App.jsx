import { useState } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import { bfs, dijkstra, astar } from "./utils/algorithms";
import "./App.css";

function App() {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(30);
  const [wallDensity, setWallDensity] = useState(30);
  const [isWeighted, setIsWeighted] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [grid, setGrid] = useState([]);
  const [cellState, setCellState] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [stats, setStats] = useState(null);

  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const randWall = Math.floor(Math.random() * 100);
        if (randWall < wallDensity) {
          row.push(-1);
        } else {
          if (isWeighted) {
            const weights = [1, 3, 5];
            row.push(weights[Math.floor(Math.random() * 3)]);
          } else {
            row.push(1);
          }
        }
      }
      newGrid.push(row);
    }
    newGrid[0][0] = 1;
    newGrid[rows - 1][cols - 1] = 1;
    setGrid(newGrid);
    setCellState(Array.from({ length: rows }, () => Array(cols).fill("empty")));
    setStats(null);
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const visualize = async () => {
    if (grid.length === 0) {
      alert("Please generate a maze first!");
      return;
    }

    setIsVisualizing(true);
    setCellState(Array.from({ length: rows }, () => Array(cols).fill("empty")));
    setStats(null);

    const startTime = performance.now();

    let result;
    if (algorithm === "bfs") result = bfs(grid, rows, cols);
    else if (algorithm === "dijkstra") result = dijkstra(grid, rows, cols);
    else result = astar(grid, rows, cols);

    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);

    const { visitedOrder, path } = result;

    for (let k = 0; k < visitedOrder.length; k++) {
      const [i, j] = visitedOrder[k];
      await sleep(15);
      setCellState((prev) => {
        const next = prev.map((r) => [...r]);
        next[i][j] = "visited";
        return next;
      });
    }

    for (let k = 0; k < path.length; k++) {
      const [i, j] = path[k];
      await sleep(30);
      setCellState((prev) => {
        const next = prev.map((r) => [...r]);
        next[i][j] = "path";
        return next;
      });
    }

    let totalCost = 0;
    for (let [i, j] of path) {
      if (grid[i][j] !== -1) totalCost += grid[i][j];
    }

    if (path.length === 0) {
      setStats({
        time: timeTaken,
        pathLength: 0,
        totalCost: 0,
        visited: visitedOrder.length,
        noPath: true,
      });
    } else {
      setStats({
        time: timeTaken,
        pathLength: path.length,
        totalCost,
        visited: visitedOrder.length,
        noPath: false,
      });
    }

    setIsVisualizing(false);
  };

  return (
    <div className="app">
      <h1 className="title">Pathfinding Visualizer</h1>
      <p className="subtitle">Visualize BFS, Dijkstra and A* on a weighted grid</p>

      <Controls
        rows={rows} setRows={setRows}
        cols={cols} setCols={setCols}
        wallDensity={wallDensity} setWallDensity={setWallDensity}
        isWeighted={isWeighted} setIsWeighted={setIsWeighted}
        algorithm={algorithm} setAlgorithm={setAlgorithm}
        onGenerate={generateGrid}
        onVisualize={visualize}
        isVisualizing={isVisualizing}
        stats={stats}
      />

      {grid.length > 0 && (
        <Grid
          grid={grid}
          rows={rows}
          cols={cols}
          cellState={cellState}
        />
      )}
    </div>
  );
}

export default App;