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

      this.increase = function() {
        var value = Number(this.select('input').val());
        this.select('input').val(
          value < this.attr.max ? value += 1 : value
        );
        this.select('input').trigger('change');
      };

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

        this.on('keyup', function(e) {
          switch(e.keyCode) {
            case 38:
              this.increase();
              break;
            case 40:
              this.decrease();
              break;
          }
        }.bind(this));
      });
    }
  }
);