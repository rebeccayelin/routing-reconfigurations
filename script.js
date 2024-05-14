const canvas = document.getElementById('polyominoCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 10; // 10x10 grid
const squareSize = canvas.width / gridSize;

let polyomino = new Set(); // Stores stringified coordinates (x,y) of selected squares
let currentGraph = buildGraph(polyomino);
// console.log(currentGraph);

function drawGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
        }
    }
}

function fillSquare(x, y) {
    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function clearSquare(x, y) {
    ctx.clearRect(x * squareSize, y * squareSize, squareSize, squareSize);
    ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function isConnectedAfterRemoval(squareToCheck, keyToRemove) {
    // Perform a BFS to check connectivity
    let visited = new Set();
    let queue = [squareToCheck];

    while (queue.length > 0) {
        let current = queue.shift();
        if (!visited.has(current) && current !== keyToRemove) {
            visited.add(current);

            let [x, y] = current.split(',').map(Number);
            let neighbors = [
                `${x - 1},${y}`,
                `${x + 1},${y}`,
                `${x},${y - 1}`,
                `${x},${y + 1}`
            ];

            for (let neighbor of neighbors) {
                if (polyomino.has(neighbor) && !visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    // Check if all squares except the removed one are visited
    return visited.size === polyomino.size - 1;
}

function toggleSquare(i, j) {
    const key = `${i},${j}`;

    if (polyomino.has(key)) {
        // Find a square that's not the one being removed to start the connectivity check
        let startSquare = Array.from(polyomino).find(k => k !== key);
        if (!startSquare || isConnectedAfterRemoval(startSquare, key)) {
            polyomino.delete(key);
            clearSquare(i, j);
        }
    } else {
        // Adding a square, ensure it's adjacent to at least one square in the polyomino
        const neighbors = [
            `${i - 1},${j}`,
            `${i + 1},${j}`,
            `${i},${j - 1}`,
            `${i},${j + 1}`
        ];

        const isAdjacent = neighbors.some(neighbor => polyomino.has(neighbor));
        if (polyomino.size === 0 || isAdjacent) {
            polyomino.add(key);
            fillSquare(i, j);
        }
    }
}


canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const i = Math.floor(x / squareSize);
    const j = Math.floor(y / squareSize);

    toggleSquare(i, j);
    currentGraph = buildGraph(polyomino);
    console.log(currentGraph);
});

drawGrid();



function buildGraph(polyomino) {
    let graph = {};

    polyomino.forEach(node => {
        let [x, y] = node.split(',').map(Number);
        graph[node] = [];

        // Check each of the four possible adjacent squares
        let neighbors = [
            `${x - 1},${y}`,
            `${x + 1},${y}`,
            `${x},${y - 1}`,
            `${x},${y + 1}`
        ];

        neighbors.forEach(neighbor => {
            if (polyomino.has(neighbor)) {
                graph[node].push(neighbor);
            }
        });
    });

    return graph;
}



