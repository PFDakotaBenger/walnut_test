// Utils
const cache = require("./api")

async function fetchWithCache(id, time) {
  const now = new Date().getTime()
  if (id in cache && !((cache[id].id === id) || cache[id]["cacheTimer"] < now)) {
    cache[id] = await fetchTagInfo(id)
    cache[id].cacheTimer = getCacheTimer(time)
  }
return cache[id]
  } 

async function fetchTagInfo(tags) { 
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
function getCacheTimer(time) {
    const now = new Date().getTime()
    if (cacheTimer < now + time) {
      cacheTimer = now + time
    }
    return cacheTimer
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