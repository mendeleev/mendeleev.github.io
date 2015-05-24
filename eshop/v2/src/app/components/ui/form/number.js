/**
 * Created by andrii on 18.05.15.
 */

define(
  'components/ui/form/number',
  [
    'flight/component',
    'jquery'
  ],
  function(defineComponent, $) {
    return defineComponent(NumberInput);

    function NumberInput() {
      this.defaultAttrs({
        max:1, //up limit
        up: ".up",
        down: ".down",
        input: ".amount"
      });

      /**
       * increase the current value for one item more
       */
      this.increase = function() {
        var value = Number(this.select('input').val());
        this.select('input').val(
          value < this.attr.max ? value += 1 : value
        );
        this.select('input').trigger('change');
      };

      /**
       * decrease the current value for one item less
       */
      this.decrease = function() {
        var value = Number(this.select('input').val());
        this.select('input').val(
          value >0 ? value -= 1 : value
        );
        this.select('input').trigger('change');
      };

      this.after('initialize', function() {
        this.on('click', {
          up: this.increase,
          down: this.decrease
        });

        /**
         * listens up and down arrows keys and change the value
         */
        this.on('keyup', function(e) {
          switch(e.keyCode) {
            /*up arrow key*/
            case 38:
              this.increase();
              break;
            /*down arrow key*/
            case 40:
              this.decrease();
              break;
          }
        }.bind(this));

        /**
         * change listener
         */
        this.on('change', function(e) {
          /*set the maximal number is the changed number is bigger*/
          if($(e.target).val() > this.attr.max) {
            $(e.target).val(this.attr.max)
          }
        }.bind(this));
      });
    }
  }
);