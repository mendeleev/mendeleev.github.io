/**
 * Created by andrii on 18.05.15.
 */

define(
  'components/ui/gallery',
  [
    'flight/component',
    'jquery',
    'components/data/galleriesData'
  ],
  function(defineComponent, jquery, galleriesData) {
    return defineComponent(Gallery);

    function Gallery() {
      this.defaultAttrs({
        template: {},
        thumbnail: "id:thumbnailTemplate",
        container: ".gallery",
        item: ".gallery li",
        mainPhoto: ".mainPhoto"
      });

      this.setGallery = function(data) {
        var template = bt(this.attr.thumbnail).createInstance();
        this.attr.template.set(
          'mainPhoto',
          ['images', data.id, data.images[0]].join('/')
        );

        if(data.images.length > 1) {
          for(var i = 1; i < data.images.length; i++) {
            template.set('gallery_id', data.id);
            template.set('photo', data.images[i]);
            this.select('container').append(
              $(template.element).clone()
            );
          }
        }
      };

      this.after('initialize', function() {
        this.on('galleryChanged', function(event, data) {
          this.setGallery(data);
        }.bind(this));

        this.on('changeProduct', function(event, data) {
          this.trigger('changeGallery', {
            galleryId:data.product.gallery_id
          });
        }.bind(this));

        this.on('click', {
          item: function(e) {
            this.select('mainPhoto').attr('src', e.target.src);
          }
        });

        galleriesData.attachTo(this.node);
      });
    }
  }
);