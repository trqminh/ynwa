$(document).ready(function() {
  $("#btnUpdate").on("click", () => {
    var name = $("#name");
    var address = $("#address");
    var phone = $("#phone");
    $.ajax({
      url: "/users/profile/update",
      type: "POST",
      data: {
        name: name.val(),
        address: address.val(),
        phone: phone.val()
      },
      success: res => {   
        console.log(res);     
        if (res == "OK") {
          alert("Update Complete");
          location.reload(true);
        }
      }
    });
  });
});
