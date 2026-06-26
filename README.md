# Pathfinding Visualizer

A visual tool that shows exactly how BFS, Dijkstra and A* navigate through a weighted grid to find the shortest path.

Built with React. The same algorithms are also implemented as a standalone C++ CLI tool in the `/cpp` folder.

🔗 Live Demo — https://path-finding-visualizer-bay.vercel.app/

---

## What makes this interesting

All three algorithms solve the same problem — find the shortest path from top left to bottom right avoiding walls. But they do it differently.

BFS treats every cell equally and finds the path with the least number of steps. Dijkstra accounts for cell weights and finds the path with the lowest total travel cost even if it means taking more steps. A* does the same as Dijkstra but uses a Manhattan distance heuristic to guide its search toward the destination — exploring fewer cells and reaching the answer faster.

The visualizer makes this difference visible. Watch how many cells each algorithm explores before finding the path — Dijkstra and A* visit fewer cells on weighted grids because they prioritize low cost paths, while BFS blindly explores in all directions equally.

---

## Features

- Weighted and unweighted grid modes — cells have travel costs of 1, 3 or 5
- Adjustable grid size and wall density
- Real time animation — watch the algorithm explore cells one by one
- Path highlights in yellow after traversal completes
- Stats after each run — time taken, path length, total cost, cells visited
- Compare all three algorithms on the same grid to see the difference

---

## Tech

React, Vite, CSS

---

## C++ Version

The `/cpp` folder contains a full CLI implementation of all three algorithms with execution time comparison using chrono. Supports both weighted and unweighted grids with user defined dimensions and wall density.
