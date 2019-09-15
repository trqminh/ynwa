$(document).ready(function() {
  $(".search_icon").click(() => {
    var query = $(".search_input").val();
    $(location).attr("href", "/search?query=" + query);
  });
});
