function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

//! 108. Convert Sorted Array to Binary Search Tree
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  return traverse(nums, 0, nums.length - 1);
};

function traverse(nums, start, end) {
  if (start > end) {
    return null;
  }

  let mid = Math.floor((start + end) / 2);
  let root = new TreeNode(nums[mid]);
  root.left = traverse(nums, start, mid - 1);
  root.right = traverse(nums, mid + 1, end);
  return root;
}

//! 109. Convert Sorted List to Binary Search Tree

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  let nums = [];
  let currentListNode = head;
  while (currentListNode) {
    nums.push(currentListNode.val);
    currentListNode = currentListNode.next;
  }

  const sortedListToBSTHelper = (nums, start, end) => {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new TreeNode(nums[mid]);
    root.left = sortedListToBSTHelper(nums, start, mid - 1);
    root.right = sortedListToBSTHelper(nums, mid + 1, end);
    return root;
  };

  return sortedListToBSTHelper(nums, 0, nums.length - 1);
};

//! 653. Two Sum IV - Input is a BST
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */

const inOrderTraverse = (node, cb) => {
  if (node !== null) {
    inOrderTraverse(node.left, cb);
    cb(node.val);
    inOrderTraverse(node.right, cb);
  }
};

var findTarget = function (root, k) {
  /**
   * Definition for a binary tree node.
   * function TreeNode(val, left, right) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.left = (left===undefined ? null : left)
   *     this.right = (right===undefined ? null : right)
   * }
   */
  /**
   * @param {TreeNode} root
   * @param {number} k
   * @return {boolean}
   */

  var findTarget = function (root, k) {
    // const queue = [root];
    const map = {};

    //     while (queue.length) {
    //       const node = queue.shift();
    //       if ((map[k - node.val]) !== undefined) {
    //         return true
    //       }
    //       map[node.val] = k - node.val;

    //           console.log(map)
    //         console.log(map[k - node.val])
    //       if (node.left) {
    //         queue.push(node.left);
    //       }

    //       if (node.right) {
    //         queue.push(node.right)
    //       }
    //     }

    const preOrderTraverse = (node) => {
      if (node !== null) {
        if (map[k - node.val] !== undefined) {
          res = true;
        }
        map[node.val] = k - node.val;
        preOrderTraverse(node.left);
        preOrderTraverse(node.right);
      }
    };

    let res = false;
    preOrderTraverse(root);
    return res;
  };
};

//! 783. Minimum Distance Between BST Nodes
//! 530. Minimum Absolute Difference in BST
var getMinimumDifference = function (root) {
  let prev = null;
  let min = Infinity;
  function inOrderTraverse(node) {
    if (node !== null) {
      inOrderTraverse(node.left);
      if (prev === null) {
        prev = node.val;
      } else {
        min = Math.min(min, node.val - prev);
        prev = node.val;
      }
      inOrderTraverse(node.right);
    }
  }

  inOrderTraverse(root);
  return min;

  // const nodes = [];

  // function inOrderTraverse(node) {
  //   if (node !== null) {
  //     inOrderTraverse(node.left);
  //     nodes.push(node.val);
  //     inOrderTraverse(node.right);
  //   }
  // }

  // inOrderTraverse(root);
  // let min = Infinity;
  // for (let i = 1; i < nodes.length; i++) {
  //   min = Math.min(min, nodes[i] - nodes[i - 1]);
  // }
  // return min;
};

//! 897. Increasing Order Search Tree
var increasingBST1 = function (root) {
  const nodesValues = [];
  function inOrder(node) {
    if (node !== null) {
      inOrder(node.left);
      nodesValues.push(node.val);
      inOrder(node.right);
    }
  }
  inOrder(root);
  let newTree = new TreeNode(nodesValues[0]);
  let tmpTree = newTree;

  for (let i = 1; i < nodesValues.length; i++) {
    tmpTree.right = new TreeNode(nodesValues[i]);
    tmpTree = tmpTree.right;
  }

  return newTree;
};

var increasingBST2 = function (root) {
  let newTree = new TreeNode(-1);
  let tmpTree = newTree;
  function inOrder(node) {
    if (node !== null) {
      inOrder(node.left);
      tmpTree.right = new TreeNode(node.val);
      tmpTree = tmpTree.right;
      inOrder(node.right);
    }
  }
  inOrder(root);
  return newTree.right;
};

//! 101. Symmetric Tree
var isSymmetric = function (root) {
  let res = true;

  function isMirror(node1, node2) {
    if (!node1 && !node2) {
      return;
    }
    if (!node1 || !node2 || node1.val !== node2.val) {
      res = false;
      return;
    }

    isMirror(node1.left, node2.right);
    isMirror(node1.right, node2.left);
  }

  isMirror(root, root);
  return res;
};

//! 104. Maximum Depth of Binary Tree

var maxDepth = function (root) {
  const helper = (node) => {
    if (node) {
      return 1 + Math.max(helper(node.left), helper(node.right));
    }
    return 0;
  };

  return helper(root);
};

//! 94. Binary Tree Inorder Traversal

var inorderTraversal = function (root) {
  const values = [];
  function inOrder(node) {
    if (node) {
      inOrder(node.left);
      values.push(node.val);
      inOrder(node.right);
    }
  }

  inOrder(root);
  return values;
};

