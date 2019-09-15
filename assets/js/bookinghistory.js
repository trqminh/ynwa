$(document).ready(function() {
  $(".btnOrdersDetails").on("click", e => {
    var id = $(e.target).data("id");
    $.ajax({
      url: "/users/history/orderDetail/" + id,
      type: "GET",
      success: res => {
        console.log(res);
        var body = "";
        res.forEach(element => {
          body += "<tr class='text-center'>";
          body += "<th scope='row'>" + element.Stadium.name + "</th>";
          body += "<th scope='row'>" + element.start + "</th>";
          body += "<th scope='row'>" + element.end + "</th>";
          body += "<th scope='row'>" + element.price + "</th>";
          body += "</tr>";
        });
        $(".modal-body tbody").html(body);
      }
    });
  });
  $(".btnHuy").on("click", e => {
    var id = $(e.target).data("id");
    $.ajax({
      url: "/users/history/order/delete",
      type: "POST",
      data:{orderId: id},
      success: res => {
        if (res == "OK") {
          alert("Delete Complete");
          location.reload(true);
        }
      }
    });
  });
});
