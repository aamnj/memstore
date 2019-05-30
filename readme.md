```
const Storage = require(./index.js)
const storage = new Storage("age", "number")

storage.insert({age:22, name: "Alice"})
storage.insert({age:21, name: "Eve"})
storage.insert({age:23, name: "Bob"})
storage.insert({age:22, name: "Julie"})

const data = storage.search({age: 22})
console.log(data)

output
[
  {age:22, name:"Alice"}
  {age:22, name:"Julie"}
]

```
