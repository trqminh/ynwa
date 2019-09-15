var express = require("express");
var router = express.Router();
//Search controller
var searchController = require("../controllers/search");

router.get("/", (req, res) => {
  searchController.search(req.query.query, places => {
    page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var limit = 4;

    var pagination = {
      limit: limit,
      page: page,
      totalRows: places.length,
      queryParams: {query:req.query.query}
    };

    var offset = (page - 1) * limit;
    places = places
      .sort(function(a, b) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      })
      .slice(offset, offset + limit);
    res.locals.pagination = pagination;
    res.locals.hasPagination = pagination.totalRows / limit > 1;
    res.locals.places = places;
    res.locals.query = req.query.query;
    res.render("search");
  });
});

module.exports = router;
