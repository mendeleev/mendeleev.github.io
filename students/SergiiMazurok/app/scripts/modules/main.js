define("modules/main", [
    "modules/partials/gallery",
    "modules/partials/minion",
    "jquery"
], function(gallery, minion, $) {

  var $gallery = $('ul.gallery');

  $gallery.on('click', 'li.item', function (e) {
    minion.updateCounter($(this));
  });

  gallery.init($gallery);

});