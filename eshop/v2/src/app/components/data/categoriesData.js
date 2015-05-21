/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/data/categoriesData',
  [
    'flight/component',
    'jquery'
  ],
  function (defineComponent, $) {
    return defineComponent(Categories);

    function Categories() {
      /**
       * define default attributes
       */
      this.defaultAttrs({
        apiUrl: "data/categories.json"
      });

      /**
       * get categories method
       * @returns {*}
       */
      this.getCategories = function() {
        return $.ajax({
          url: this.attr.apiUrl,
          method: "get"
        });
      };

      this.after('initialize', function () {
        /**
         * get all categories and trigger an event
         * when categories are loaded
         */
        this.getCategories().then(function(data) {
          this.trigger('dataChanged', data);
        }.bind(this));
      });
    }
  }
);