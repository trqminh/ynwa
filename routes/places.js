var express = require("express");
var router = express.Router();
var placeController = require("../controllers/place");
var stadiumTypeController = require("../controllers/stadiumtype");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var page = 1;

router.get("/", (req, res) => {
  placeController.getAll(places => {
    page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var limit = 4;

    var pagination = {
      limit: limit,
      page: page,
      totalRows: places.length
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
    placeController.getDistinctDistrict(districts => {
      res.locals.districts = districts;
      placeController.getDistinctCity(cities => {
        res.locals.cities = cities;
        stadiumTypeController.getDistinctType(types => {
          res.locals.types = types;
          console.log(types);
          res.render("index");
        });
      });
    });
  });
});

router.get("/:id", (req, res) => {
  var id = req.params.id;

  placeController.getById(id, place => {
    page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var limit = 3;

    var pagination = {
      limit: limit,
      page: page,
      totalRows: place.Stadia.length
    };

    var offset = (page - 1) * limit;
    place.Stadia = place.Stadia.sort(function(a, b) {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    }).slice(offset, offset + limit);

    res.locals.pagination = pagination;
    res.locals.hasPagination = pagination.totalRows / limit > 1;
    res.locals.place = place;

    res.render("detail");
  });
});

module.exports = router;
