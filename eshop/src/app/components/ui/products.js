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
    'components/mixin/withTemplateSet'
  ],
  function(defineComponent, $, basis, productsData, product, gallery, withTemplateSet) {
    return defineComponent(Products, withTemplateSet);

    function Products() {
      this.defaultAttrs({
        template: "id:productTemplate"
      });

      this.setProducts = function(data) {
        var template;
        this.$node.empty();

        for(var i = 0; i < data.length; i++) {
          template = bt(this.attr.template).createInstance();
          product.attachTo(template.element, {
            template: template,
            container: this.$node
          });
          gallery.attachTo(template.element, {
            template: template
          });
          this.trigger(template.element, 'changeProduct', {product: data[i]});
        }
      };

      this.after('initialize', function() {

        this.on('changeProducts', function(event, params) {
          this.trigger('changeData', params);
          this.on('dataChanged', function(event, data) {
            this.setProducts(data.products);
          }.bind(this));

        }.bind(this));

        productsData.attachTo(this.node);

        this.trigger('changeProducts', {});

      });
    }
  }
);