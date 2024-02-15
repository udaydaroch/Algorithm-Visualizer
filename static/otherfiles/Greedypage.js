document.addEventListener("DOMContentLoaded", function() {
  const selectedAlgorithms = new Set();

  const algorithmSelect = document.getElementById("algorithm-select");
  const addAlgorithmButton = document.getElementById("add-algorithm");
  const algorithmList = document.getElementById("algorithm-list");

  addAlgorithmButton.addEventListener("click", function() {
      const selectedAlgorithm = algorithmSelect.value;
      if (!selectedAlgorithms.has(selectedAlgorithm)) {
          selectedAlgorithms.add(selectedAlgorithm);
          updateDropdownOptions();
          renderAlgorithmList(selectedAlgorithm);
      }
  });

  function updateDropdownOptions() {
      const selectedOptions = Array.from(selectedAlgorithms);
      let selectedIndex = 0;
      let allOptionsDisabled = true;
      for (let i = algorithmSelect.options.length - 1; i >= 0; i--) {
          const option = algorithmSelect.options[i];
          if (!selectedOptions.includes(option.value)) {
              selectedIndex = i;
              option.disabled = false;
              allOptionsDisabled = false;
          } else {
              option.disabled = true;
          }
      }
      algorithmSelect.selectedIndex = selectedIndex;

      addAlgorithmButton.disabled = allOptionsDisabled;
  }

  function renderAlgorithmList(algorithm) {
      const cardWrapper = document.createElement("div");
      cardWrapper.classList.add("card", "mb-2", "d-inline-block");
      const listItem = document.createElement("div");
      listItem.classList.add("card-body");
      listItem.innerHTML = `
          <span> ${algorithm} </span>
          <button class="btn btn-danger btn-sm ms-2" data-algorithm="${algorithm}">Remove</button>
      `;
      cardWrapper.appendChild(listItem);
      algorithmList.appendChild(cardWrapper);

      listItem.querySelector("button").addEventListener("click", function() {
          const algorithmToRemove = this.getAttribute("data-algorithm");
          selectedAlgorithms.delete(algorithmToRemove);
          updateDropdownOptions();
          algorithmList.removeChild(cardWrapper);
      });
  }

  const visualizeButton = document.getElementById("visualize");

  // Add the event listener for the "Visualize" button
  visualizeButton.addEventListener("click", visualizeButtonClickHandler);

  function visualizeButtonClickHandler() {
      // Generate and retrieve the graph data
const { nodes, edges } = generateOctagonWithTriangles(10);
console.log('Nodes:', nodes);
console.log('Edges:', edges);
  }
});

function generateOctagonWithTriangles(numNodes) {
  const graph = document.getElementById('graph');
  const nodes = [];
  const edges = new Set(); // Using a Set to store unique edge combinations

  // Generate octagon vertices
  const centerX = graph.offsetWidth / 2;
  const centerY = graph.offsetHeight / 2;
  const radius = Math.min(centerX, centerY) * 0.8;
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  angles.forEach(angle => {
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    const node = createNode(x, y);
    graph.appendChild(node);
    nodes.push({ id: nodes.length + 1, x: x, y: y });
  });

  // Generate additional nodes between octagon vertices
  // Generate additional nodes between octagon vertices
for (let i = 0; i < nodes.length; i++) {
  const nodeA = nodes[i];
  const nodeB = nodes[(i + 1) % nodes.length]; // Next vertex
  const additionalNodes = Math.floor(Math.random() * 3) + 1; // Random number of additional nodes (1 to 3)
  for (let j = 1; j <= additionalNodes; j++) {
    const ratio = j / (additionalNodes + 1); // Ratio of distance along the line between vertices
    const x = nodeA.x + (nodeB.x - nodeA.x) * ratio;
    const y = nodeA.y + (nodeB.y - nodeA.y) * ratio;
    const node = createNode(x, y);
    graph.appendChild(node);
    nodes.push({ id: nodes.length + 1, x: x, y: y });
    if (nodes.length >= numNodes) break; // Terminate loop if the desired number of nodes is reached
  }
  if (nodes.length >= numNodes) break; // Terminate the outer loop if the desired number of nodes is reached
}


  // Connect vertices to form octagon
  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    const nodeB = nodes[(i + 1) % nodes.length]; // Next node
    edges.add(createEdge(nodeA, nodeB));
  }

  // Connect center to form triangles
  const centerNode = { x: centerX, y: centerY };
  nodes.forEach(node => {
    edges.add(createEdge(node, centerNode));
  });

  return { nodes, edges: Array.from(edges) };
}

function createNode(x, y) {
  const node = document.createElement('div');
  node.className = 'node';
  node.style.left = x + 'px';
  node.style.top = y + 'px';
  return node;
}

function createEdge(nodeA, nodeB) {
  const edgeCombination = [nodeA.id, nodeB.id].sort().join('-');
  const startX = nodeA.x;
  const startY = nodeA.y;
  const endX = nodeB.x;
  const endY = nodeB.y;
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)); // Calculate length
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI); // Calculate angle

  const edge = document.createElement('div');
  edge.className = 'edge';
  edge.style.left = startX + 'px';
  edge.style.top = startY + 'px';
  edge.style.width = length + 'px';
  edge.style.transformOrigin = '0% 0%'; // Set transform origin to starting point
  edge.style.transform = `rotate(${angle}deg)`; // Rotate the edge

  return edgeCombination;
}
