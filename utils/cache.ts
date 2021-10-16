class Node {
  key: string;
  value: unknown;
  next: Node;
  prev: Node;
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  size: number;
  head: Node;
  tail: Node;
  maxSize: number;
  cache: { [index: string]: Node };

  constructor(maxSize = 100) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cache = {};
    this.maxSize = maxSize;
  }

  set(key, value) {
    let newNode = this.cache[key];
    if (!newNode) {
      newNode = new Node(key, value);
    }

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      this.cache[key] = newNode;
      return this;
    }

    if (this.size === this.maxSize) {
      delete this.cache[this.tail.key];

      this.tail = this.tail.prev;
      this.tail.next = null;
      this.size--;
    }

    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
    this.size++;

    this.cache[key] = newNode;
    return this;
  }
  get(key) {
    if (!this.cache[key]) {
      return null;
    }

    let node = this.cache[key];

    if (node === this.head) {
      return node.value;
    }

    let previous = node.prev;
    let next = node.next;

    if (node === this.tail) {
      this.tail.next = null;
      this.tail = previous;
    } else {
      previous.next = next;
      next.prev = previous;
    }

    this.head.prev = node;
    node.next = this.head;
    node.prev = null;
    this.head = node;

    return node.value;
  }

  remove(key) {
    let node = this.cache[key];
    if (!node) {
      return false;
    }

    if (node === this.head) {
      this.head = node.next;
      this.head.prev = null;
    } else if (node === this.tail) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      let previous = node.prev;
      let next = node.next;
      previous.next = next;
      next.prev = previous;
    }

    this.size--;

    return true;
  }
}

export default LRUCache;
