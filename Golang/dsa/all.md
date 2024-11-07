# **Data Structures and Algorithms in Go (Golang)**

## **Arrays and Slices**

### **Array**

- **Definition**: A collection of elements with a fixed size. All elements in an array have the same type.
- **Syntax**:
  ```go
  var arr [5]int
  arr[0] = 10
  fmt.Println(arr)
  ```

- **Advantages**:
  - Simple and efficient for fixed-size collections.
  - Low-level memory control, making it fast.

- **Disadvantages**:
  - Fixed size. Not dynamically resizable.

- **When to use**:
  - When you know the size of the collection in advance and it's unlikely to change.

### **Slice**

- **Definition**: A dynamic, flexible version of arrays. Internally, slices are backed by arrays but can grow in size as needed.
- **Syntax**:
  ```go
  var s []int
  s = append(s, 1, 2, 3)
  fmt.Println(s)
  ```

- **Advantages**:
  - Dynamic size, easy to resize using `append()`.
  - Built-in support for slicing, making it very convenient to work with arrays.

- **Disadvantages**:
  - Uses underlying arrays, so excessive growing can lead to performance overhead.

- **When to use**:
  - When you need dynamic arrays that grow and shrink during the program's runtime.

### **Key Operations**
1. **Accessing Elements**: Constant time `O(1)`
2. **Appending**: Amortized time `O(1)`, but may trigger `O(n)` when resizing.
3. **Iterating**: Linear time `O(n)`

---

## **Linked Lists**

### **Singly Linked List**

- **Definition**: A linear data structure where each element points to the next. Unlike arrays, linked lists are dynamic and can grow or shrink in size.
- **Implementation**:
  ```go
  type Node struct {
      Value int
      Next  *Node
  }

  type LinkedList struct {
      Head *Node
  }

  func (l *LinkedList) Insert(val int) {
      newNode := &Node{Value: val}
      if l.Head == nil {
          l.Head = newNode
      } else {
          current := l.Head
          for current.Next != nil {
              current = current.Next
          }
          current.Next = newNode
      }
  }
  ```

- **Advantages**:
  - Dynamic size.
  - Inserting and deleting from the list is faster compared to arrays (especially at the start).

- **Disadvantages**:
  - Extra memory for storing the pointer.
  - No direct access to elements (need to traverse).

- **When to use**:
  - When frequent insertions and deletions are required.

### **Doubly Linked List**
- **Definition**: Similar to a singly linked list but has pointers to both the next and previous nodes.
- **Use Case**: When you need to traverse both forwards and backward efficiently.

---

## **Stacks**

### **Definition**
- A stack is a linear data structure that follows the LIFO (Last In, First Out) principle.
- **Syntax**:
  ```go
  type Stack struct {
      elements []int
  }

  func (s *Stack) Push(val int) {
      s.elements = append(s.elements, val)
  }

  func (s *Stack) Pop() int {
      if len(s.elements) == 0 {
          fmt.Println("Stack is empty")
          return -1
      }
      elem := s.elements[len(s.elements)-1]
      s.elements = s.elements[:len(s.elements)-1]
      return elem
  }
  ```

- **Operations**:
  1. **Push**: Adds an element to the stack.
  2. **Pop**: Removes the topmost element.
  3. **Peek**: Returns the top element without removing it.

- **Advantages**:
  - Simple and fast operations (`O(1)`).

- **Disadvantages**:
  - Limited access; only the top of the stack can be accessed.

- **When to use**:
  - Use when you need LIFO access, e.g., parsing expressions, managing function calls (recursion), etc.

---

## **Queues**

### **Definition**
- A queue is a linear structure that follows the FIFO (First In, First Out) principle.
- **Syntax**:
  ```go
  type Queue struct {
      elements []int
  }

  func (q *Queue) Enqueue(val int) {
      q.elements = append(q.elements, val)
  }

  func (q *Queue) Dequeue() int {
      if len(q.elements) == 0 {
          fmt.Println("Queue is empty")
          return -1
      }
      elem := q.elements[0]
      q.elements = q.elements[1:]
      return elem
  }
  ```

- **Operations**:
  1. **Enqueue**: Adds an element to the queue.
  2. **Dequeue**: Removes the front element.
  3. **Peek**: Gets the front element without removing it.

- **Advantages**:
  - Simple structure and operations (`O(1)`).

- **Disadvantages**:
  - Limited access; only the front element can be accessed.

- **When to use**:
  - Use when you need FIFO access, e.g., task scheduling, breadth-first search (BFS), etc.

---

## **Hash Maps (Maps in Go)**

### **Definition**
- Hash maps (called `map` in Go) store key-value pairs and offer fast access based on keys.
- **Syntax**:
  ```go
  m := make(map[string]int)
  m["age"] = 30
  fmt.Println(m["age"])
  ```

- **Operations**:
  1. **Insert**: Adds a key-value pair to the map.
  2. **Delete**: Removes a key-value pair.
  3. **Access**: Retrieves the value based on the key.

- **Advantages**:
  - Constant-time access (`O(1)`).
  - Easy to implement key-based access.

- **Disadvantages**:
  - Unordered data.
  - Uses more memory due to hashing.

- **When to use**:
  - When you need fast lookups and insertions by key.

---

## **Trees**

### **Binary Tree**

- **Definition**: A hierarchical data structure where each node has at most two children (left and right).
- **Example Implementation**:
  ```go
  type TreeNode struct {
      Value int
      Left  *TreeNode
      Right *TreeNode
  }

  func (t *TreeNode) Insert(val int) {
      if t == nil {
          return &TreeNode{Value: val}
      }
      if val < t.Value {
          t.Left = t.Left.Insert(val)
      } else {
          t.Right = t.Right.Insert(val)
      }
      return t
  }
  ```

- **Operations**:
  - **Insert**, **Search**, **Traversal** (Pre-order, In-order, Post-order).

- **When to use**:
  - When hierarchical data structure is required, e.g., representing file systems, and binary search trees (BST) for fast searching.

---

## **Heaps (Priority Queue)**

### **Definition**
- A heap is a specialized binary tree-based data structure that satisfies the heap property: the parent node is either greater (max-heap) or smaller (min-heap) than its children.
- **Implementation** in Go can be done using the `container/heap` package.

- **Operations**:
  - **Insert**: Insert an element and maintain heap property.
  - **ExtractMax/Min**: Extract the root element (max or min depending on the type of heap).

- **When to use**:
  - When you need priority-based ordering, e.g., job scheduling, shortest path algorithms (Dijkstra).

---

## **Graphs**

### **Definition**
- A graph is a collection of nodes (vertices) connected by edges.
- **Adjacency List Representation**:
  ```go
  type Graph struct {
      AdjList map[int][]int
  }

  func (g *Graph) AddEdge(v1, v2 int) {
      g.AdjList[v1] = append(g.AdjList[v1], v2)
      g.AdjList[v2] = append(g.AdjList[v2], v1)
  }
  ```

- **Operations**:
  - **AddEdge**, **DFS**, **BFS**, **Shortest Path**.

- **When to use**:
  - When dealing with connected entities, e.g., social networks, navigation systems, etc.
