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
