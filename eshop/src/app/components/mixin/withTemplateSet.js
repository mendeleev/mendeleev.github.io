/**
 * Created by andrii on 17.05.15.
 */

"use strict";

define(
  'components/mixin/withTemplateSet',
  [],
  function() {
    return function() {
      /**
       * Set object fields and values to template
       *
       * @param template
       * @param data
       * @returns {*}
       */
      this.setTemplate = function(template, data) {
        for(var name in data) {
          template.set(name, data[name]);
        }
        return template ? template.element : {};
      }
    }
  }
);