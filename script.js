class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(dataArray) {
    this.root = buildTree(dataArray);
  }
}

function buildTree(dataArray) {
  const sortedArray = Array.from(new Set(dataArray)).sort((a, b) => a - b);
  return buildTreeRecursively(sortedArray, 0, sortedArray.length - 1);
}

function buildTreeRecursively(sortedArray, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(sortedArray[mid]);

  node.left = buildTreeRecursively(sortedArray, start, mid - 1);
  node.right = buildTreeRecursively(sortedArray, mid + 1, end);

  return node;
}

function insert(node, value) {
  if (node === null) {
    return new Node(value);
  }

  if (value < node.data) {
    node.left = insert(node.left, value);
  } else if (value > node.data) {
    node.right = insert(node.right, value);
  }

  return node;
}

function deleteNode(node, value) {
  if (node === null) {
    return null;
  }

  if (value < node.data) {
    node.left = deleteNode(node.left, value);
  } else if (value > node.data) {
    node.right = deleteNode(node.right, value);
  } else {
    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    }

    const minValue = findMinValue(node.right);
    node.data = minValue;
    node.right = deleteNode(node.right, minValue);
  }

  return node;
}

function findMinValue(node) {
  let minValue = node.data;
  while (node.left !== null) {
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

function find(node, value) {
  if (node === null || node.data === value) {
    return node;
  }

  if (value < node.data) {
    return find(node.left, value);
  } else {
    return find(node.right, value);
  }
}

function levelOrder(node, callback) {
  if (node === null) {
    return [];
  }

  const queue = [node];
  const values = [];

  while (queue.length > 0) {
    const current = queue.shift();
    values.push(current.data);
    if (current.left !== null) {
      queue.push(current.left);
    }
    if (current.right !== null) {
      queue.push(current.right);
    }
    if (typeof callback === "function") {
      callback(current);
    }
  }

  return values;
}

function inorder(node, callback) {
  if (node === null) {
    return [];
  }

  const values = [];

  function traverse(node) {
    if (node.left !== null) {
      traverse(node.left);
    }
    values.push(node.data);
    if (typeof callback === "function") {
      callback(node);
    }
    if (node.right !== null) {
      traverse(node.right);
    }
  }

  traverse(node);

  return values;
}

function preorder(node, callback) {
  if (node === null) {
    return [];
  }

  const values = [];

  function traverse(node) {
    values.push(node.data);
    if (typeof callback === "function") {
      callback(node);
    }
    if (node.left !== null) {
      traverse(node.left);
    }
    if (node.right !== null) {
      traverse(node.right);
    }
  }

  traverse(node);

  return values;
}

function postorder(node, callback) {
  if (node === null) {
    return [];
  }

  const values = [];

  function traverse(node) {
    if (node.left !== null) {
      traverse(node.left);
    }
    if (node.right !== null) {
      traverse(node.right);
    }
    values.push(node.data);
    if (typeof callback === "function") {
      callback(node);
    }
  }

  traverse(node);

  return values;
}

function height(node) {
  if (node === null) {
    return -1;
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);

  return Math.max(leftHeight, rightHeight) + 1;
}

function depth(node) {
  if (node === null) {
    return 0;
  }

  return depth(node.parent) + 1;
}

function isBalanced(node) {
  if (node === null) {
    return true;
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);
  const heightDiff = Math.abs(leftHeight - rightHeight);

  if (heightDiff > 1) {
    return false;
  }

  return isBalanced(node.left) && isBalanced(node.right);
}

function rebalance(tree) {
  const sortedArray = inorder(tree.root);
  return new Tree(sortedArray);
}

function printNodeData(node) {
  console.log(node.data);
}

// Driver script
const randomNumbers = [1, 7, 4, 23, 8, 14, 4, 3, 5, 7, 9, 67, 6345, 324];

const bst = new Tree(randomNumbers);

console.log("Is tree balanced:", isBalanced(bst.root));

console.log("Level Order:");
levelOrder(bst.root, printNodeData);

console.log("Preorder:");
preorder(bst.root, printNodeData);

console.log("Postorder:");
postorder(bst.root, printNodeData);

console.log("Inorder:");
inorder(bst.root, printNodeData);

console.log("Unbalancing the tree...");
insert(bst.root, 150);
insert(bst.root, 200);
insert(bst.root, 300);

console.log("Is tree balanced:", isBalanced(bst.root));

console.log("Rebalancing the tree...");
const balancedTree = rebalance(bst);

console.log("Is tree balanced:", isBalanced(balancedTree.root));

console.log("Level Order:");
levelOrder(balancedTree.root, printNodeData);

console.log("Preorder:");
preorder(balancedTree.root, printNodeData);

console.log("Postorder:");
postorder(balancedTree.root, printNodeData);

console.log("Inorder:");
inorder(balancedTree.root, printNodeData);
