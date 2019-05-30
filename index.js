class Node {
  constructor (key, value) {
    this.key   = key
    this.data  = [value]
    this.left  = null
    this.right = null
  }
}

class BTree {
  constructor () {
    this.root = null
  }

  insert (key, value) {
    if (this.root == null) {
      this.root = this.__insert(this.root, key, value)
    }
    
    else {
      this.__insert(this.root, key, value)
    }

  }

  search(key) {
    return this.__search(key, this.root)
  }

  __insert (node, key, value) {
    if (node == null) {
      return new Node(key, value)
    }
    
    else if (key < node.key) {
      node.left = this.__insert(node.left, key, value)
    }

    else if (key > node.key) {
      node.right = this.__insert(node.right, key, value)
    }

    else {
      node.data.push(value)
    }

    return node
  }

  __search(key, node) {
    if (node == null) {
      return -1
    }
    else if (key === node.key) {
      return node.data
    }
    else if (key < node.key) {
      return this.__search(key, node.left)
    }
    else {
      return this.__search(key, node.right)
    }
  }
}

class MemStorage {
  /**
   * 
   * @param {*} indexColumn cloumn name for index, only string
   * @param {*} type data-type of index field, only string and number data-type allowed allowed
   */
  constructor (indexColumn, type) {
    if (!indexColumn || typeof indexColumn != "string") {
      throw "error: Please specify index-field"
    }

    if (!type) {
      throw "error: Please specify index data type"
    }

    if (type != "string" && type != "number") {
      throw "error: Index can be number or string."
    }

    this.indexColumn = indexColumn
    this.indexType   = type
    this.storage     = []
    this.indexStore  = new BTree()
  }

  /**
   * Public Function to search data with given indexField
   * @param {Object} query {indexField: value}
   * 
   */
  search (query) {
    let result    = []
    let locations = this.__indexSearch(query)
    locations.forEach(location => result.push(this.storage[location]))
    
    return result
  }

  /**
   * Public Function to insert data as Object
   * @param {Object} data {indexField: value, field2: value2, field3: value3}
   * 
   */
  insert (data) {
    if (!data || !data[this.indexColumn]) {
      throw "error: Please enter valid data. Data Without Index Field."
    }

    var indexValue = data[this.indexColumn]

    if (this.indexType && typeof indexValue != this.indexType ) {
      throw "error: Please insert data with valid data-type for index-field"
    }

    var location = this.storage.length
    
    this.storage.push(data)

    this.__updateIndexStore(indexValue, location)
  }

  __updateIndexStore (indexValue, location) {
    this.indexStore.insert(indexValue, location)
  }

  __indexSearch(query) {
    if (!query || typeof query != "object" || !query[this.indexColumn]) {
      return []
    }

    var location = this.indexStore.search(query[this.indexColumn])

    return (location == -1) ? [] : location
  }
}

module.exports = MemStorage





