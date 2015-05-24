/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/ui/products',
  [
    'flight/component',
    'jquery',
    'basisTemplates',
    'components/data/productsData',
    'components/ui/product',
    'components/ui/gallery',
    'components/ui/imageView',
    'components/mixin/withTemplateSet'
  ],
  function(defineComponent, $, basis, productsData, product, gallery, imageView, withTemplateSet) {
    return defineComponent(Products, withTemplateSet);

    function Products() {
      this.defaultAttrs({
        template: "id:productTemplate",
        imageView: "#imageView"
      });

      /**
       *
       * @param data
       */
      this.render = function(data) {
        var template;
        this.$node.empty();

        for(var i = 0; i < data.length; i++) {
          template = bt(this.attr.template).createInstance();
          /*attach product component to the template*/
          product.attachTo(template.element, {
            template: template,
            container: this.$node
          });
          /*attach small gallery component to the template*/
          gallery.attachTo(template.element, {
            template: template
          });
          /*trigger event to change product*/
          this.trigger(template.element, 'changeProduct', {product: data[i]});
        }
      };

      this.after('initialize', function() {
        /**
         * listen an event to change products
         */
        this.on('changeProducts', function(event, params) {
          /*force change data trigger to init products*/
          this.trigger('changeData', params);
          /**
           * render products when products data changed
           */
          this.on('dataChanged', function(event, data) {
            this.render(data.products);
          }.bind(this));

        }.bind(this));

        productsData.attachTo(this.node);
        imageView.attachTo(this.attr.imageView);

        this.trigger('changeProducts', {});

      });
    }
  }
);