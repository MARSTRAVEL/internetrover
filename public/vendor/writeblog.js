$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});

const addHtmltag = () => {
  let currentContent
  $('#htmltag li').on("click", function() {
    let exp = $(this).attr('value');
    currentContent = $('#contenttextarea').val();
    $('#contenttextarea').text(currentContent + exp);
  });
};
addHtmltag();
