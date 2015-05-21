/**
 * Created by andrii on 17.05.15.
 */

define(
  'components/ui/product',
  [
    'flight/component',
    'jquery',
    'components/mixin/withTemplateSet',
    'components/ui/form/number'
  ],
  function(defineComponent, $, withTemplateSet, number) {
    return defineComponent(Product, withTemplateSet);

    function Product() {
      this.defaultAttrs({
        template: {},
        container: {},
        buy: ".buy",
        shoppingCart: "#shoppingCart",
        amount: ".amount"
      });

      this.setProduct = function(data) {
        this.setTemplate(this.attr.template, data);
        this.attr.container.append(this.node);
      };

      this.after('initialize', function() {
        var currentProduct;

        this.on('changeProduct', function(event, data) {
          currentProduct = data.product;
          number.attachTo(this.node, {max: data.product.quantity});
          this.setProduct(data.product);
        }.bind(this));

        this.on('click', {
          buy: function() {
            this.trigger($(this.attr.shoppingCart), 'addItem', {
              id: currentProduct.id,
              count: Number(this.select('amount').val()),
              title: currentProduct.title,
              price: currentProduct.price,
              quantity: currentProduct.quantity
            });
          }
        });

      });
    }

  }
);