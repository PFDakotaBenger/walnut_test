const express = require('express');
const router = express.Router();
const {sortby, fetchWithCache} = require("./utils")
const cache = {}
const sortByParams = ["id","reads","likes","popularity"]
const directonParams = ["desc","asc"]
router.get('/api/ping', function (req, res) {
    // DONE
    res.json({"success":true});
});

app = express()


router.get('/api/posts', function (req, res) {
    options = req.query
    console.log(options)
    if (!options.tags) {
        res.status(400);
        res.json({"error":"Tags parameter is required"})
    }

    if (!sortByParams.indexOf(options.sortBy)) {
        res.status(400);
        res.json({"error":"sortBy parameter is invalid"})
    } 

    if (!directonParams.indexOf(options.direction)) {
        res.json({"error":"direction parameter is invalid"})
    }

    const tags = options.tags.split(',');

    // Make Request Here (Find a way to do concurent requests)
    // Then Remove Duplicates
    console.log(tags)
    let data = await fetchWithCache(tags,1000000000000)
    data = [...new Set(data.posts)]

    // Then Sort Responses By Param (Quick Sort)
    if (options.sortBy) {
        if (options.direction === "desc") {
            sortedResponse = data.sort(sortby(`${options.sortBy}`,true,parseInt))
        } else {
            sortedResponse = data.sort(sortby(`${options.sortBy}`,false,parseInt))

        }
        } else {
            if (options.direction === "desc") {
                sortedResponse = data.sort(sortby("id",true,parseInt))
            } else {
                sortedResponse = data.sort(sortby("id",false,parseInt))
            }
    
        }
    
    res.json({"posts": sortedResponse});
  });

  app.use(router)
  let port = process.env.PORT || 5000;

  app.listen(port, () => console.log(`Listening on port ${4000}...`));

module.exports = {cache};