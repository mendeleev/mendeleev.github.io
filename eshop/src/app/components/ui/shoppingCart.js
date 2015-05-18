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
        total: ".total span"
      });

      this.render = function(data) {
        var template;
        this.select('container').empty();

        for(var name in data) {
          template = bt(this.attr.template).createInstance();
          number.attachTo(template.element, {max: data[name].quantity});
          this.select('container').append(
            $(this.setTemplate(template, data[name]))
          );
        }

        this.countItems(data);
        this.countPrice(data);
      };

      this.countItems = function(data) {
        var count = Object.getOwnPropertyNames(data).length || 0;
        this.select('count').text(count);
      };

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
        this.on('cartDataChanged', function(e, data) {
          this.render(data);
        });

        this.on('change', function(event) {
          var value = Number($(event.target).val()),
            id = $(event.target).data('id');

          if(value < 1) {
            this.trigger($(this.attr.shoppingCart), 'removeItem', {id:id});
          } else {
            this.trigger($(this.attr.shoppingCart), 'changeItem', {id:id, count:value});
          }
        });
        shoppingCartData.attachTo(this.node);
      });
    }
  }
);
