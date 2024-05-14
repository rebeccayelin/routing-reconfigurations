const graph = new graphology.Graph();
polyomino.forEach(node => {
  graph.addNode(node);
  let [x, y] = node.split(',').map(Number);
  let neighbors = [
    `${x - 1},${y}`,
    `${x + 1},${y}`,
    `${x},${y - 1}`,
    `${x},${y + 1}`
  ];

  neighbors.forEach(neighbor => {
    if (polyomino.has(neighbor)) {
      graph.addEdge(node, neighbor);
    }
  });
});

// Now you can run various algorithms provided by Graphology
