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
  sidenavCloseEl.on("click", function() {
    toggleClassName(sidenavEl, "active");
  });


});

function UpdatePlace(clicked_id){
  if (confirm("Bạn có chắc muốn sửa đổi không?")){
    var len = clicked_id.length;
    var placeId = clicked_id.slice(6, len);
    
    var attrList = ['name', 'streetnumber', 'streetname', 'city', 'phone', 'district'];
    var sendData = {};
  
    for (var i = 0; i< attrList.length; i++){
      var tmp = $(`#${attrList[i]}${placeId}`).val() ;
      if (tmp == ''){
        tmp = $(`#${attrList[i]}${placeId}`).attr('placeholder');
      }  
  
      sendData[`${attrList[i]}`] = tmp;
    }
  
    sendData.placeId = placeId;
    //console.log(sendData);
  
    $.ajax({
      type:'PUT',
      url: '/admin/cacsancuaban',
      data: sendData,
      success: (data) =>{
        alert('Cập nhật thành công');
        location.reload();
      }
    });
  }
  
}

function DeletePlace(clicked_id) {
  if (confirm("Bạn có chắc muốn xóa địa điểm này?")){
    var len = clicked_id.length;
    var placeId = clicked_id.slice(6, len);

    $.ajax({
      type: 'DELETE',
      url: '/admin/cacsancuaban',
      data:{
        placeId: placeId
      },
      success: (data)=>{
        alert('Xóa thành công địa điểm');
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
