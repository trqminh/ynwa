(() => {
  var li = document.getElementsByClassName("pagination")[0].getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
    li[i].classList.add("page-item");
    li[i].getElementsByTagName("a")[0].classList.add("page-link");
  }
})();

function getTypeBySessionID(sessId){
  if (sessId < 11) {
    return 3;
  }
  else if ((sessId >= 11 && sessId <= 13) || sessId == 18) {
    return 2;
  }

  return 1;
}

function getSessionIdAndTypeByInterval(interval) {
  var tmp = parseInt(interval.slice(0,2));
  var result = {};

  result['sessId'] = tmp - 5 + 1;
  result['type'] = getTypeBySessionID(result['sessId']);

  return result;
}

function handleDataFromServer(data){
  $('.bg-danger').each(function(index){
    var strId = $(this).attr('id')
    if (strId != undefined){
      var sessId = parseInt(strId.slice(7, strId.length));
      var getType = getTypeBySessionID(sessId);
      
      $(`#session${sessId} input`).show();

      if (getType == 3){
        $(`#session${sessId}`).toggleClass('bg-danger bg-light');
      }
      else if (getType == 2){
        $(`#session${sessId}`).toggleClass('bg-danger bg-warning');  
      }
      else {
        $(`#session${sessId}`).toggleClass('bg-danger bg-success'); 
      }
    }
  });

  for (var i = 0; i < data.length; i++) {  
    var interval = data[i].start + data[i].end;
    var idAndType = getSessionIdAndTypeByInterval(interval);

    $(`#session${idAndType['sessId']} input`).hide();

    if (idAndType['type'] == 3){
      $(`#session${idAndType['sessId']}`).toggleClass('bg-light bg-danger');
    }
    else if (idAndType['type'] == 2){
      $(`#session${idAndType['sessId']}`).toggleClass('bg-warning bg-danger');  
    }
    else {
      $(`#session${idAndType['sessId']}`).toggleClass('bg-success bg-danger'); 
    }
    
  }
}


function please(){

  var stadiumId = 0;
  var datePicked = new Date();

  $(document).ready(()=>{
    $('ul.pagination li a').on('click',function(e){
      $(this).removeAttr('href');

      var page = $(this).text();
      var path = window.location.pathname;
      
      $.ajax({
        type: 'GET',
        url: path +'?page='+ page,
        data: {
          'page': page
        },
        success: (data) => {
          //console.log(data);
          
          var main_overview = data.indexOf('<div id = "stadiumList">');
          var nav = data.indexOf('<nav>');
          var end = data.indexOf('</nav>');
          var mainView = data.slice(main_overview, nav-6);
          var paginateView = data.slice(nav, end);

          const myscript = `

            var li = document.getElementsByClassName("pagination")[0].getElementsByTagName("li");
            for (var i = 0; i < li.length; i++) {
              li[i].classList.add("page-item");
              li[i].getElementsByTagName("a")[0].classList.add("page-link");
            }
          `;

          $("#stadiumList").html(mainView);
          $("nav").html(paginateView);
          eval(myscript);
          please();
          
        }
      });
    });


    $("#stadiumList .btn").each(function(index) {
        $(this).on("click", () => {
          
          stadiumId = $(this).attr('id');
          console.log(stadiumId);

          
          $('.main-card__item').show();

          DatePick();

          

          $.ajax({
            type: 'GET',
            url: '/stadiums/' + stadiumId,
            success: function(data) {
              handleDataFromServer(data);
            }

          });

        });
    });

    // on click datepicker
    function DatePick(){
      $(".datepicker").flatpickr({
            enableTime: false,
            dateFormat: "F, d Y",
            wrap: true,
            defaultDate: [new Date()],
            onChange: function(selectedDates, dateStr, instance) {
              selectedDates.forEach(function(date) {
                datePicked = date;
                $.ajax({
                  type: 'POST',
                  url: '/stadiums/' + stadiumId + '/product',
                  data: {
                    date: date.toString().slice(0,15)
                  },
                  success: function(data) {
                    //console.log(data.length);

                    handleDataFromServer(data);
                  }

                });


              });
            }
          });
    }

    // button add cart
    $('#addcart').on("click", () => {
      var intervalList = [];
      
      for (var i = 1; i < 19; i++) {
        var isCheck = $(`#session${i} input`).is(":checked");
        if (isCheck) {
          intervalList.push(i);
        }
      }

      
      $.ajax({
        type: 'POST',
        url: '/cart',
        dataType: 'json',
        data: {
          stadiumId: stadiumId,
          intervalList: intervalList,
          datePicked: datePicked
        },
        traditional: true,
        success: function(data){
          //location.reload();
          alert('Đã thêm vào giỏ hàng của bạn');
        }
      });

    });
    

  });
}

please();