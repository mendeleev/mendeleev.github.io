define("modules/partials/gallery", ["modules/partials/minion"], function(minion) {
  
  return {
    init: function ($gallery) {
      $.getJSON('minions.json')
        .done(function (minions) {
          minions.forEach(function (item) {
            $gallery.append(minion.template(item));
          });
        })
        .fail(function () {
          alert('error');
        });
    }
  }
});