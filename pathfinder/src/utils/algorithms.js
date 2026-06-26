const DIRECTIONS = [[-1,0],[1,0],[0,-1],[0,1]];

function getNeighbors(i, j, rows, cols){
  const neighbors = [];
  for(let [di, dj] of DIRECTIONS){
    const ni = i + di;
    const nj = j + dj;
    if(ni >= 0 && ni < rows && nj >= 0 && nj < cols){
      neighbors.push([ni, nj]);
    }
  }
  return neighbors;
}

function reconstructPath(parent, rows, cols){
  const path = [];
  let i = rows - 1;
  let j = cols - 1;
  while(i !== 0 || j !== 0){
    path.push([i, j]);
    const [pi, pj] = parent[i][j];
    i = pi;
    j = pj;
  }
  path.push([0, 0]);
  return path.reverse();
}

export function bfs(grid, rows, cols){
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));
  const parent = Array.from({length: rows}, () => Array(cols).fill(null));
  const visitedOrder = [];
  const queue = [[0, 0]];
  visited[0][0] = true;

  while(queue.length > 0){
    const [i, j] = queue.shift();
    visitedOrder.push([i, j]);

    if(i === rows - 1 && j === cols - 1){
      return { visitedOrder, path: reconstructPath(parent, rows, cols) };
    }

    for(let [ni, nj] of getNeighbors(i, j, rows, cols)){
      if(!visited[ni][nj] && grid[ni][nj] !== -1){
        visited[ni][nj] = true;
        parent[ni][nj] = [i, j];
        queue.push([ni, nj]);
      }
    }
  }
  return { visitedOrder, path: [] };
}

export function dijkstra(grid, rows, cols){
  const dist = Array.from({length: rows}, () => Array(cols).fill(Infinity));
  const parent = Array.from({length: rows}, () => Array(cols).fill(null));
  const visitedOrder = [];
  const pq = [[0, 0, 0]]; // [cost, row, col]
  dist[0][0] = 0;

  while(pq.length > 0){
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, i, j] = pq.shift();

    if(cost > dist[i][j]) continue;
    visitedOrder.push([i, j]);

    if(i === rows - 1 && j === cols - 1){
      return { visitedOrder, path: reconstructPath(parent, rows, cols) };
    }

    for(let [ni, nj] of getNeighbors(i, j, rows, cols)){
      if(grid[ni][nj] !== -1){
        const newCost = dist[i][j] + grid[ni][nj];
        if(newCost < dist[ni][nj]){
          dist[ni][nj] = newCost;
          parent[ni][nj] = [i, j];
          pq.push([newCost, ni, nj]);
        }
      }
    }
  }
  return { visitedOrder, path: [] };
}

export function astar(grid, rows, cols){
  const dist = Array.from({length: rows}, () => Array(cols).fill(Infinity));
  const parent = Array.from({length: rows}, () => Array(cols).fill(null));
  const visitedOrder = [];
  dist[0][0] = 0;
  const h = (i, j) => Math.abs(rows - 1 - i) + Math.abs(cols - 1 - j);
  const pq = [[h(0, 0), 0, 0, 0]]; // [f, g, row, col]

  while(pq.length > 0){
    pq.sort((a, b) => a[0] - b[0]);
    const [, g, i, j] = pq.shift();

    if(g > dist[i][j]) continue;
    visitedOrder.push([i, j]);

    if(i === rows - 1 && j === cols - 1){
      return { visitedOrder, path: reconstructPath(parent, rows, cols) };
    }

    for(let [ni, nj] of getNeighbors(i, j, rows, cols)){
      if(grid[ni][nj] !== -1){
        const newG = dist[i][j] + grid[ni][nj];
        if(newG < dist[ni][nj]){
          dist[ni][nj] = newG;
          parent[ni][nj] = [i, j];
          const f = newG + h(ni, nj);
          pq.push([f, newG, ni, nj]);
        }
      }
    }
  }
  return { visitedOrder, path: [] };
}