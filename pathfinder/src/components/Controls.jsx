function Controls({
  rows, setRows,
  cols, setCols,
  wallDensity, setWallDensity,
  isWeighted, setIsWeighted,
  algorithm, setAlgorithm,
  onGenerate,
  onVisualize,
  isVisualizing,
  stats,
}) {
  return (
    <div className="controls">
      <div className="inputs">
        <label>
          Rows
          <input
            type="number"
            value={rows}
            min={5}
            max={30}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </label>

        <label>
          Cols
          <input
            type="number"
            value={cols}
            min={5}
            max={50}
            onChange={(e) => setCols(Number(e.target.value))}
          />
        </label>

        <label>
          Wall Density (%)
          <input
            type="number"
            value={wallDensity}
            min={0}
            max={60}
            onChange={(e) => setWallDensity(Number(e.target.value))}
          />
        </label>

        <label>
          Grid Type
          <select value={isWeighted} onChange={(e) => setIsWeighted(e.target.value === "true")}>
            <option value="false">Unweighted</option>
            <option value="true">Weighted</option>
          </select>
        </label>

        <label>
          Algorithm
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="bfs">BFS</option>
            <option value="dijkstra">Dijkstra</option>
            <option value="astar">A*</option>
          </select>
        </label>
      </div>

      <div className="buttons">
        <button className="btn btn-generate" onClick={onGenerate} disabled={isVisualizing}>
          Generate Maze
        </button>
        <button className="btn btn-visualize" onClick={onVisualize} disabled={isVisualizing}>
          Visualize
        </button>
      </div>

      {stats && (
        <div className="stats">
          {stats.noPath ? (
            <span style={{ color: "#e74c3c", fontWeight: "700" }}>
              No Valid Path Exists!
            </span>
          ) : (
            <>
              <span>Time: {stats.time} ms</span>
              <span>Path Length: {stats.pathLength}</span>
              <span>Total Cost: {stats.totalCost}</span>
              <span>Cells Visited: {stats.visited}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Controls;