//! 100. Same Tree
var isSameTree = function (p, q) {
  if (!p && !q) {
    return true;
  }

  if (!p || !q || p.val !== q.val) {
    return false;
  }

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

//! 110. Balanced Binary Tree
var isBalanced = function (root) {
  if (!root) {
    return true;
  }

  const height = (node) => {
    if (node) {
      return 1 + Math.max(height(node.left), height(node.right));
    }
    return 0;
  };
  let heightLeftSub = height(root.left);
  let heightRightSub = height(root.right);

  if (Math.abs(heightLeftSub - heightRightSub) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
};

//! 112. Path Sum
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }

  if (root.left === null && root.right === null && targetSum === root.val) {
    return true;
  }

  return (
    hasPathSum(root.left, targetSum - node.val) ||
    hasPathSum(root.right, targetSum) - node.val
  );
  /* 
    var hasPathSum = function(root, sum) {
      return dfs(root, 0, sum);
  };

  var dfs = function(curr, currentSum, targetSum) {
      if (!curr) {
          return false;
      }

      currentSum += curr.val;
      
      if (curr.left === null && curr.right === null) {
          return currentSum === targetSum;
      }
      
      return dfs(curr.left, currentSum, targetSum) || dfs(curr.right, currentSum, targetSum);
  }
  */
};

//! 98. Validate Binary Search Tree
/*
var isValidBST = function (root) {
  let values = [];
  const dfs = (node) => {
    if (node) {
      dfs(node.left);
      values.push(node.val);
      dfs(node.right);
    }
  };

  dfs(root);
  for (let i = 1; i < values.length; i++) {
    if (values[i] < values[i - 1] || values[i] === values[i - 1]) {
      return false;
    }
  }

  return true;
};
*/
var isValidBST = function (root) {
  const valid = (node, left, right) => {
    if (!node) {
      return true;
    }
    console.log("node:", node, "left:", left, "right:", right);
    if (!(node.val < right && node.val > left)) return false;

    return (
      valid(node.left, left, node.val) && valid(node.right, node.val, right)
    );
  };

  return valid(root, -Infinity, +Infinity);
};

//! 226. Invert Binary Tree
var invertTree = function (root) {
  if (!root) return root;
  const newRoot = new TreeNode(root.val);
  const header = newRoot;
  const helper = (node, root) => {
    if (node) {
      if (node.left) {
        root.right = new TreeNode(node.left.val);
      }

      if (node.right) {
        root.left = new TreeNode(node.right.val);
      }

      helper(node.left, root.right);
      helper(node.right, root.left);
    }
  };

  helper(root, newRoot);
  return header;
};

//! 654. Maximum Binary Tree
var constructMaximumBinaryTree = function (nums) {
  const maxElem = Math.max(...nums);
  const indexMaxElem = nums.indexOf(maxElem);
  let leftPart = nums.slice(0, indexMaxElem);
  let rightPart = nums.slice(indexMaxElem + 1);

  const root = new TreeNode(maxElem);
  if (leftPart.length) {
    root.left = constructMaximumBinaryTree(leftPart);
  }

  if (rightPart.length) {
    root.right = constructMaximumBinaryTree(rightPart);
  }

  return root;
};

//! 450. Delete Node in a BST

function minNode(node) {
  if (node.left === null) {
    return node;
  } else {
    return minNode(node.left);
  }
}

function removeNode(node, data) {
  if (node === null) {
    return null;
  } else if (data < node.val) {
    node.left = removeNode(node.left, data);
    return node;
  } else if (data > node.val) {
    node.right = removeNode(node.right, data);
    return node;
  } else {
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    if (node.left === null) {
      node = node.right;
      return node;
    } else if (node.right === null) {
      node = node.left;
      return node;
    }
    let newNode = minNode(node.right);
    node.val = newNode.val;
    node.right = removeNode(node.right, newNode.val);
    return node;
  }
}

var deleteNode = function (root, key) {
  return removeNode(root, key);
};

//! 106. Construct Binary Tree from Inorder and Postorder Traversal

// [9, 3, 15, 20, 7], [9, 15, 7, 20, 3]
// [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90], [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]
// [4, 10, 15, 18, 22, 25, 50], [4, 10, 18, 22, 15, 50, 25]

var buildTree = function (inorder, postorder) {
  /*
  const separatorValue = postorder.pop();
  const root = new TreeNode(separatorValue);

  const separatorInorderIndex = inorder.indexOf(separatorValue);
  const leftInorder = inorder.slice(0, separatorInorderIndex);
  const rightInorder = inorder.slice(separatorInorderIndex + 1);

  let leftPostOrder = [];
  let rightPostOrder = [];

  for (let i = 0; i < postorder.length; i++) {
    const elem = postorder[i];
    if (leftInorder.includes(elem)) {
      leftPostOrder.push(elem);
    } else {
      rightPostOrder.push(elem);
    }
  }

  if (leftInorder.length || leftInorder.length) {
    root.left = buildTree(leftInorder, leftPostOrder);
  }

  if (rightInorder.length || rightPostOrder.length) {
    root.right = buildTree(rightInorder, rightPostOrder);
  }

  return root;
  */

  function buildTreeRec(inorder, i1, i2, postorder, p1, p2) {
    if (i1 >= i2 || p1 >= p2) {
      return null;
    }

    const root = new TreeNode(postorder[p2 - 1]);
    let it = 0;
    for (let i = i1; i < i2; i++) {
      if (postorder[p2 - 1] === inorder[i]) {
        it = i;
      }
    }

    let diff = it - i1;

    root.left = buildTreeRec(inorder, i1, i1 + diff, postorder, p1, p1 + diff);
    root.right = buildTreeRec(
      inorder,
      i1 + diff + 1,
      i2,
      postorder,
      p1 + diff,
      p2 - 1
    );

    return root;
  }

  let n = inorder.length;

  if (n === 0) {
    return;
  }

  return buildTreeRec(inorder, 0, n, postorder, 0, n);
};
