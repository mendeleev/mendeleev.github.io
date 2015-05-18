/**
 * Created by andrii on 17.05.15.
 */

"use strict";


define(
  'components/gallery',
  [
    'flight/component',
    'jquery',
    'components/ui/categories',
    'components/ui/products',
    'components/ui/shoppingCart'
  ],
  function (defineComponent, $, categories, products, shoppingCart) {
    return defineComponent(Gallery);

    function Gallery() {
      this.defaultAttrs({
        categories: "#categories",
        products: "#products",
        shoppingCart: "#shoppingCart"
      });

      this.after('initialize', function () {
        categories.attachTo(this.select('categories'));
        products.attachTo(this.select('products'));
        shoppingCart.attachTo(this.select('shoppingCart'));
      });
    }
  }
);