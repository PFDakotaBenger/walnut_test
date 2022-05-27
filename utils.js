// Utils
const cache = require("./api")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
async function fetchWithCache(id, time) {
  const now = new Date().getTime()
  if (!(cache[id] === id)) {
    cache[id] = await fetchTagInfo(id)
    return cache[id]

  } else {return cache[id]}
  } 

async function fetchTagInfo(tags) {
  const data_arr = []
    const promises = await tags.map((tag) => {
        fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`).then((res) => {
        return res.json()
    }).then((json) => {
      console.log("json",json)
      data_arr.push(json["posts"])
    })
})
await Promise.all(promises)
console.log(data_arr)
return data_arr
}



  const sortby = (field, reverse, primer) => {

    const key = primer ?
      function(x) {
        return primer(x[field])
      } :
      function(x) {
        return x[field]
      };
  
    reverse = !reverse ? 1 : -1;
  
    return function(a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }

  module.exports = {sortby,fetchWithCache}