define("modules/partials/minion", [], function() {
  
  return {
    updateCounter: function ($minion) {
      var count = Number($minion.data('count'));

      count++;

      $minion.data('count', count);
      $minion.find('.counter').text(count);

      localStorage.setItem('minion#' + $minion.data('id'), count);
    },

    template: function (minion) {

      var count = localStorage.getItem('minion#' + minion.id) || minion.count;

      var $li = $('<li></li>').addClass('item').attr({
        'data-count': count,
        'data-id': minion.id
      });

      var $img = $('<img>').attr({
        src: 'images/' + minion.image,
        alt: minion.title
      });

      var $span = $('<span></span>').addClass('counter').text(count);

      $li.append($img, $span);

      return $li;
    }
  }
});