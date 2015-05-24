/**
 * Created by andrii on 18.05.15.
 */

define(
  'components/ui/shoppingCart',
  [
    'flight/component',
    'jquery',
    'components/data/shoppingCartData',
    'components/mixin/withTemplateSet',
    'components/ui/form/number'
  ],
  function(defineComponent, $, shoppingCartData, withTemplateSet, number) {
    return defineComponent(Cart, withTemplateSet);

    function Cart() {
      this.defaultAttrs({
        container: ".cartItems",
        template: "id:cartItemTemplate",
        shoppingCart: "#shoppingCart",
        count: ".count",
        total: ".total strong",
        remove: ".icon-delete"
      });

      /**
       * shopping cart render function
       * @param data
       */
      this.render = function(data) {
        var template;
        /*clean container*/
        this.select('container').empty();

        for(var name in data) {
          template = bt(this.attr.template).createInstance();
          number.attachTo(template.element, {max: data[name].quantity});
          /*append item to shopping cart container*/
          this.select('container').append(
            $(this.setTemplate(template, data[name]))
          );
        }

        this.countItems(data);
        this.countPrice(data);
      };

      /**
       * count the number of goods
       * @param data
       */
      this.countItems = function(data) {
        var count = Object.getOwnPropertyNames(data).length || 0;
        this.select('count').text(count);
      };

      /**
       * count price for one product
       * @param data
       */
      this.countPrice = function(data) {
        var total = 0;
        for(var name in data) {
          total += data[name].count * data[name].price;
        }

        this.select("total").text(
          Math.round(total*100)/100
        );
      };

      this.after('initialize', function() {
        /**
         * shopping cart render on data changed
         */
        this.on('cartDataChanged', function(e, data) {
          this.render(data);
        });

        /**
         * listen changes in the number field
         */
        this.on('change', function(event) {
          var value = Number($(event.target).val()),
            id = $(event.target).data('id');

          if(value < 1) {
            this.trigger('removeItem', {id:id});
          } else {
            this.trigger('changeItem', {id:id, count:value});
          }
        });

        /**
         * clicks listener
         */
        this.on('click', {
          /**
           * on remove icon click
           * @param e - event
           */
          remove: function(e) {
            this.trigger('removeItem', {
              id:$(e.target).data('id')
            });
          }
        });

        shoppingCartData.attachTo(this.node);
      });
    }
  }
);
