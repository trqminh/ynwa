"use strict";

function getTypeByIntervalID(intervalId) {
  if (intervalId < 11) {
    return 3;
  } else if ((intervalId >= 11 && intervalId <= 13) || intervalId == 18) {
    return 2;
  }

  return 1;
}

module.exports = function Cart(oldCart) {
  this.items = oldCart.items || [];
  this.address = oldCart.address || {};
  this.paymentMethod = oldCart.paymentMethod || "COD";

  this.add = (stadium, intervalId, datePicked) => {
    var flag = true;
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].stadium.id == stadium.id &&
        this.items[i].intervalId == intervalId &&
        this.items[i].datePicked.toString().slice(0, 15) ==
          datePicked.toString().slice(0, 15)
      ) {
        flag = false;
        break;
      }
    }
    if (flag) {
      var item = {};
      item.stadium = stadium;
      item.intervalId = intervalId;
      item.datePicked = datePicked;
      this.items.push(item);
    }
  };

  this.remove = (stadiumId, intervalId, datePicked) => {
    var delIndex = -1;
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].stadium.id == stadiumId &&
        this.items[i].intervalId == intervalId &&
        this.items[i].datePicked == datePicked
      ) {
        delIndex = i;
        break;
      }
    }

    if (delIndex != -1) {
      this.items.splice(delIndex, 1);
    }
  };

  this.empty = () => {
    this.items = [];
  };

  this.getInfoAndTotalPrice = () => {
    var res = {};
    var infoList = [];
    var info = {};
    var totalPrice = 0;
    for (var i = 0; i < this.items.length; i++) {
      var itemStadium = this.items[i].stadium;
      //info.stadiumId = itemStadium.id;

      info.stadiumId = itemStadium.id;
      info.intervalId = this.items[i].intervalId;
      info.datePicked = this.items[i].datePicked;

      info.stadiumName = itemStadium.name;
      info.stadiumType = itemStadium.StadiumType.name;
      var tmp = this.items[i].intervalId + 4;
      info.timeDisplay =
        `${tmp}:00 - ${tmp + 1}:00 ` +
        this.items[i].datePicked.toString().slice(0, 15);

      var intervalType = getTypeByIntervalID(this.items[i].intervalId);
      info.price =
        parseFloat(itemStadium.StadiumType.basePrice) +
        parseFloat((3 - intervalType) * 50000);
      info.address = itemStadium.Place.name;
      info.imagepath = itemStadium.Place.imagepath;

      totalPrice += info.price;

      // for payment
      info.orderDetail = {};
      info.orderDetail.Date = this.items[i].datePicked;
      info.orderDetail.start = `${tmp}:00:00`;
      info.orderDetail.end = `${tmp + 1}:00:00`;
      info.orderDetail.price = info.price;
      info.orderDetail.StadiumId = itemStadium.id;

      infoList.push(info);
      info = {};
    }

    res.infoList = infoList;
    res.totalPrice = totalPrice;
    res.totalQuantity = this.items.length;

    return res;
  };
};
