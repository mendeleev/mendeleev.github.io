/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/data/productsData',
  [
    'flight/component',
    'jquery'
  ],
  function(defineComponent, $) {
    return defineComponent(Products);

    function Products() {
      this.defaultAttrs({
        apiUrl: "data/products.json"
      });

      /**
       *
       * @returns {*}
       */
      this.getProducts = function(categoryId, sort) {
        return $.ajax({url:this.attr.apiUrl}).then(function(data) {
          var result = [];
          if(categoryId) {
            for(var i = 0; i < data.products.length; i++) {
              if(data.products[i].category_id === categoryId) {
                result.push(data.products[i]);
              }
            }
          } else {
            result = data.products;
          }

          return {products: this.sort(result, sort)};
        }.bind(this));
      };

      this.sort = function(data, type) {
        var result = [];
        switch(Number(type)) {
          case 1:
            result = data.sort(function(a, b) {
              if(a.price > b.price) return 1;
              if(a.price < b.price) return -1;
              return 0;
            });
            break;
          case 1:
            result = data.sort(function(a, b) {
              if(b.price > a.price) return 1;
              if(b.price < a.price) return -1;
              return 0;
            });
            break;
          default:
            result = data;
        }

        return result;
      };

      this.after('initialize', function() {
        /**
         * listen event for changing data
         */
        this.on('changeData', function(event, params) {
          /**
           * load products data
           */
          this.getProducts(params.category_id, params.sortBy).then(function(data) {
            this.trigger('dataChanged', data);
          }.bind(this));

        }.bind(this));
      })
    }
  }
);