/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/ui/categories',
  [
    'flight/component',
    'jquery',
    'basisTemplates',
    'components/data/categoriesData'
  ],
  function(defineComponent, $, basisTemplates, categoriesData) {
    return defineComponent(Categories);

    function Categories() {
      this.defaultAttrs({
        template: "id:categoryTemplate",
        container: ".categories ul",
        item: ".categories li",
        products: "#products",
        sortBy: "#sortBy",
        categoryEl: "[name=category_id]"
      });

      /**
       * set categories data to the template
       * @param data
       */
      this.setCategories = function(data) {
        var template = bt(this.attr.template).createInstance();
        /* clean container */
        this.select('container').empty();
        for(var i = 0; i < data.length; i++) {
          template.set('id', data[i].id);
          template.set('title', data[i].title);
          /*append template element to the categories container*/
          this.select('container').append($(template.element).clone());
        }
      };

      this.after('initialize', function() {
        var category, sortBy;

        /**
         * setCategories when categories data changed
         */
        this.on('dataChanged', function(event, data) {
          this.setCategories(data.categories);
        }.bind(this));

        /**
         * clicks listener
         */
        this.on('click', {
          /**
           * on item click
           * @param event
           */
          item: function(event) {
            category = $(event.target).data('id');
            this.select('categoryEl').val(category);
            /*trigger event to change products in a view*/
            this.trigger($(this.attr.products), 'changeProducts', {
              category_id:category,
              sortBy: sortBy
            });
            /*remove all active classes*/
            this.select('item').find('a').removeClass('active');
            /*add active class to the clicked element*/
            $(event.target).addClass('active');
          }
        });

        /**
         * sort by change listener
         */
        $(this.attr.sortBy).on('change', function(e) {
          sortBy = Number($(e.target).val());
          /*trigger event to change products in a view*/
          this.trigger($(this.attr.products), 'changeProducts', {
            category_id:category,
            sortBy: sortBy
          });
        }.bind(this));

        categoriesData.attachTo(this.node);
      });
    }
  }
);