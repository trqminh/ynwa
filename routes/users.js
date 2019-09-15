var express = require("express");
var router = express.Router();

var userController = require("../controllers/user");
var orderController = require("../controllers/order");
var orderDetailController = require("../controllers/orderdetail");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get("/login", (req, res) => {
  req.session.returnURL = req.query.returnURL;
  res.render("login", { layout: "signin-up" });
});

router.get("/register", (req, res) => {
  res.render("register", { layout: "signin-up" });
});

router.post("/login", urlencodedParser, function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  userController.getUserByEmail(email, function(user) {
    if (!user) {
      res.render("login", { layout: "signin-up", error: "No email is found" });
    } else {
      userController.comparePassword(password, user.password, function(
        isMatch
      ) {
        if (!isMatch) {
          res.render("login", {
            layout: "signin-up",
            error: "Incorrect Password"
          });
        } else {
          req.session.user = user;
          if (req.session.returnURL) {
            res.redirect(req.session.returnURL);
          } else {
            if (user.isAdmin === true) {
              res.redirect("/admin/cacsancuaban");
            } else {
              res.redirect("/");
            }
          }
        }
      });
    }
  });
});

router.post("/register", urlencodedParser, function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var confirm = req.body.confirm;
  var username = req.body.username;
  var phone = req.body.phone;
  var address = req.body.address;

  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Please enter a valid email").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("confirm", "Confirm Password is required").notEmpty();
  req
    .checkBody("confirm", "Confirm Password must match with Password")
    .equals(password);
  req.checkBody("username", "Name is required").notEmpty();
  req.checkBody("phone", "Phone is required").notEmpty();
  req.checkBody("phone", "Please enter a valid phone number").isMobilePhone();
  req.checkBody("address", "Address is required").notEmpty();

  var errors = req.validationErrors();

  console.log(errors);
  if (errors) {
    res.render("register", { layout: "signin-up", errors: errors });
  } else {
    userController.getUserByEmail(email, function(user) {
      if (user) {
        res.render("register", {
          layout: "signin-up",
          error: `Email ${email} exists! Please choose another email.`
        });
      } else {
        var user = {
          name: username,
          phone: phone,
          address: address,
          imagepath: "../assets/img/defaultuser.jpg",
          email: email,
          password: password,
          isAdmin: false
        };
        userController.createUser(user, function(err) {
          if (err) throw err;
          res.render("login", {
            layout: "signin-up",
            error: "You have registered, now please login"
          });
        });
      }
    });
  }
});

router.get("/logout", function(req, res) {
  req.session.user = null;
  res.redirect("/");
});

router.get("/profile", userController.isLoggedIn, function(req, res) {
  res.render("profile");
});

router.get("/history", userController.isLoggedIn, function(req, res) {
  orderController.getById(req.session.user.id, booking => {
    res.locals.booking = booking;
    res.render("bookinghistory");
  });
});
router.get("/history/orderDetail/:id", userController.isLoggedIn, function(
  req,
  res
) {
  var id = req.params.id;
  orderDetailController.getByOrderId(id, orderDetails => {
    res.send(orderDetails);
  });
});

router.post(
  "/profile/update",
  userController.isLoggedIn,
  urlencodedParser,
  function(req, res) {
    var name = req.body.name;
    var address = req.body.address;
    var phone = req.body.phone;
    userController.updateProfile(
      req.session.user.id,
      name === "" ? req.session.user.name : name,
      address === "" ? req.session.user.address : address,
      phone === "" ? req.session.user.phone : phone,
      user => {
        //   console.log(user[1].dataValues.name);
        req.session.user.name = user[1].dataValues.name;
        req.session.user.address = user[1].dataValues.address;
        req.session.user.phone = user[1].dataValues.phone;
        req.session.save();
        res.sendStatus(200);
      }
    );
  }
);
router.post(
  "/history/order/delete",
  userController.isLoggedIn,
  urlencodedParser,
  function(req, res) {
    var id = req.body.orderId;
    console.log(id);
    orderController.deleteById(id, () => {
      // res.json(req.session);
      res.send("OK");
    });
  }
);

module.exports = router;
