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
        out: ".out",
        shoppingCart: "#shoppingCart",
        amount: ".amount"
      });

      /**
       * set product data to the template
       * @param data
       */
      this.setProduct = function(data) {
        if(data.quantity < 1) {
          this.select('amount').val(0).attr('disabled', true);
          this.select('buy').addClass(this.attr.out.replace('.', ''));
        }
        this.setTemplate(this.attr.template, data);
        this.attr.container.append(this.node);
      };

      this.after('initialize', function() {
        var currentProduct;

        /**
         * changeProduct event listener
         */
        this.on('changeProduct', function(event, data) {
          currentProduct = data.product;
          number.attachTo(this.node, {max: data.product.quantity});
          this.setProduct(data.product);
        }.bind(this));

        /**
         * clicks listener
         */
        this.on('click', {
          /**
           * add to cart button listener
           */
          buy: function() {
            /*add item to the shopping cart*/
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