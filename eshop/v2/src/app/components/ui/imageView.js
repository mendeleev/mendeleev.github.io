/**
 * Created by andrii on 24.05.15.
 */


"use strict";

define(
  "components/ui/imageView",
  [
    "flight/component",
    "jquery"
  ],
  function(defineComponent, $) {
    return defineComponent(ImageView);

    function ImageView() {
      this.defaultAttrs({
        data: {},
        prev: ".prev",
        next: ".next",
        remove: ".icon-delete",
        image: "img"
      });

      /**
       * next image
       */
      this.next = function() {
        this.attr.data.index = (this.attr.data.index + 1) % this.attr.data.images.length;
        this.showImage(this.attr.data.index);
      };

      /**
       * previous image
       */
      this.prev = function() {
        this.attr.data.index -= 1;
        if(this.attr.data.index < 0) {
          this.attr.data.index = this.attr.data.images.length-1;
        }
        this.showImage(this.attr.data.index);
      };

      /**
       * replace and image src
       * @param index
       */
      this.showImage = function(index) {
        this.select('image').attr('src', [
          'images',
          this.attr.data.id,
          this.attr.data.images[index]
        ].join('/'));
      };

      this.after('initialize', function(e) {

        this.on('showImage', function(e ,data) {
          this.attr.data = data;
          this.showImage(data.index);
          this.$node.toggleClass('hide');
        }.bind(this));

        /*listen control keys*/
        this.on(document, 'keyup', function(e) {
          switch(e.keyCode) {
            /*escape key pressed*/
            case 27:
              this.$node.addClass('hide');
              break;
            /*left arrow */
            case 37:
              if(this.attr.data.id) {
                this.select('prev').click();
              }
              break;
            /*right arrow*/
            case 39:
              if(this.attr.data.id) {
                this.select('next').click();
              }
              break;
          }
        });

        /**
         * clicks listener
         */
        this.on('click', {
          remove: function() {
            this.$node.toggleClass('hide');
          },
          prev: function() {
            this.prev();
          },
          next: function() {
            this.next();
          }
        });

      });
    }
  }
);