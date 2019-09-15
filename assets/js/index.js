$(document).ready(function() {
  $(".datepicker").flatpickr({
    enableTime: false,
    dateFormat: "F, d Y",
    wrap: true
  });
  $(".timepicker").flatpickr({
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: "H:i"
  });
});
