/**
 * Created by andrii on 18.05.15.
 */

define(
  'components/data/shoppingCartData',
  [
    'flight/component',
    'jquery'
  ],
  function(defineComponent, $) {
    return defineComponent(CartData);

    function CartData() {
      this.defaultAttrs({
        data: "",
        storageName: "shoppingCart"
      });

      this.getData = function() {
        this.attr.data = localStorage.getItem(this.attr.storageName);
        return JSON.parse(this.attr.data || '{}');
      };

      this.save = function(data) {
        localStorage.setItem(this.attr.storageName, JSON.stringify(data));
      };

      this.addItem = function(item) {
        var data = this.getData();

        if(data.hasOwnProperty(item.id)) {
          data[item.id].count += item.count;
          if(data[item.id].count > data[item.id].quantity) {
            data[item.id].count = data[item.id].quantity;
          }
        } else {
          data[item.id] = item;
        }

        this.save(data);

      };

      this.removeItem = function(itemId) {
        var data = this.getData();

        if(data.hasOwnProperty(itemId)) {
          delete data[itemId];
        }

        this.save(data);
      };

      this.changeItem = function(itemId, count) {
        var data = this.getData();
        if(data.hasOwnProperty(itemId)) {
          data[itemId].count = count;
        }

        this.save(data);
      };

      this.watch = function() {
        var data = localStorage.getItem(this.attr.storageName);
        if(data !== this.attr.data) {
          this.trigger('cartDataChanged', this.getData());
        }
      };

      this.after('initialize', function() {
        this.on('addItem', function(e, data) {
          if(data.count > 0) {
            this.addItem(data);
            this.trigger('cartDataChanged', this.getData());
          }
        });

        this.on('removeItem', function(e, data) {
          this.removeItem(data.id);
          this.trigger('cartDataChanged', this.getData());
        });

        this.on('changeItem', function(e, data) {
          this.changeItem(data.id, data.count);
          this.trigger('cartDataChanged', this.getData());
        });

        /*watch cart for changes on other tab*/
        setInterval(function() {
          this.watch();
        }.bind(this), 2000);

        this.trigger('cartDataChanged', this.getData());
      });
    }
  }
);