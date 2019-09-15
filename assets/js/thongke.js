$(document).ready(function() {
  const menuIconEl = $(".menu-icon");
  const sidenavEl = $(".sidenav");
  const sidenavCloseEl = $(".sidenav__close-icon");
  const place = $("#selectTatCaCacSan");
  const type = $("#selectLoaiSan");

  const startDay1 = $("#idStartDay1");
  const endDay1 = $("#idEndDay1");
  const startDay2 = $("#idStartDay2");
  const endDay2 = $("#idEndDay2");
  const startDay3 = $("#idStartDay3");
  const endDay3 = $("#idEndDay3");

  const doanhThu = $("#tdDoanhThu");
  const luotDat = $("#tdLuotDat");
  const daThanhToan = $("#tdDaThanhToan");

  const btnApDung = $("#btnApDung");
  const btnApDung1 = $("#btnApDung1");
  const btnApDung2 = $("#btnApDung2");
  var pie = $("#pie-chart");
  var line = $("#line-chart");
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

  $(".datepicker").flatpickr({
    defaultDate: new Date(),
    enableTime: false,
    dateFormat: "F, d Y",
    wrap: true
  });

  btnApDung.on("click", () => {
    $.ajax({
      url: "/admin/thongkedata",
      type: "POST",
      data: {
        startDay: startDay1.val(),
        endDay: endDay1.val(),
        place: place.val(),
        type: type.val()
      },
      success: data => {
        daThanhToan.text(data.daThanhToan);
        luotDat.text(data.luotDat);
        doanhThu.text(data.doanhThu);
      }
    });
  });
  btnApDung1.on("click", () => {
    $.ajax({
      url: "/admin/thongkedata1",
      type: "POST",
      data: {
        startDay: startDay2.val(),
        endDay: endDay2.val()
      },
      success: data => {
        console.log(data);
        if (window.piechart) window.piechart.destroy();
        window.piechart = new Chart(pie, {
          type: "pie",
          data: {
            datasets: [
              {
                backgroundColor: ["#f3e8e5", "#f8dd5d", "#58bb89"],
                data: data
              }
            ],

            labels: ["Sân 5 người", "Sân 7 người", "Sân 11 người"]
          },
          options: {
            title: {
              display: true,
              text: "Tỉ lệ doanh thu của bạn"
            },
            rotation: -0.7 * Math.PI
          }
        });
      }
    });
  });
  btnApDung2.on("click", () => {
    $.ajax({
      url: "/admin/thongkedata2",
      type: "POST",
      data: {
        startDay: startDay3.val(),
        endDay: endDay3.val()
      },
      success: data => {
        console.log(data);
        if (window.linechart) window.linechart.destroy();
        window.linechart = new Chart(line, {
          type: "line",
          data: {
            datasets: [
              {
                data: data,
                label: "Doanh thu",
                borderColor: "#3e95cd",
                fill: false
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: "Doanh thu của bạn"
            },
            scales: {
              xAxes: [
                {
                  type: "time"
                }
              ],
            }
          }
        });
      }
    });
  });
});
