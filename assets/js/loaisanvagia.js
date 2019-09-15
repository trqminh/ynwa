$(document).ready(function() {
  const menuIconEl = $(".menu-icon");
  const sidenavEl = $(".sidenav");
  const sidenavCloseEl = $(".sidenav__close-icon");

  // Add and remove provided class names
  function toggleClassName(el, className) {
    if (el.hasClass(className)) {
      el.removeClass(className);
    } else {
      el.addClass(className);
    }
  }

  // Open the side nav on click
  menuIconEl.on("click", function() {
    toggleClassName(sidenavEl, "active");
  });

  // Close the side nav on click
  sidenavCloseEl.on("", function() {
    toggleClassName(sidenavEl, "active");
  });

  $(".btnPlace").on("click", e => {
    $(".btnPlace").removeClass("active");
    $(e.target).addClass("active");
    var id = $(e.target).data("id");
    $.ajax({
      url: "/admin/loaisanvagia",
      type: "POST",
      data: {
        placeId: id
      },
      success: res => {
        console.log(res);
        location.reload();
      }
    });
  });
});

function UpdateStadium(clicked_id){
  if (confirm("Bạn có chắc muốn sửa đổi không?")){
    var len = clicked_id.length;
    var stadiumId = clicked_id.slice(4, len);
    var attrList = ['name', 'commonPrice'];
    var sendData = {};
  
    for (var i = 0; i< attrList.length; i++){
      var tmp = $(`#${attrList[i]}${stadiumId}`).val() ;
      if (tmp == ''){
        tmp = $(`#${attrList[i]}${stadiumId}`).attr('placeholder');
      }  
  
      sendData[`${attrList[i]}`] = tmp;
    }
  
    sendData.stadiumId= stadiumId;
    console.log(sendData);
  
    $.ajax({
      type:'PUT',
      url: '/admin/loaisanvagia',
      data: sendData,
      success: (data) =>{
        alert('Cập nhật thành công');
        location.reload();
      }
    });
  }
  
}

function DeleteStadium(clicked_id) {
  if (confirm("Bạn có chắc muốn xóa sân này?")){
    var len = clicked_id.length;
    var stadiumId = clicked_id.slice(13, len);

    $.ajax({
      type: 'DELETE',
      url: '/admin/loaisanvagia',
      data:{
        stadiumId: stadiumId
      },
      success: (data)=>{
        alert('Xóa sân thành công');
        location.reload();
      }
    });
  }
}

function AddPlace(){
  var attrList = ['name', 'streetnumber', 'streetname', 'city', 'phone', 'district'];
  var sendData = {};

  for (var i = 0; i< attrList.length; i++){
    var tmp = $(`#add${attrList[i]}`).val() ;
    if (tmp == ''){
      tmp = $(`#add${attrList[i]}`).attr('placeholder');
    }  

    sendData[`${attrList[i]}`] = tmp;
  }
  
  $.ajax({
    type: 'POST',
    url: '/admin/cacsancuaban',
    data: sendData,
    success: (data)=>{
      alert('Thêm mới thành công');
      location.reload();
    }
  });
}

