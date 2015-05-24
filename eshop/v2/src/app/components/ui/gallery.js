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
        mainPhoto: ".mainPhoto img",
        title: ".title",
        imageView: "#imageView",
        index: 0
      });

      /**
       * set gallery data to the template
       * @param data
       */
      this.setGallery = function(data) {
        var template = bt(this.attr.thumbnail).createInstance();
        this.attr.template.set(
          'mainPhoto',
          ['images', data.id, data.images[0]].join('/')
        );

        if(data.images.length > 1) {
          for(var i = 1; i < data.images.length; i++) {
            template.set('gallery_id', data.id);
            template.set('photo',
              ['images', data.id, data.images[i]].join('/')
            );
            template.set('index', i);
            /*attach gallery to container*/
            this.select('container').append(
              $(template.element).clone()
            );
          }
        }
      };

      this.after('initialize', function() {
        var currentData;
        /**
         * set gallery when gallery data is ready
         */
        this.on('galleryChanged', function(event, data) {
          currentData = data;
          this.setGallery(data);
        }.bind(this));

        /**
         * changeProduct listener
         */
        this.on('changeProduct', function(event, data) {
          this.trigger('changeGallery', {
            galleryId:data.product.gallery_id
          });
        }.bind(this));

        /**
         * clicks listener
         */
        this.on('click', {
          item: function(e) {
            this.attr.index = Number($(e.target).data('index'));
            this.select('mainPhoto').attr('src', e.target.src);
          },
          mainPhoto: function() {
            currentData.index = this.attr.index;
            this.trigger(this.attr.imageView, 'showImage', currentData);
          },
          title: function() {
            currentData.index = this.attr.index;
            this.trigger(this.attr.imageView, 'showImage', currentData);
          }
        });

        galleriesData.attachTo(this.node);
      });
    }
  }
);