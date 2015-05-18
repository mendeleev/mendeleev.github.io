/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/data/galleriesData',
  [
    'flight/component',
    'jquery'
  ],
  function (defineComponent, $) {
    return defineComponent(Galleries);

    function Galleries() {
      this.defaultAttrs({
        apiUrl: "data/galleries.json"
      });

      this.getGallery = function (galleryId) {
        return $.ajax({url: this.attr.apiUrl}).then(function(data) {
          var result = {};
          for(var i = 0; i < data.galleries.length; i++) {
            if(data.galleries[i].id === galleryId) {
              result = data.galleries[i];
              break;
            }
          }

          return result;
        });
      };

      this.after('initialize', function () {
        this.on('changeGallery', function(event, params) {
          this.getGallery(params.galleryId).then(function(data) {
            this.trigger('galleryChanged', data);
          }.bind(this));
        }.bind(this));
      });
    }
  }
);