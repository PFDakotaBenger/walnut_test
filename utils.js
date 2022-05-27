// Utils
const cache = require("./api")
const fetch = require("node-fetch")
async function fetchWithCache(id, time) {
  console.log("here")
  const now = new Date().getTime()
  if (!(cache[id] === id)) {
    cache[id] = await fetchTagInfo(id)

  } else return cache[id]
  } 

async function fetchTagInfo(tags) { 
  console.log("here fetch")
    const promises = tags.map((tag) => {
        console.log(tag)
        fetch(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`).then((res) => {
        console.log(res)    
        response = res.json()
        console.log(response)
    })
})

const data = await Promise.all(promises)
return data
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