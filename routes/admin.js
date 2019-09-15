var express = require("express");
var router = express.Router();

var userController = require("../controllers/user");
var orderDetailController = require("../controllers/orderdetail");
var placeController = require("../controllers/place");
var stadiumController = require("../controllers/stadium");
var stadiumTypeController = require("../controllers/stadiumtype");
var adminController = require("../controllers/admin");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/cacsancuaban", userController.isAdmin, function(req, res) {
  placeController.getAll(places => {
    page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var limit = 7;

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

    res.render("cacsancuaban");
  });
});

router.put("/cacsancuaban", urlencodedParser, (req, res) => {
  var id = req.body.placeId;
  var name = req.body.name;
  var streetnumber = req.body.streetnumber;
  var streetname = req.body.streetname;
  var phone = req.body.phone;
  var city = req.body.city;
  var district = req.body.district;

  placeController.updateById(
    id,
    name,
    streetname,
    streetnumber,
    city,
    phone,
    district,
    place => {
      res.status(204);
      res.end();
    }
  );
});

router.delete("/cacsancuaban", urlencodedParser, (req, res) => {
  var id = req.body.placeId;

  placeController.deleteById(id, () => {
    res.status(204);
    res.end();
  });
});

router.post("/cacsancuaban", urlencodedParser, (req, res) => {
  var name = req.body.name;
  var streetnumber = req.body.streetnumber;
  var streetname = req.body.streetname;
  var phone = req.body.phone;
  var city = req.body.city;
  var district = req.body.district;

  placeController.createRecord(
    name,
    streetname,
    streetnumber,
    city,
    phone,
    district,
    () => {
      res.status(204);
      res.end();
    }
  );
});
var stadias;

router.get("/loaisanvagia", userController.isAdmin, (req, res) => {
  placeController.getAll(places => {
    places = places.sort(function(a, b) {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });
    res.locals.places = places;
    res.locals.stadia = stadias;
    res.render("loaisanvagia");
  });
});

router.post("/loaisanvagia", urlencodedParser, (req, res) => {
  var id = req.body.placeId;
  console.log(id);
  placeController.getAll(places => {
    places = places.sort(function(a, b) {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });
    res.locals.places = places;

    stadiumController.getByPlaceId(id, stadia => {
      stadias = stadia;
      res.status(204);
      res.end();
    });
  });
});
router.put("/loaisanvagia", urlencodedParser, (req, res) => {
  var id = req.body.stadiumId;
  var name = req.body.name;
  var commonPrice = req.body.commonPrice;
  console.log(id + " " + name + " " + commonPrice);
  stadiumController.updateById(id, name, commonPrice, stadia => {
    res.status(204);
    res.end();
  });
});
router.delete("/loaisanvagia", urlencodedParser, (req, res) => {
  var id = req.body.stadiumId;
  stadiumController.deleteById(id, () => {
    res.status(204);
    res.end();
  });
});
router.get("/lichdatsan", userController.isAdmin, (req, res) => {
  orderDetailController.getAll(orderDetails => {
    page = parseInt(req.query.page);
    page = isNaN(page) ? 1 : page;
    var limit = 7;

    var pagination = {
      limit: limit,
      page: page,
      totalRows: orderDetails.length
    };

    var offset = (page - 1) * limit;
    orderDetails = orderDetails
      .sort(function(a, b) {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      })
      .slice(offset, offset + limit);

    res.locals.pagination = pagination;
    res.locals.hasPagination = pagination.totalRows / limit > 1;

    res.locals.orderDetails = orderDetails;
    res.render("lichdatsan");
  });
});

router.get("/thongke", userController.isAdmin, (req, res) => {
  placeController.getAll(places => {
    res.locals.places = places;

    stadiumTypeController.getDistinctType(types => {
      res.locals.types = types;
      res.render("thongke");
    });
  });
});

router.post(
  "/thongkedata",
  userController.isAdmin,
  urlencodedParser,
  (req, res) => {
    let startDay = req.body.startDay;
    let endDay = req.body.endDay;
    let place = req.body.place;
    let type = req.body.type;

    adminController.getStatisticalDataType1(
      place,
      type,
      startDay,
      endDay,
      (data) => {
        res.json(data);
      }
    );
  }
);
router.post(
  "/thongkedata1",
  userController.isAdmin,
  urlencodedParser,
  (req, res) => {
    let startDay = req.body.startDay;
    let endDay = req.body.endDay;

    adminController.getStatisticalDataType2(
      startDay,
      endDay,
      (data) => {
        res.json(data);
      }
    );
  }
);
router.post(
  "/thongkedata2",
  userController.isAdmin,
  urlencodedParser,
  (req, res) => {
    let startDay = req.body.startDay;
    let endDay = req.body.endDay;

    adminController.getStatisticalDataType3(
      startDay,
      endDay,
      (data) => {
        res.json(data);
      }
    );
  }
);
module.exports = router;
