/**
 * Created by andrii on 17.05.15.
 */

"use strict";

requirejs.config({
  baseUrl: 'src/app/',
  paths: {
    lib: '../../lib',
    jquery: '../../lib/jquery/dist/jquery.min',
    flight: '../../lib/flight/lib',
    basisTemplates: '../../lib/basis-templates/basis-templates.min'
  }
});


define(
  "main",
  [
    'components/gallery'
  ],
  function (gallery) {
    gallery.attachTo(document);
  }
);